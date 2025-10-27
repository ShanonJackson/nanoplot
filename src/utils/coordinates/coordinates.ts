import { CartesianDataset, InternalGraphContext } from "../../hooks/use-graph/use-graph";

/* avoids doing work for same ref multiple times across multiple components, without effecting garbage collection */
const cacheFor = new WeakMap<
	Pick<InternalGraphContext, "viewbox" | "domain">,
	WeakMap<CartesianDataset[number]["data"], Array<{ x: number; y: number }>>
>();
export const CoordinatesUtils = {
	xyCoordinatesForDataset: (context: Pick<InternalGraphContext, "viewbox" | "domain">) => {
		const { domain } = context;

		// ---- Precompute once (all cheap) ----
		const xLen = domain.x.length;
		const yLen = domain.y.length;

		const xCoords = domain.x.map((d) => d.coordinate);
		const yCoords = domain.y.map((d) => d.coordinate);

		const xMin = +domain.x[0].tick;
		const xMax = +domain.x[xLen - 1].tick;
		const yMin = +domain.y[0].tick;
		const yMax = +domain.y[yLen - 1].tick;
		const xRrange = 1 / (xMax - xMin);
		const yRrange = 1 / (yMax - yMin);

		const xCrange = xCoords[xLen - 1] - xCoords[0];
		const yCrange = yCoords[yLen - 1] - yCoords[0];

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
			// Fallback to your existing general path if needed.
			return (data: CartesianDataset[number]["data"]) => {
				// Delegate to your non-linear handler here.
				// This keeps this file's contract intact without changing your other code.
				throw new Error("makeLinearMapper called for non-linear domain");
			};
		}

		// Affine transform constants (keep as Number to avoid precision loss with large ms timestamps)
		const xScale = xRrange * xCrange;
		const yScale = yRrange * yCrange;
		const xOffset = xCoords[0] - xMin * xScale;
		const yOffset = yCoords[0] - yMin * yScale;

		// Local aliases so the JIT treats them as true locals (no closure-cell loads)
		const sx = xScale,
			sy = yScale,
			ox = xOffset,
			oy = yOffset;

		// ---- Reusable buffer for interleaved XY (remove allocator & zero-fill cost per call) ----
		let xyBuf = new Float32Array(0);

		function ensureCapacity(n: number) {
			const need = n << 1; // interleaved [x,y]
			if (xyBuf.length >= need) return;
			let cap = xyBuf.length || 2;
			while (cap < need) cap <<= 1;
			xyBuf = new Float32Array(cap);
		}

		// ---- Specialize the hot loop once based on Date vs Number ----
		if (xIsDateTime && yIsDateTime) {
			// Fast path: both axes are Date → use getTime() each iteration, no per-elem branching
			return (data: CartesianDataset[number]["data"]): Float32Array => {
				const len = data.length;
				ensureCapacity(len);
				const xy = xyBuf.subarray(0, len << 1);

				// Tight scalar loop; no destructuring; single property read per field
				for (let i = 0; i < len; i++) {
					const d = data[i];
					const j = i << 1;
					xy[j] = (d.x as Date).getTime() * sx + ox;
					xy[j + 1] = (d.y as Date).getTime() * sy + oy;
				}
				// Return a cloned buffer to avoid cross-call mutation.
				return xy.slice();
			};
		}

		// Mixed cases: still hoist the Date/Number decision out of the loop.
		const xIsDate = xIsDateTime;
		const yIsDate = yIsDateTime;

		return (data: CartesianDataset[number]["data"]): Float32Array => {
			const len = data.length;
			ensureCapacity(len);
			const xy = xyBuf.slice(0, len << 1);

			if (xIsDate && !yIsDate) {
				for (let i = 0; i < len; i++) {
					const d = data[i];
					const j = i << 1;
					xy[j] = (d.x as Date).getTime() * sx + ox;
					xy[j + 1] = (d.y as number) * sy + oy;
				}
			} else if (!xIsDate && yIsDate) {
				for (let i = 0; i < len; i++) {
					const d = data[i];
					const j = i << 1;
					xy[j] = (d.x as number) * sx + ox;
					xy[j + 1] = (d.y as Date).getTime() * sy + oy;
				}
			} else {
				// both numeric
				for (let i = 0; i < len; i++) {
					const d = data[i];
					const j = i << 1;
					xy[j] = (d.x as number) * sx + ox;
					xy[j + 1] = (d.y as number) * sy + oy;
				}
				// Return a cloned buffer to avoid cross-call mutation.
			}
			return xy;
		};
	},
	xCoordinateFor: ({
		domain,
		viewbox,
	}: {
		viewbox: InternalGraphContext["viewbox"];
		domain: { x: InternalGraphContext["domain"]["x"] };
	}) => {
		const length = domain.x.length;
		const xTicks = domain.x.map((d) => +d.tick);
		const coordinates = domain.x.map((d) => d.coordinate);
		const min = xTicks[0];
		const max = xTicks[length - 1];
		const isJumpUniform = xTicks.every((tick, i, arr) => i === 0 || tick - arr[i - 1] === arr[1] - arr[0]);
		const isCoordinatesUniform = coordinates.every(
			(coord, i, arr) => i === 0 || Math.round(coord - arr[i - 1]) === Math.round(arr[1] - arr[0]),
		);
		const isLinearScale = isJumpUniform && isCoordinatesUniform;
		const rrange = 1 / (max - min);
		const crange = coordinates[length - 1] - coordinates[0];
		const isDateTime = domain.x[0]?.tick instanceof Date;
		const isNumericalScale = typeof domain.x[0]?.tick === "number";
		const isCategoricalScale = typeof domain.x[0]?.tick === "string";
		if (isLinearScale && (isDateTime || isNumericalScale)) {
			return (value: number | string | Date) => {
				const v = (
					value instanceof Date ? value.getTime() : value
				) as number; /* .getTime() on date's required; Performance improvement */
				return coordinates[0] + (v - min) * rrange * crange;
			};
		}
		if (isCategoricalScale) {
			return (value: number | string | Date) => {
				return domain.x.find((d) => d.tick === value)?.coordinate ?? 0;
			};
		}
		return (value: number | string | Date) => {
			const numValue = +value;
			if (numValue < min) return 0;
			if (numValue > max) return viewbox.x;
			let left = 0;
			let right = length - 1;
			while (left < right) {
				const mid = (left + right) >> 1;
				if (xTicks[mid] < numValue) left = mid + 1;
				else right = mid;
			}
			const lowIdx = Math.max(left - 1, 0);
			const highIdx = Math.min(left, length - 1);
			return xTicks[lowIdx] === xTicks[highIdx]
				? coordinates[lowIdx]
				: coordinates[lowIdx] +
						((numValue - xTicks[lowIdx]) / (xTicks[highIdx] - xTicks[lowIdx])) * (coordinates[highIdx] - coordinates[lowIdx]);
		};
	},
	yCoordinateFor: ({
		domain,
		viewbox,
	}: {
		viewbox: InternalGraphContext["viewbox"];
		domain: { y: InternalGraphContext["domain"]["y"] };
	}) => {
		const length = domain.y.length;
		const yTicks = domain.y.map((d) => +d.tick);
		const coordinates = domain.y.map((d) => d.coordinate);
		const min = yTicks[0];
		const max = yTicks[length - 1];
		const isJumpUniform = yTicks.every((tick, i, arr) => i === 0 || tick - arr[i - 1] === arr[1] - arr[0]);
		const isCoordinatesUniform = coordinates.every(
			(coord, i, arr) => i === 0 || Math.round(coord - arr[i - 1]) === Math.round(arr[1] - arr[0]),
		);
		const isLinearScale = isJumpUniform && isCoordinatesUniform;
		const rrange = 1 / (max - min);
		const crange = coordinates[length - 1] - coordinates[0];
		const isNumericalScale = typeof domain.y[0]?.tick === "number";
		const isDateTimeScale = domain.y[0]?.tick instanceof Date;
		const isCategoricalScale = typeof domain.y[0]?.tick === "string";
		if (isLinearScale && (isNumericalScale || isDateTimeScale)) {
			return (value: number | string | Date) => {
				const v = (
					value instanceof Date ? value.getTime() : value
				) as number; /* .getTime() on date's required; Performance improvement */
				return coordinates[0] + (v - min) * rrange * crange;
			};
		}
		if (isCategoricalScale) {
			return (value: number | string | Date) => {
				return domain.y.find((d) => d.tick === value)?.coordinate ?? 0;
			};
		}
		return (value: number | string | Date) => {
			const numValue = value instanceof Date ? value.getTime() : +value; /* .getTime() on date's required; Performance improvement */
			if (numValue > max) return 0;
			if (numValue < min) return viewbox.y;
			let left = 0;
			let right = length - 1;
			while (left < right) {
				const mid = (left + right) >> 1;
				if (yTicks[mid] < numValue) left = mid + 1;
				else right = mid;
			}
			const lowIdx = Math.max(left - 1, 0);
			const highIdx = Math.min(left, length - 1);
			const highTick = yTicks[highIdx];
			const lowCoord = coordinates[lowIdx];
			const highCoord = coordinates[highIdx];
			return yTicks[lowIdx] === highTick
				? lowCoord
				: lowCoord + ((numValue - yTicks[lowIdx]) / (highTick - yTicks[lowIdx])) * (highCoord - lowCoord);
		};
	},
};

export const xCoordinateFor = ({
	domain,
	viewbox,
}: {
	viewbox: InternalGraphContext["viewbox"];
	domain: { x: InternalGraphContext["domain"]["x"] };
}) => {
	const length = domain.x.length;
	const xTicks = domain.x.map((d) => +d.tick);
	const coordinates = domain.x.map((d) => d.coordinate);
	const min = xTicks[0];
	const max = xTicks[length - 1];
	const isJumpUniform = xTicks.every((tick, i, arr) => i === 0 || tick - arr[i - 1] === arr[1] - arr[0]);
	const isCoordinatesUniform = coordinates.every(
		(coord, i, arr) => i === 0 || Math.round(coord - arr[i - 1]) === Math.round(arr[1] - arr[0]),
	);
	const isLinearScale = isJumpUniform && isCoordinatesUniform;
	const rrange = 1 / (max - min);
	const crange = coordinates[length - 1] - coordinates[0];
	const isDateTime = domain.x[0]?.tick instanceof Date;
	const isNumericalScale = typeof domain.x[0]?.tick === "number";
	const isCategoricalScale = typeof domain.x[0]?.tick === "string";
	if (isLinearScale && (isDateTime || isNumericalScale)) {
		return (value: number | string | Date) => {
			const v = (
				value instanceof Date ? value.getTime() : value
			) as number; /* .getTime() on date's required; Performance improvement */
			return coordinates[0] + (v - min) * rrange * crange;
		};
	}
	if (isCategoricalScale) {
		return (value: number | string | Date) => {
			return domain.x.find((d) => d.tick === value)?.coordinate ?? 0;
		};
	}
	return (value: number | string | Date) => {
		const numValue = +value;
		if (numValue <= min) return 0;
		if (numValue >= max) return viewbox.x;
		let left = 0;
		let right = length - 1;
		while (left < right) {
			const mid = (left + right) >> 1;
			if (xTicks[mid] < numValue) left = mid + 1;
			else right = mid;
		}
		const lowIdx = Math.max(left - 1, 0);
		const highIdx = Math.min(left, length - 1);
		return xTicks[lowIdx] === xTicks[highIdx]
			? coordinates[lowIdx]
			: coordinates[lowIdx] +
					((numValue - xTicks[lowIdx]) / (xTicks[highIdx] - xTicks[lowIdx])) * (coordinates[highIdx] - coordinates[lowIdx]);
	};
};

export const yCoordinateFor = ({
	domain,
	viewbox,
}: {
	viewbox: InternalGraphContext["viewbox"];
	domain: { y: InternalGraphContext["domain"]["y"] };
}) => {
	const length = domain.y.length;
	const yTicks = domain.y.map((d) => +d.tick);
	const coordinates = domain.y.map((d) => d.coordinate);
	const min = yTicks[0];
	const max = yTicks[length - 1];
	const isJumpUniform = yTicks.every((tick, i, arr) => i === 0 || tick - arr[i - 1] === arr[1] - arr[0]);
	const isCoordinatesUniform = coordinates.every(
		(coord, i, arr) => i === 0 || Math.round(coord - arr[i - 1]) === Math.round(arr[1] - arr[0]),
	);
	const isLinearScale = isJumpUniform && isCoordinatesUniform;
	const rrange = 1 / (max - min);
	const crange = coordinates[length - 1] - coordinates[0];
	const isNumericalScale = typeof domain.y[0]?.tick === "number";
	const isDateTimeScale = domain.y[0]?.tick instanceof Date;
	const isCategoricalScale = typeof domain.y[0]?.tick === "string";
	if (isLinearScale && (isNumericalScale || isDateTimeScale)) {
		return (value: number | string | Date) => {
			const v = (
				value instanceof Date ? value.getTime() : value
			) as number; /* .getTime() on date's required; Performance improvement */
			return coordinates[0] + (v - min) * rrange * crange;
		};
	}
	if (isCategoricalScale) {
		return (value: number | string | Date) => {
			return domain.y.find((d) => d.tick === value)?.coordinate ?? 0;
		};
	}
	return (value: number | string | Date) => {
		const numValue = +value;
		if (numValue >= max) return 0;
		if (numValue <= min) return viewbox.y;
		let left = 0;
		let right = length - 1;
		while (left < right) {
			const mid = (left + right) >> 1;
			if (yTicks[mid] < numValue) left = mid + 1;
			else right = mid;
		}
		const lowIdx = Math.max(left - 1, 0);
		const highIdx = Math.min(left, length - 1);
		const highTick = yTicks[highIdx];
		const lowCoord = coordinates[lowIdx];
		const highCoord = coordinates[highIdx];
		return yTicks[lowIdx] === highTick
			? lowCoord
			: lowCoord + ((numValue - yTicks[lowIdx]) / (highTick - yTicks[lowIdx])) * (highCoord - lowCoord);
	};
};
