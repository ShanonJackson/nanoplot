import { CartesianDataset, InternalGraphContext } from "../../hooks/use-graph/use-graph";
import { CurveUtils } from "../path/curve";

const cacheFor = new WeakMap<
    Pick<InternalGraphContext, "viewbox" | "domain">,
    WeakMap<CartesianDataset[number]["data"], Float32Array>
>();
const pathCacheFor = new WeakMap<
    Pick<InternalGraphContext, "viewbox" | "domain">,
    WeakMap<CartesianDataset[number]["data"], string>
>();

// Shared path-encoding resources (mirrors utils/path/curve.ts)
const decoder = new TextDecoder();
const MAX_POINTS = 200_000;
const buffer = new Uint8Array(MAX_POINTS * 12 + 1);
export const CoordinatesUtils = {
	xyCoordinatesForDataset: (context: Pick<InternalGraphContext, "viewbox" | "domain">) => {
		const { domain } = context;
		// per-context cache (avoids duplicate work across components in same render)
		let byData = cacheFor.get(context);
		if (!byData) {
			byData = new WeakMap();
			cacheFor.set(context, byData);
		}

		// ---- Precompute once (all cheap) ----
		const xLen = domain.x.length;
		const yLen = domain.y.length;

		const xCoords = domain.x.map((d) => d.coordinate);
		const yCoords = domain.y.map((d) => d.coordinate);

		const xIsDateTime = domain.x[0]?.tick instanceof Date;
		const yIsDateTime = domain.y[0]?.tick instanceof Date;

		// This factory is meant for the optimized linear path only.
		// If it's not linear+numeric/datetime, bail early (use your slower generic path).
		const xIsJumpUniform = domain.x.every((d, i, a) => i === 0 || +d.tick - +a[i - 1].tick === +a[1].tick - +a[0].tick);
		const yIsJumpUniform = domain.y.every((d, i, a) => i === 0 || +d.tick - +a[i - 1].tick === +a[1].tick - +a[0].tick);
		const xIsCoordUniform = xCoords.every((c, i, a) => i === 0 || Math.round(c - a[i - 1]) === Math.round(a[1] - a[0]));
		const yIsCoordUniform = yCoords.every((c, i, a) => i === 0 || Math.round(c - a[i - 1]) === Math.round(a[1] - a[0]));
		const isXLinearOptimized = xIsJumpUniform && xIsCoordUniform && (xIsDateTime || typeof domain.x[0]?.tick === "number");
		const isYLinearOptimized = yIsJumpUniform && yIsCoordUniform && (yIsDateTime || typeof domain.y[0]?.tick === "number");
		if (!(isXLinearOptimized && isYLinearOptimized)) {
			// Generic non-linear mapper supporting:
			// - numeric/date axes with monotonic but non-uniform ticks (piecewise linear via binary search)
			// - categorical axes (exact tick match only; no interpolation)
			const xIsCategorical = typeof domain.x[0]?.tick === "string" && !xIsDateTime;
			const yIsCategorical = typeof domain.y[0]?.tick === "string" && !yIsDateTime;

			// Precompute numeric tick arrays for fast lookup
			const xTicksNum = xIsCategorical ? [] : domain.x.map((d) => (xIsDateTime ? (d.tick as Date).getTime() : (d.tick as number)));
			const yTicksNum = yIsCategorical ? [] : domain.y.map((d) => (yIsDateTime ? (d.tick as Date).getTime() : (d.tick as number)));

			// Coordinate arrays (monotonic but not necessarily uniformly spaced)
			const xC = xCoords;
			const yC = yCoords;

			// Categorical lookup maps
			const xCatMap: Map<string, number> | null = xIsCategorical
				? new Map(domain.x.map((d) => [String(d.tick), d.coordinate]))
				: null;
			const yCatMap: Map<string, number> | null = yIsCategorical
				? new Map(domain.y.map((d) => [String(d.tick), d.coordinate]))
				: null;

			function interpContinuous(value: number, ticks: number[], coords: number[]): number {
				const n = ticks.length;
				if (n === 0) return NaN;
				if (n === 1) return coords[0];
				if (value <= ticks[0]) return coords[0];
				if (value >= ticks[n - 1]) return coords[n - 1];
				// Binary search for largest index i such that ticks[i] <= value < ticks[i+1]
				let lo = 0,
					hi = n - 1;
				while (lo + 1 < hi) {
					const mid = (lo + hi) >>> 1;
					if (ticks[mid] <= value) lo = mid;
					else hi = mid;
				}
				const i = lo;
				const t0 = ticks[i];
				const t1 = ticks[i + 1];
				const c0 = coords[i];
				const c1 = coords[i + 1];
				const denom = t1 - t0;
				if (denom === 0) return c0;
				const t = (value - t0) / denom;
				return c0 + t * (c1 - c0);
			}

			function mapX(val: string | number | Date): number {
				if (xIsCategorical) {
					// Only exact matches allowed for categorical
					return xCatMap!.get(String(val)) ?? NaN;
				}
				const v = xIsDateTime ? (val instanceof Date ? val.getTime() : new Date(val as any).getTime()) : (val as number);
				if (Number.isNaN(v)) return NaN;
				return interpContinuous(v, xTicksNum, xC);
			}

			function mapY(val: string | number | Date): number {
				if (yIsCategorical) {
					// Only exact matches allowed for categorical
					return yCatMap!.get(String(val)) ?? NaN;
				}
				const v = yIsDateTime ? (val instanceof Date ? val.getTime() : new Date(val as any).getTime()) : (val as number);
				if (Number.isNaN(v)) return NaN;
				return interpContinuous(v, yTicksNum, yC);
			}

			return (data: CartesianDataset[number]["data"]): Float32Array => {
				const cached = byData!.get(data);
				if (cached) return cached;
				const len = data.length;
				const out = new Float32Array(len << 1);
				for (let i = 0; i < len; i++) {
					const d = data[i];
					const j = i << 1;
					out[j] = mapX(d.x);
					out[j + 1] = mapY(d.y);
				}
				byData!.set(data, out);
				return out;
			};
		}
		// Affine transform constants (keep as Number to avoid precision loss with large ms timestamps)
		const xMin = +domain.x[0].tick;
		const xMax = +domain.x[xLen - 1].tick;
		const yMin = +domain.y[0].tick;
		const yMax = +domain.y[yLen - 1].tick;
		const xRrange = 1 / (xMax - xMin);
		const yRrange = 1 / (yMax - yMin);
		const xCrange = xCoords[xLen - 1] - xCoords[0];
		const yCrange = yCoords[yLen - 1] - yCoords[0];
		const xScale = xRrange * xCrange;
		const yScale = yRrange * yCrange;
		const xOffset = xCoords[0] - xMin * xScale;
		const yOffset = yCoords[0] - yMin * yScale;

		// Local aliases so the JIT treats them as true locals (no closure-cell loads)
		const sx = xScale,
			sy = yScale,
			ox = xOffset,
			oy = yOffset;

		// Reusable buffer to amortize allocations; slice returns a fresh copy for caching safety
		let xyBuf = new Float32Array(0);
		function ensureCapacity(n: number) {
			const need = n << 1; // interleaved [x,y]
			if (xyBuf.length >= need) return;
			let cap = xyBuf.length || 2;
			while (cap < need) cap <<= 1;
			xyBuf = new Float32Array(cap);
		}

		return (data: CartesianDataset[number]["data"]): Float32Array => {
			const xIsDate = xIsDateTime; /* re-localize for JIT */
			const yIsDate = yIsDateTime; /* re-localize for JIT */
			const cached = byData!.get(data);
			if (cached) return cached;
			const len = data.length;
			ensureCapacity(len);
			const xy = xyBuf.slice(0, len << 1);
			for (let i = 0; i < len; i++) {
				const d = data[i];
				const j = i << 1;
				const vx = xIsDate ? (d.x as Date).getTime() : (d.x as number);
				const vy = yIsDate ? (d.y as Date).getTime() : (d.y as number);
				xy[j] = vx * sx + ox;
				xy[j + 1] = vy * sy + oy;
			}
			byData!.set(data, xy);
			return xy;
		};
	},
	/**
	 * Optimized linear path from user data -> SVG string.
	 * Mirrors the signature of `xyCoordinatesForDataset`, but returns a path string builder.
	 *
	 * Fast-path when both axes are numeric/datetime with uniform ticks and coordinate spacing.
	 * Falls back to generic mapping + `CurveUtils.linear` otherwise.
	 */
	linear: (context: Pick<InternalGraphContext, "viewbox" | "domain">) => {
		const { domain } = context;
		// Per-context cache for generated path strings
		let byData = pathCacheFor.get(context);
		if (!byData) {
			byData = new WeakMap();
			pathCacheFor.set(context, byData);
		}

		// ---- Precompute once ----
		const xLen = domain.x.length;
		const yLen = domain.y.length;
		const xCoords = domain.x.map((d) => d.coordinate);
		const yCoords = domain.y.map((d) => d.coordinate);
		const xIsDateTime = domain.x[0]?.tick instanceof Date;
		const yIsDateTime = domain.y[0]?.tick instanceof Date;

		const xIsJumpUniform = domain.x.every((d, i, a) => i === 0 || +d.tick - +a[i - 1].tick === +a[1].tick - +a[0].tick);
		const yIsJumpUniform = domain.y.every((d, i, a) => i === 0 || +d.tick - +a[i - 1].tick === +a[1].tick - +a[0].tick);
		const xIsCoordUniform = xCoords.every((c, i, a) => i === 0 || Math.round(c - a[i - 1]) === Math.round(a[1] - a[0]));
		const yIsCoordUniform = yCoords.every((c, i, a) => i === 0 || Math.round(c - a[i - 1]) === Math.round(a[1] - a[0]));
		const isXLinearOptimized = xIsJumpUniform && xIsCoordUniform && (xIsDateTime || typeof domain.x[0]?.tick === "number");
		const isYLinearOptimized = yIsJumpUniform && yIsCoordUniform && (yIsDateTime || typeof domain.y[0]?.tick === "number");

		if (!(isXLinearOptimized && isYLinearOptimized)) {
			// Fallback: reuse existing mapping + path writer
			const toXY = CoordinatesUtils.xyCoordinatesForDataset(context);
			return (data: CartesianDataset[number]["data"]): string => {
				const cached = byData!.get(data);
				if (cached) return cached;
				const xy = toXY(data);
				const path = CurveUtils.linear(xy);
				byData!.set(data, path);
				return path;
			};
		}

		// Affine transform constants
		const xMin = +domain.x[0].tick;
		const xMax = +domain.x[xLen - 1].tick;
		const yMin = +domain.y[0].tick;
		const yMax = +domain.y[yLen - 1].tick;
		const xRrange = 1 / (xMax - xMin);
		const yRrange = 1 / (yMax - yMin);
		const xCrange = xCoords[xLen - 1] - xCoords[0];
		const yCrange = yCoords[yLen - 1] - yCoords[0];
		const xScale = xRrange * xCrange;
		const yScale = yRrange * yCrange;
		const xOffset = xCoords[0] - xMin * xScale;
		const yOffset = yCoords[0] - yMin * yScale;

		// local aliases
		const sx = xScale, sy = yScale, ox = xOffset, oy = yOffset;

		return (data: CartesianDataset[number]["data"]): string => {
			const cached = byData!.get(data);
			if (cached) return cached;
			const len = data.length;
			if (len === 0) return "";

			let o = 0;
			const xIsDate = xIsDateTime;
			const yIsDate = yIsDateTime;

			// --- first absolute move 'M x y' ---
			const d0 = data[0];
			const vx0 = xIsDate ? (d0.x as Date).getTime() : (d0.x as number);
			const vy0 = yIsDate ? (d0.y as Date).getTime() : (d0.y as number);
			let px = (vx0 * sx + ox) | 0;
			let py = (vy0 * sy + oy) | 0;
			{

				buffer[o++] = 77; // 'M'

				// write X (px)
				{
					let n = px;
					if (n < 0) { buffer[o++] = 45; n = -n; }
					let s = (n * 100 + 0.5) | 0;
					let q = (s / 100) | 0;
					let r = s - q * 100;
					if (q < 10) { buffer[o++] = 48 + q; }
					else if (q < 100) { let t = (q / 10) | 0; buffer[o++] = 48 + t; buffer[o++] = 48 + (q - t * 10); }
					else if (q < 1000) { let h = (q / 100) | 0; let rem = q - h * 100; let t = (rem / 10) | 0; buffer[o++] = 48 + h; buffer[o++] = 48 + t; buffer[o++] = 48 + (rem - t * 10); }
					else { let th = (q / 1000) | 0; let rem1 = q - th * 1000; let h = (rem1 / 100) | 0; let rem2 = rem1 - h * 100; let t = (rem2 / 10) | 0; buffer[o++] = 48 + th; buffer[o++] = 48 + h; buffer[o++] = 48 + t; buffer[o++] = 48 + (rem2 - t * 10); }
					if (r !== 0) { buffer[o++] = 46; let t = (r / 10) | 0; buffer[o++] = 48 + t; buffer[o++] = 48 + (r - t * 10); }
					buffer[o++] = 32; // space
				}

				// write Y (py)
				{
					let n = py;
					if (n < 0) { buffer[o++] = 45; n = -n; }
					let s = (n * 100 + 0.5) | 0;
					let q = (s / 100) | 0;
					let r = s - q * 100;
					if (q < 10) { buffer[o++] = 48 + q; }
					else if (q < 100) { let t = (q / 10) | 0; buffer[o++] = 48 + t; buffer[o++] = 48 + (q - t * 10); }
					else if (q < 1000) { let h = (q / 100) | 0; let rem = q - h * 100; let t = (rem / 10) | 0; buffer[o++] = 48 + h; buffer[o++] = 48 + t; buffer[o++] = 48 + (rem - t * 10); }
					else { let th = (q / 1000) | 0; let rem1 = q - th * 1000; let h = (rem1 / 100) | 0; let rem2 = rem1 - h * 100; let t = (rem2 / 10) | 0; buffer[o++] = 48 + th; buffer[o++] = 48 + h; buffer[o++] = 48 + t; buffer[o++] = 48 + (rem2 - t * 10); }
					if (r !== 0) { buffer[o++] = 46; let t = (r / 10) | 0; buffer[o++] = 48 + t; buffer[o++] = 48 + (r - t * 10); }
				}


				// draw remaining points
				for (let i = 1; i < len; i++) {
					const di = data[i];
					const vx = xIsDate ? (di.x as Date).getTime() : (di.x as number);
					const vy = yIsDate ? (di.y as Date).getTime() : (di.y as number);
					const cx = (vx * sx + ox) | 0;
					const cy = (vy * sy + oy) | 0;
					let dx = (cx - px) | 0;
					let dy = (cy - py) | 0;
					if ((dx | dy) === 0) { px = cx; py = cy; continue; }
					if (dy === 0) {
						buffer[o++] = 104; // 'h'
						let n = dx; if (n < 0) { buffer[o++] = 45; n = -n; }
						let s = (n * 100 + 0.5) | 0; let q = (s / 100) | 0; let r = s - q * 100;
						if (q < 10) { buffer[o++] = 48 + q; }
						else if (q < 100) { let t = (q / 10) | 0; buffer[o++] = 48 + t; buffer[o++] = 48 + (q - t * 10); }
						else if (q < 1000) { let h = (q / 100) | 0; let rem = q - h * 100; let t = (rem / 10) | 0; buffer[o++] = 48 + h; buffer[o++] = 48 + t; buffer[o++] = 48 + (rem - t * 10); }
						else { let th = (q / 1000) | 0; let rem1 = q - th * 1000; let h = (rem1 / 100) | 0; let rem2 = rem1 - h * 100; let t = (rem2 / 10) | 0; buffer[o++] = 48 + th; buffer[o++] = 48 + h; buffer[o++] = 48 + t; buffer[o++] = 48 + (rem2 - t * 10); }
						if (r !== 0) { let t = (r / 10) | 0; buffer[o++] = 46; buffer[o++] = 48 + t; buffer[o++] = 48 + (r - t * 10); }
						px = cx; py = cy; continue;
					}
					if (dx === 0) {
						buffer[o++] = 118; // 'v'
						let n = dy; if (n < 0) { buffer[o++] = 45; n = -n; }
						let s = (n * 100 + 0.5) | 0; let q = (s / 100) | 0; let r = s - q * 100;
						if (q < 10) { buffer[o++] = 48 + q; }
						else if (q < 100) { let t = (q / 10) | 0; buffer[o++] = 48 + t; buffer[o++] = 48 + (q - t * 10); }
						else if (q < 1000) { let h = (q / 100) | 0; let rem = q - h * 100; let t = (rem / 10) | 0; buffer[o++] = 48 + h; buffer[o++] = 48 + t; buffer[o++] = 48 + (rem - t * 10); }
						else { let th = (q / 1000) | 0; let rem1 = q - th * 1000; let h = (rem1 / 100) | 0; let rem2 = rem1 - h * 100; let t = (rem2 / 10) | 0; buffer[o++] = 48 + th; buffer[o++] = 48 + h; buffer[o++] = 48 + t; buffer[o++] = 48 + (rem2 - t * 10); }
						if (r !== 0) { buffer[o++] = 46; let t = (r / 10) | 0; buffer[o++] = 48 + t; buffer[o++] = 48 + (r - t * 10); }
						px = cx; py = cy; continue;
					}
					buffer[o++] = 108; // 'l'
					// dx
					{
						let n = dx; if (n < 0) { buffer[o++] = 45; n = -n; }
						let s = (n * 100 + 0.5) | 0; let q = (s / 100) | 0; let r = s - q * 100;
						if (q < 10) { buffer[o++] = 48 + q; }
						else if (q < 100) { let t = (q / 10) | 0; buffer[o++] = 48 + t; buffer[o++] = 48 + (q - t * 10); }
						else if (q < 1000) { let h = (q / 100) | 0; let rem = q - h * 100; let t = (rem / 10) | 0; buffer[o++] = 48 + h; buffer[o++] = 48 + t; buffer[o++] = 48 + (rem - t * 10); }
						else { let th = (q / 1000) | 0; let rem1 = q - th * 1000; let h = (rem1 / 100) | 0; let rem2 = rem1 - h * 100; let t = (rem2 / 10) | 0; buffer[o++] = 48 + th; buffer[o++] = 48 + h; buffer[o++] = 48 + t; buffer[o++] = 48 + (rem2 - t * 10); }
						if (r !== 0) { let t = (r / 10) | 0; buffer[o++] = 46; buffer[o++] = 48 + t; buffer[o++] = 48 + (r - t * 10); }
					}
					// space and dy
					{
						buffer[o++] = 32;
						let n = dy; if (n < 0) { buffer[o++] = 45; n = -n; }
						let s = (n * 100 + 0.5) | 0; let q = (s / 100) | 0; let r = s - q * 100;
						if (q < 10) { buffer[o++] = 48 + q; }
						else if (q < 100) { let t = (q / 10) | 0; buffer[o++] = 48 + t; buffer[o++] = 48 + (q - t * 10); }
						else if (q < 1000) { let h = (q / 100) | 0; let rem = q - h * 100; let t = (rem / 10) | 0; buffer[o++] = 48 + h; buffer[o++] = 48 + t; buffer[o++] = 48 + (rem - t * 10); }
						else { let th = (q / 1000) | 0; let rem1 = q - th * 1000; let h = (rem1 / 100) | 0; let rem2 = rem1 - h * 100; let t = (rem2 / 10) | 0; buffer[o++] = 48 + th; buffer[o++] = 48 + h; buffer[o++] = 48 + t; buffer[o++] = 48 + (rem2 - t * 10); }
						if (r !== 0) { buffer[o++] = 46; let t = (r / 10) | 0; buffer[o++] = 48 + t; buffer[o++] = 48 + (r - t * 10); }
					}
					px = cx; py = cy;
				}
			}

			const path = decoder.decode(buffer.subarray(0, o));
			byData!.set(data, path);
			return path;
		};
	},
	xCoordinateFor: (ctx: Pick<InternalGraphContext, "viewbox" | "domain">) => {
		const xy = CoordinatesUtils.xyCoordinatesForDataset(ctx);
		return (value: string | number | Date): number => {
			return xy([{ x: value, y: 0 }])[0];
		};
	},
	yCoordinateFor: (ctx: Pick<InternalGraphContext, "viewbox" | "domain">) => {
		const xy = CoordinatesUtils.xyCoordinatesForDataset(ctx);
		return (value: string | number | Date): number => {
			return xy([{ x: 0, y: value }])[1];
		};
	},
};
