import { useState, useMemo } from "react";

/*
 * CSS clip-path: path() Tooltip — the "perfect" tooltip
 *
 * Uses clip-path: path("...") with SVG path commands to draw the
 * entire tooltip (rounded rect + arrow) as ONE unified shape.
 *
 * path() uses SVG syntax (M, L, Q, Z) and is supported in
 * Chrome 88+, Firefox 97+, Safari 13.1+ — unlike shape() which
 * is bleeding-edge.
 *
 * ◆ Gradient: one background fills body + arrow seamlessly
 * ◇ Border: two layers with the same path, inner inset by borderWidth
 * ○ Rounded corners: Q (quadratic bézier) commands at each corner
 */

function tooltipPath({ w, h, bodyW, bodyH, r, arrowW, arrowH, placement, inset = 0 }) {
	const i = inset;
	const ri = Math.max(0, r - i);
	const f = (n) => n.toFixed(2);

	let bT, bB, bL, bR; // body edges
	let aTX, aTY, aLX, aLY, aRX, aRY; // arrow tip + base points (clockwise)

	if (placement === "top") {
		bT = i;
		bB = bodyH - i;
		bL = i;
		bR = bodyW - i;
		const cx = w / 2;
		aRX = cx + arrowW - i * 0.5;
		aRY = bB;
		aLX = cx - arrowW + i * 0.5;
		aLY = bB;
		aTX = cx;
		aTY = h - i;
	} else if (placement === "bottom") {
		bT = arrowH + i;
		bB = h - i;
		bL = i;
		bR = bodyW - i;
		const cx = w / 2;
		aLX = cx - arrowW + i * 0.5;
		aLY = bT;
		aRX = cx + arrowW - i * 0.5;
		aRY = bT;
		aTX = cx;
		aTY = i;
	} else if (placement === "left") {
		bT = i;
		bB = bodyH - i;
		bL = i;
		bR = bodyW - i;
		const cy = h / 2;
		aLX = bR;
		aLY = cy - arrowW + i * 0.5;
		aRX = bR;
		aRY = cy + arrowW - i * 0.5;
		aTX = w - i;
		aTY = cy;
	} else {
		bT = i;
		bB = bodyH - i;
		bL = arrowH + i;
		bR = w - i;
		const cy = h / 2;
		aLX = bL;
		aLY = cy + arrowW - i * 0.5;
		aRX = bL;
		aRY = cy - arrowW + i * 0.5;
		aTX = i;
		aTY = cy;
	}

	// Q cx cy ex ey — quadratic bézier for rounded corners
	const corner = (cx, cy, ex, ey) => `Q ${f(cx)} ${f(cy)} ${f(ex)} ${f(ey)}`;

	const parts = [];
	// Start at top-left, offset by radius
	parts.push(`M ${f(bL + ri)} ${f(bT)}`);

	// ── Top edge ──
	if (placement === "bottom") {
		parts.push(`L ${f(aLX)} ${f(aLY)}`);
		parts.push(`L ${f(aTX)} ${f(aTY)}`);
		parts.push(`L ${f(aRX)} ${f(aRY)}`);
	}
	parts.push(`L ${f(bR - ri)} ${f(bT)}`);
	parts.push(corner(bR, bT, bR, bT + ri)); // top-right

	// ── Right edge ──
	if (placement === "left") {
		parts.push(`L ${f(aLX)} ${f(aLY)}`);
		parts.push(`L ${f(aTX)} ${f(aTY)}`);
		parts.push(`L ${f(aRX)} ${f(aRY)}`);
	}
	parts.push(`L ${f(bR)} ${f(bB - ri)}`);
	parts.push(corner(bR, bB, bR - ri, bB)); // bottom-right

	// ── Bottom edge ──
	if (placement === "top") {
		parts.push(`L ${f(aRX)} ${f(aRY)}`);
		parts.push(`L ${f(aTX)} ${f(aTY)}`);
		parts.push(`L ${f(aLX)} ${f(aLY)}`);
	}
	parts.push(`L ${f(bL + ri)} ${f(bB)}`);
	parts.push(corner(bL, bB, bL, bB - ri)); // bottom-left

	// ── Left edge ──
	if (placement === "right") {
		parts.push(`L ${f(aLX)} ${f(aLY)}`);
		parts.push(`L ${f(aTX)} ${f(aTY)}`);
		parts.push(`L ${f(aRX)} ${f(aRY)}`);
	}
	parts.push(`L ${f(bL)} ${f(bT + ri)}`);
	parts.push(corner(bL, bT, bL + ri, bT)); // top-left

	parts.push("Z");
	return parts.join(" ");
}

// ── Tooltip Component ───────────────────────────────────────────
function Tooltip({
	children,
	text,
	placement = "top",
	gradient = "linear-gradient(135deg, #667eea, #764ba2)",
	borderColor = "#4c3a8a",
	borderWidth = 1.5,
	borderRadius = 6,
	arrowWidth = 10,
	arrowHeight = 9,
	tooltipWidth = 240,
	tooltipHeight = 40,
	color = "#fff",
	fontSize = 13,
}) {
	const [visible, setVisible] = useState(false);

	const isVert = placement === "top" || placement === "bottom";
	const fullW = isVert ? tooltipWidth : tooltipWidth + arrowHeight;
	const fullH = isVert ? tooltipHeight + arrowHeight : tooltipHeight;

	const base = {
		w: fullW,
		h: fullH,
		bodyW: tooltipWidth,
		bodyH: tooltipHeight,
		r: borderRadius,
		arrowW: arrowWidth,
		arrowH: arrowHeight,
		placement,
	};

	const outerPath = useMemo(
		() => tooltipPath({ ...base, inset: 0 }),
		[fullW, fullH, tooltipWidth, tooltipHeight, borderRadius, arrowWidth, arrowHeight, placement],
	);
	const innerPath = useMemo(
		() => tooltipPath({ ...base, inset: borderWidth }),
		[fullW, fullH, tooltipWidth, tooltipHeight, borderRadius, arrowWidth, arrowHeight, placement, borderWidth],
	);

	const gap = 6;
	const pos =
		placement === "top"
			? { bottom: `calc(100% + ${gap}px)`, left: "50%", transform: "translateX(-50%)" }
			: placement === "bottom"
				? { top: `calc(100% + ${gap}px)`, left: "50%", transform: "translateX(-50%)" }
				: placement === "left"
					? { right: `calc(100% + ${gap}px)`, top: "50%", transform: "translateY(-50%)" }
					: { left: `calc(100% + ${gap}px)`, top: "50%", transform: "translateY(-50%)" };

	const pad =
		placement === "top"
			? { top: 0, left: 0, right: 0, bottom: arrowHeight }
			: placement === "bottom"
				? { top: arrowHeight, left: 0, right: 0, bottom: 0 }
				: placement === "left"
					? { top: 0, left: 0, right: arrowHeight, bottom: 0 }
					: { top: 0, left: arrowHeight, right: 0, bottom: 0 };

	return (
		<span
			style={{ position: "relative", display: "inline-flex" }}
			onMouseEnter={() => setVisible(true)}
			onMouseLeave={() => setVisible(false)}
		>
			{children}
			<span
				style={{
					position: "absolute",
					zIndex: 9999,
					pointerEvents: "none",
					opacity: visible ? 1 : 0,
					transition: "opacity 0.2s ease",
					width: fullW,
					height: fullH,
					...pos,
				}}
			>
				{/* Border layer */}
				<span
					style={{
						position: "absolute",
						inset: 0,
						background: borderColor,
						clipPath: `path("${outerPath}")`,
					}}
				/>
				{/* Gradient layer */}
				<span
					style={{
						position: "absolute",
						inset: 0,
						background: gradient,
						clipPath: `path("${innerPath}")`,
					}}
				/>
				{/* Text */}
				<span
					style={{
						position: "absolute",
						top: pad.top,
						left: pad.left,
						right: pad.right,
						bottom: pad.bottom,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						color,
						fontSize,
						fontWeight: 500,
						fontFamily: "'DM Sans', system-ui, sans-serif",
						textAlign: "center",
						padding: "0 14px",
						zIndex: 2,
					}}
				>
					{text}
				</span>
			</span>
		</span>
	);
}

// ── Playground ──────────────────────────────────────────────────
const GRADIENTS = [
	{ name: "Violet Haze", value: "linear-gradient(135deg, #667eea, #764ba2)", border: "#4c3a8a" },
	{ name: "Sunset Ember", value: "linear-gradient(135deg, #f97316, #ef4444)", border: "#b91c1c" },
	{ name: "Ocean Depth", value: "linear-gradient(135deg, #06b6d4, #3b82f6)", border: "#1e40af" },
	{ name: "Mint Fresh", value: "linear-gradient(135deg, #34d399, #059669)", border: "#047857" },
	{ name: "Midnight", value: "linear-gradient(135deg, #1e293b, #334155)", border: "#94a3b8" },
	{ name: "Rose Gold", value: "linear-gradient(135deg, #fda4af, #e11d48)", border: "#9f1239" },
];

export default function App() {
	const [placement, setPlacement] = useState("top");
	const [gradIdx, setGradIdx] = useState(0);
	const [bw, setBw] = useState(1.5);
	const [br, setBr] = useState(6);
	const [aw, setAw] = useState(10);
	const [ah, setAh] = useState(9);
	const grad = GRADIENTS[gradIdx];

	return (
		<div
			style={{
				minHeight: "100vh",
				background: "#0f0f13",
				color: "#e2e2e8",
				fontFamily: "'DM Sans', system-ui, sans-serif",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<link
				href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap"
				rel="stylesheet"
			/>

			{/* Header */}
			<div style={{ padding: "28px 36px 0", display: "flex", alignItems: "baseline", gap: 12 }}>
				<h1
					style={{
						fontSize: 22,
						fontWeight: 700,
						margin: 0,
						background: "linear-gradient(135deg, #667eea, #a78bfa)",
						WebkitBackgroundClip: "text",
						WebkitTextFillColor: "transparent",
					}}
				>
					clip-path: path()
				</h1>
				<span style={{ fontSize: 13, color: "#6b6b7b", fontFamily: "'DM Mono', monospace" }}>the perfect tooltip</span>
			</div>

			{/* Main */}
			<div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 36px 30px" }}>
				<div style={{ display: "flex", gap: 48, alignItems: "stretch", width: "100%", maxWidth: 920 }}>
					{/* Preview */}
					<div
						style={{
							flex: 1,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							background: "linear-gradient(145deg, #16161d, #1a1a24)",
							borderRadius: 16,
							border: "1px solid #2a2a38",
							minHeight: 300,
							position: "relative",
						}}
					>
						<div
							style={{
								position: "absolute",
								top: 14,
								left: 18,
								fontSize: 10,
								color: "#4a4a58",
								fontFamily: "'DM Mono', monospace",
								textTransform: "uppercase",
								letterSpacing: "0.08em",
							}}
						>
							hover to preview
						</div>

						<Tooltip
							text="Gradient fills the arrow too ✨"
							placement={placement}
							gradient={grad.value}
							borderColor={grad.border}
							borderWidth={bw}
							borderRadius={br}
							arrowWidth={aw}
							arrowHeight={ah}
						>
							<button
								style={{
									padding: "14px 32px",
									background: "linear-gradient(135deg, #2a2a3a, #1e1e2e)",
									border: "1px solid #3a3a4d",
									borderRadius: 10,
									color: "#d4d4e0",
									fontSize: 14,
									fontWeight: 600,
									cursor: "pointer",
									fontFamily: "'DM Sans', system-ui, sans-serif",
								}}
							>
								Hover me
							</button>
						</Tooltip>

						{/* Placement picker */}
						<div style={{ position: "absolute", bottom: 16, display: "flex", gap: 6 }}>
							{["top", "bottom", "left", "right"].map((pl) => (
								<button
									key={pl}
									onClick={() => setPlacement(pl)}
									style={{
										padding: "5px 14px",
										background: placement === pl ? "#667eea22" : "transparent",
										border: `1px solid ${placement === pl ? "#667eea" : "#2a2a38"}`,
										borderRadius: 6,
										color: placement === pl ? "#a78bfa" : "#5a5a6b",
										fontSize: 11,
										fontFamily: "'DM Mono', monospace",
										cursor: "pointer",
									}}
								>
									{pl}
								</button>
							))}
						</div>
					</div>

					{/* Controls */}
					<div style={{ width: 260, display: "flex", flexDirection: "column", gap: 20 }}>
						{/* Gradient swatches */}
						<div>
							<label style={labelSt}>Gradient</label>
							<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
								{GRADIENTS.map((g, i) => (
									<button
										key={i}
										onClick={() => setGradIdx(i)}
										title={g.name}
										style={{
											height: 32,
											background: g.value,
											border: `2px solid ${i === gradIdx ? "#fff" : "transparent"}`,
											borderRadius: 6,
											cursor: "pointer",
											outline: i === gradIdx ? "1px solid #667eea" : "none",
											outlineOffset: 1,
										}}
									/>
								))}
							</div>
							<div style={{ fontSize: 11, color: "#5a5a6b", marginTop: 4, fontFamily: "'DM Mono', monospace" }}>
								{grad.name}
							</div>
						</div>

						<Slider label="Border Width" val={bw} min={0} max={4} step={0.5} set={setBw} />
						<Slider label="Border Radius" val={br} min={0} max={20} step={1} set={setBr} />
						<Slider label="Arrow Width" val={aw} min={4} max={24} step={1} set={setAw} />
						<Slider label="Arrow Height" val={ah} min={4} max={20} step={1} set={setAh} />

						{/* Info */}
						<div
							style={{
								background: "#12121a",
								border: "1px solid #2a2a38",
								borderRadius: 10,
								padding: "14px 16px",
								fontSize: 11,
								fontFamily: "'DM Mono', monospace",
								lineHeight: 1.9,
								color: "#8888a0",
							}}
						>
							<div style={{ color: "#667eea", marginBottom: 4, fontWeight: 600, fontSize: 12 }}>How it works</div>
							<div>
								<span style={{ color: "#a78bfa" }}>◆</span> <code>clip-path: path("M…Q…Z")</code>
							</div>
							<div>
								<span style={{ color: "#a78bfa" }}>◆</span> SVG path = body + arrow as one
							</div>
							<div>
								<span style={{ color: "#a78bfa" }}>◆</span> Gradient fills entire clipped shape
							</div>
							<div>
								<span style={{ color: "#a78bfa" }}>◆</span> Border = outer path – inner path
							</div>
							<div>
								<span style={{ color: "#a78bfa" }}>◆</span> <code>Q</code> command = bézier corners
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Footer chips */}
			<div style={{ padding: "8px 36px 24px", display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
				{[
					{ icon: "◆", title: "Seamless Gradient", desc: "One path → one background" },
					{ icon: "◇", title: "Pixel-perfect Border", desc: "Two clipped layers, inset trick" },
					{ icon: "○", title: "Smooth Corners", desc: "Q (quadratic bézier) in SVG path" },
				].map((c) => (
					<div
						key={c.title}
						style={{
							display: "flex",
							alignItems: "center",
							gap: 10,
							padding: "10px 18px",
							background: "#16161d",
							borderRadius: 10,
							border: "1px solid #2a2a38",
						}}
					>
						<span style={{ fontSize: 16, color: "#667eea" }}>{c.icon}</span>
						<div>
							<div style={{ fontSize: 12, fontWeight: 600, color: "#c4c4d4" }}>{c.title}</div>
							<div style={{ fontSize: 11, color: "#5a5a6b" }}>{c.desc}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

function Slider({ label, val, min, max, step, set }) {
	return (
		<div>
			<label style={labelSt}>
				{label} <span style={valSt}>{val}px</span>
			</label>
			<input
				type="range"
				min={min}
				max={max}
				step={step}
				value={val}
				onChange={(e) => set(+e.target.value)}
				style={{ width: "100%", accentColor: "#667eea", height: 4, cursor: "pointer" }}
			/>
		</div>
	);
}

const labelSt = { display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 600, color: "#9090a4", marginBottom: 8 };
const valSt = { fontFamily: "'DM Mono', monospace", color: "#667eea", fontWeight: 400 };
