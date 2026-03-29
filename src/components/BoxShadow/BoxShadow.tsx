import React, { useId, useMemo } from "react";

function splitShadows(str: string) {
	const result = [];
	let depth = 0,
		current = "";
	for (const ch of str) {
		if (ch === "(") depth++;
		if (ch === ")") depth--;
		if (ch === "," && depth === 0) {
			result.push(current.trim());
			current = "";
		} else {
			current += ch;
		}
	}
	if (current.trim()) result.push(current.trim());
	return result;
}
function parseBoxShadow(shadowStr: string) {
	if (!shadowStr || !shadowStr.trim()) return [];
	return splitShadows(shadowStr).map(parseSingleShadow);
}
function buildFilterData(shadows: ReturnType<typeof parseBoxShadow>) {
	const primitives: any[] = [];
	const dropRefs: any[] = [];
	const insetRefs: any[] = [];

	shadows.forEach((s, i) => {
		const sd = s.blur / 2;

		if (!s.inset) {
			// ═══ DROP SHADOW ═══
			let src = "SourceAlpha";

			if (s.spread !== 0) {
				const op = s.spread > 0 ? "dilate" : "erode";
				primitives.push({ tag: "feMorphology", attrs: { in: src, operator: op, radius: Math.abs(s.spread), result: `dSp${i}` } });
				src = `dSp${i}`;
			}

			if (sd > 0) {
				primitives.push({ tag: "feGaussianBlur", attrs: { in: src, stdDeviation: sd, result: `dBl${i}` } });
				src = `dBl${i}`;
			}

			primitives.push({ tag: "feOffset", attrs: { in: src, dx: s.offsetX, dy: s.offsetY, result: `dOf${i}` } });
			primitives.push({ tag: "feFlood", attrs: { floodColor: s.color, floodOpacity: s.opacity, result: `dFl${i}` } });
			primitives.push({ tag: "feComposite", attrs: { in: `dFl${i}`, in2: `dOf${i}`, operator: "in", result: `dSh${i}` } });

			dropRefs.push(`dSh${i}`);
		} else {
			// ═══ INSET SHADOW ═══
			primitives.push({ tag: "feFlood", attrs: { floodColor: "white", floodOpacity: 1, result: `iWh${i}` } });
			primitives.push({ tag: "feComposite", attrs: { in: `iWh${i}`, in2: "SourceAlpha", operator: "out", result: `iInv${i}` } });

			let src = `iInv${i}`;

			if (s.spread !== 0) {
				const op = s.spread > 0 ? "dilate" : "erode";
				primitives.push({ tag: "feMorphology", attrs: { in: src, operator: op, radius: Math.abs(s.spread), result: `iSp${i}` } });
				src = `iSp${i}`;
			}

			if (sd > 0) {
				primitives.push({ tag: "feGaussianBlur", attrs: { in: src, stdDeviation: sd, result: `iBl${i}` } });
				src = `iBl${i}`;
			}

			primitives.push({ tag: "feOffset", attrs: { in: src, dx: s.offsetX, dy: s.offsetY, result: `iOf${i}` } });
			primitives.push({ tag: "feFlood", attrs: { floodColor: s.color, floodOpacity: s.opacity, result: `iFl${i}` } });
			primitives.push({ tag: "feComposite", attrs: { in: `iFl${i}`, in2: `iOf${i}`, operator: "in", result: `iCo${i}` } });
			primitives.push({ tag: "feComposite", attrs: { in: `iCo${i}`, in2: "SourceAlpha", operator: "in", result: `iSh${i}` } });

			insetRefs.push(`iSh${i}`);
		}
	});

	// Merge order: drop shadows (last→first) → SourceGraphic → inset (last→first)
	const mergeInputs = [];
	for (let i = dropRefs.length - 1; i >= 0; i--) mergeInputs.push(dropRefs[i]);
	mergeInputs.push("SourceGraphic");
	for (let i = insetRefs.length - 1; i >= 0; i--) mergeInputs.push(insetRefs[i]);

	return { primitives, mergeInputs };
}

function computeFilterRegion(shadows: ReturnType<typeof parseBoxShadow>) {
	let maxExt = 30;
	for (const s of shadows) {
		const ext = Math.abs(s.offsetX) + Math.abs(s.offsetY) + s.blur + Math.abs(s.spread) + 20;
		if (ext > maxExt) maxExt = ext;
	}
	const pad = Math.max(maxExt * 3, 100);
	return { x: `-${pad}%`, y: `-${pad}%`, width: `${100 + pad * 2}%`, height: `${100 + pad * 2}%` };
}
function parseSingleShadow(str: string) {
	const tokens = tokenize(str);
	let inset = false;
	const lengths = [];
	let colorStr = null;

	for (const token of tokens) {
		if (token.toLowerCase() === "inset") {
			inset = true;
		} else if (isLength(token)) {
			lengths.push(parseFloat(token) || 0);
		} else {
			colorStr = token;
		}
	}

	const { color, opacity } = parseColorValue(colorStr || "rgba(0,0,0,1)");

	return {
		inset,
		offsetX: lengths[0] || 0,
		offsetY: lengths[1] || 0,
		blur: Math.max(lengths[2] || 0, 0),
		spread: lengths[3] || 0,
		color,
		opacity,
	};
}

function isLength(token: string) {
	return /^-?\d*\.?\d+(px|em|rem|pt|cm|mm|in|vh|vw|%)?$/.test(token);
}

// ─── Color Parser ─────────────────────────────────────────
function tokenize(str: string) {
	const tokens = [];
	let i = 0;
	const s = str.trim();
	while (i < s.length) {
		if (/\s/.test(s[i])) {
			i++;
			continue;
		}
		if (/[a-zA-Z_]/.test(s[i])) {
			let word = "";
			while (i < s.length && /[a-zA-Z_-]/.test(s[i])) {
				word += s[i];
				i++;
			}
			if (i < s.length && s[i] === "(") {
				word += "(";
				i++;
				let depth = 1;
				while (i < s.length && depth > 0) {
					if (s[i] === "(") depth++;
					if (s[i] === ")") depth--;
					word += s[i];
					i++;
				}
			}
			tokens.push(word);
			continue;
		}
		if (s[i] === "#") {
			let hex = "#";
			i++;
			while (i < s.length && /[0-9a-fA-F]/.test(s[i])) {
				hex += s[i];
				i++;
			}
			tokens.push(hex);
			continue;
		}
		if (/[-\d.]/.test(s[i])) {
			let num = "";
			if (s[i] === "-") {
				num += "-";
				i++;
			}
			while (i < s.length && /[\d.]/.test(s[i])) {
				num += s[i];
				i++;
			}
			while (i < s.length && /[a-zA-Z%]/.test(s[i])) {
				num += s[i];
				i++;
			}
			tokens.push(num);
			continue;
		}
		i++;
	}
	return tokens;
}

function parseColorValue(colorStr: string) {
	const s = (colorStr || "").trim();
	if (!s || s.toLowerCase() === "transparent") return { color: "rgb(0,0,0)", opacity: 0 };

	if (s.startsWith("#")) {
		const hex = s.slice(1);
		if (hex.length === 3) return { color: s, opacity: 1 };
		if (hex.length === 4) {
			const a = parseInt(hex[3] + hex[3], 16) / 255;
			return { color: `#${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`, opacity: +a.toFixed(3) };
		}
		if (hex.length === 6) return { color: s, opacity: 1 };
		if (hex.length === 8) {
			const a = parseInt(hex.slice(6), 16) / 255;
			return { color: s.slice(0, 7), opacity: +a.toFixed(3) };
		}
		return { color: s, opacity: 1 };
	}

	const rgbaMatch = s.match(/^rgba?\((.+)\)$/i);
	if (rgbaMatch) {
		const parts = rgbaMatch[1].split(/[\s,/]+/).filter(Boolean);
		const [r, g, b] = parts;
		if (parts.length >= 4) {
			let a = parseFloat(parts[3]);
			if (parts[3].endsWith("%")) a = parseFloat(parts[3]) / 100;
			return { color: `rgb(${r},${g},${b})`, opacity: a };
		}
		return { color: `rgb(${r},${g},${b})`, opacity: 1 };
	}

	const hslaMatch = s.match(/^hsla?\((.+)\)$/i);
	if (hslaMatch) {
		const parts = hslaMatch[1].split(/[\s,/]+/).filter(Boolean);
		if (parts.length >= 4) {
			let a = parseFloat(parts[3]);
			if (parts[3].endsWith("%")) a = parseFloat(parts[3]) / 100;
			return { color: `hsl(${parts[0]},${parts[1]},${parts[2]})`, opacity: a };
		}
		return { color: s, opacity: 1 };
	}

	return { color: s, opacity: 1 };
}
export function BoxShadow({ id, shadow }: { id: string; shadow: string }) {
	const filterElement = useMemo(() => {
		const shadows = parseBoxShadow(shadow);
		if (!shadows.length) return null;

		const { primitives, mergeInputs } = buildFilterData(shadows);
		const region = computeFilterRegion(shadows);

		return (
			<filter
				id={id}
				x={region.x}
				y={region.y}
				width={region.width}
				height={region.height}
				colorInterpolationFilters="sRGB"
				filterUnits={"userSpaceOnUse"}
			>
				{primitives.map((p, i) => React.createElement(p.tag, { key: i, ...p.attrs }))}
				<feMerge>
					{mergeInputs.map((ref, i) => (
						<feMergeNode key={i} in={ref} />
					))}
				</feMerge>
			</filter>
		);
	}, [shadow, id]);
	return filterElement;
}
