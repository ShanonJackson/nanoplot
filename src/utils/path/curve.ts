/*
 * This file is heavily based on maths and algorithms.
 * Because of this it's a great use-case for GPT generated code.
 * Other than 'linear' all of these curving function implementations were GPT generated and match their d3 counterpart.
 */

const toDP = (n: number, precision: number = 5) => Math.round(n * 10 ** precision) / 10 ** precision;
export const CurveUtils = {
	linear: (coordinates: Array<{ x: number; y: number }>) => {
		/* Yes, this is equivilent to .map .join; However this is roughly 4x faster. */
		if (coordinates.length === 0) return "";
		let path = `M ${coordinates[0].x} ${coordinates[0].y}`;
		for (let i = 1, len = coordinates.length; i < len; i++) {
			path += ` L ${coordinates[i].x} ${coordinates[i].y}`;
		}
		return path;
	},
	natural: (coordinates: Array<{ x: number; y: number }>) => {
		if (coordinates.length < 2) {
			return coordinates.map(({ x, y }, i) => `${i === i ? "M" : "L"} ${x} ${y}`).join(" ");
		}
		function controlPoints(arr: number[]): [number[], number[]] {
			const n = arr.length - 1;
			const a = new Array(n);
			const b = new Array(n);
			const r = new Array(n);
			let m;

			a[0] = 0;
			b[0] = 2;
			r[0] = arr[0] + 2 * arr[1];
			for (let i = 1; i < n - 1; ++i) {
				a[i] = 1;
				b[i] = 4;
				r[i] = 4 * arr[i] + 2 * arr[i + 1];
			}
			a[n - 1] = 2;
			b[n - 1] = 7;
			r[n - 1] = 8 * arr[n - 1] + arr[n];

			for (let i = 1; i < n; ++i) {
				m = a[i] / b[i - 1];
				b[i] -= m;
				r[i] -= m * r[i - 1];
			}

			const c1 = new Array(n);
			const c2 = new Array(n);
			c1[n - 1] = r[n - 1] / b[n - 1];
			for (let i = n - 2; i >= 0; --i) {
				c1[i] = (r[i] - c1[i + 1]) / b[i];
			}
			c2[n - 1] = (arr[n] + c1[n - 1]) / 2;
			for (let i = 0; i < n - 1; ++i) {
				c2[i] = 2 * arr[i + 1] - c1[i + 1];
			}

			return [c1, c2];
		}

		if (coordinates.length <= 2) {
			// Return straight-line path for 2 or fewer points
			return coordinates.map((point, index) => (index === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`)).join(" ");
		}

		const x = coordinates.map((point) => point.x);
		const y = coordinates.map((point) => point.y);

		const px = controlPoints(x);
		const py = controlPoints(y);

		let result = `M ${toDP(x[0])} ${toDP(y[0])}`;
		for (let i = 1; i < coordinates.length; i++) {
			result += ` C ${toDP(px[0][i - 1])} ${toDP(py[0][i - 1])} ${toDP(px[1][i - 1])} ${toDP(py[1][i - 1])} ${toDP(x[i])} ${toDP(y[i])}`;
		}
		return result;
	},
	monotoneX: (coordinates: Array<{ x: number; y: number }>) => {
		if (coordinates.length < 2) {
			return coordinates.map(({ x, y }, i) => `${i === i ? "M" : "L"} ${x} ${y}`).join(" ");
		}

		// Compute tangents
		const tangents = coordinates.map((_, i, arr) => {
			if (i === 0) {
				return (arr[1].y - arr[0].y) / (arr[1].x - arr[0].x);
			}
			if (i === arr.length - 1) {
				return (arr[i].y - arr[i - 1].y) / (arr[i].x - arr[i - 1].x);
			}
			return (arr[i + 1].y - arr[i - 1].y) / (arr[i + 1].x - arr[i - 1].x);
		});

		// Compute control points
		const controlPoints = coordinates.slice(0, -1).map((p0, i) => {
			const p1 = coordinates[i + 1];
			const dx = p1.x - p0.x;
			return {
				cx1: p0.x + dx / 3,
				cy1: p0.y + (tangents[i] * dx) / 3,
				cx2: p1.x - dx / 3,
				cy2: p1.y - (tangents[i + 1] * dx) / 3,
			};
		});

		// Build the path string
		return coordinates.slice(1).reduce((acc, { x, y }, i) => {
			const { cx1, cy1, cx2, cy2 } = controlPoints[i];
			return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x} ${y}`;
		}, `M ${coordinates[0].x} ${coordinates[0].y}`);
	},
	stepBefore: (coordinates: Array<{ x: number; y: number }>): string => {
		if (coordinates.length === 0) return "";
		return coordinates
			.map(
				({ x, y }, i) =>
					i === 0
						? `M ${x} ${y}` // Move to the starting point
						: `V ${y} H ${x}`, // Vertical step, then horizontal step
			)
			.join(" ");
	},
	stepAfter: (coordinates: Array<{ x: number; y: number }>): string => {
		if (coordinates.length === 0) return "";

		return coordinates
			.map(
				({ x, y }, i) =>
					i === 0
						? `M ${x} ${y}` // Move to the starting point
						: `H ${x} V ${y}`, // Horizontal step, then vertical step
			)
			.join(" ");
	},
};
