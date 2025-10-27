/*
 * This file is heavily based on maths and algorithms.
 * Because of this it's a great use-case for GPT generated code.
 * Other than 'linear' all of these curving function implementations were GPT generated and match their d3 counterpart.
 */
const toDP = (n: number, precision: number = 5) => Math.round(n * 10 ** precision) / 10 ** precision;
const decoder = new TextDecoder();

const MAX_POINTS = 200_000;
const buffer = new Uint8Array(MAX_POINTS * 12 + 1);
export const CurveUtils = {
	linear: (coords: Array<{ x: number; y: number }>): string => {
		if (coords.length === 0) return "";
		const len = coords.length;

		let o = 0;
		let px = 0,
			py = 0;

		for (let i = 0; i < len; i++) {
			const cx = coords[i].x | 0; // keep monomorphic ints where possible
			const cy = coords[i].y | 0;

			if (i === 0) {
				// 'M' abs move for first point
				buffer[o++] = 77; // 'M'
				// --- write X (absolute) ---
				let n = cx;
				if (n < 0) {
					buffer[o++] = 45;
					n = -n;
				}
				// scale & round to 2dp
				let s = (n * 100 + 0.5) | 0;
				let q = (s / 100) | 0; // int part
				let r = s - q * 100; // frac part (no %)
				// q is 0..10000 in your bounds

				// integer digits
				if (q < 10) {
					buffer[o++] = 48 + q;
				} else if (q < 100) {
					// tens / ones without %
					let t = (q / 10) | 0;
					buffer[o++] = 48 + t;
					buffer[o++] = 48 + (q - t * 10);
				} else if (q < 1000) {
					let h = (q / 100) | 0;
					let rem = q - h * 100;
					let t = (rem / 10) | 0;
					buffer[o++] = 48 + h;
					buffer[o++] = 48 + t;
					buffer[o++] = 48 + (rem - t * 10);
				} else {
					let th = (q / 1000) | 0;
					let rem1 = q - th * 1000;
					let h = (rem1 / 100) | 0;
					let rem2 = rem1 - h * 100;
					let t = (rem2 / 10) | 0;
					buffer[o++] = 48 + th;
					buffer[o++] = 48 + h;
					buffer[o++] = 48 + t;
					buffer[o++] = 48 + (rem2 - t * 10);
				}
				if (r !== 0) {
					buffer[o++] = 46; // '.'
					let t = (r / 10) | 0;
					buffer[o++] = 48 + t;
					buffer[o++] = 48 + (r - t * 10);
				}
				buffer[o++] = 32; // ' '

				// --- write Y (absolute) ---
				n = cy;
				if (n < 0) {
					buffer[o++] = 45;
					n = -n;
				}
				s = (n * 100 + 0.5) | 0;
				q = (s / 100) | 0;
				r = s - q * 100;

				if (q < 10) {
					buffer[o++] = 48 + q;
				} else if (q < 100) {
					let t = (q / 10) | 0;
					buffer[o++] = 48 + t;
					buffer[o++] = 48 + (q - t * 10);
				} else if (q < 1000) {
					let h = (q / 100) | 0;
					let rem = q - h * 100;
					let t = (rem / 10) | 0;
					buffer[o++] = 48 + h;
					buffer[o++] = 48 + t;
					buffer[o++] = 48 + (rem - t * 10);
				} else {
					let th = (q / 1000) | 0;
					let rem1 = q - th * 1000;
					let h = (rem1 / 100) | 0;
					let rem2 = rem1 - h * 100;
					let t = (rem2 / 10) | 0;
					buffer[o++] = 48 + th;
					buffer[o++] = 48 + h;
					buffer[o++] = 48 + t;
					buffer[o++] = 48 + (rem2 - t * 10);
				}
				if (r !== 0) {
					buffer[o++] = 46;
					let t = (r / 10) | 0;
					buffer[o++] = 48 + t;
					buffer[o++] = 48 + (r - t * 10);
				}

				px = cx;
				py = cy;
				continue;
			}

			// From here on, relative segments. Prefer the shortest encoding:
			let dx = (cx - px) | 0;
			let dy = (cy - py) | 0;

			// skip exact no-op segments
			if ((dx | dy) === 0) {
				px = cx;
				py = cy;
				continue;
			}

			// horizontal only
			if (dy === 0) {
				buffer[o++] = 104; // 'h'
				let n = dx;
				if (n < 0) {
					buffer[o++] = 45;
					n = -n;
				}
				let s = (n * 100 + 0.5) | 0;
				let q = (s / 100) | 0;
				let r = s - q * 100;

				if (q < 10) {
					buffer[o++] = 48 + q;
				} else if (q < 100) {
					let t = (q / 10) | 0;
					buffer[o++] = 48 + t;
					buffer[o++] = 48 + (q - t * 10);
				} else if (q < 1000) {
					let h = (q / 100) | 0;
					let rem = q - h * 100;
					let t = (rem / 10) | 0;
					buffer[o++] = 48 + h;
					buffer[o++] = 48 + t;
					buffer[o++] = 48 + (rem - t * 10);
				} else {
					let th = (q / 1000) | 0;
					let rem1 = q - th * 1000;
					let h = (rem1 / 100) | 0;
					let rem2 = rem1 - h * 100;
					let t = (rem2 / 10) | 0;
					buffer[o++] = 48 + th;
					buffer[o++] = 48 + h;
					buffer[o++] = 48 + t;
					buffer[o++] = 48 + (rem2 - t * 10);
				}
				if (r !== 0) {
					let t = (r / 10) | 0;
					buffer[o++] = 46;
					buffer[o++] = 48 + t;
					buffer[o++] = 48 + (r - t * 10);
				}

				px = cx;
				py = cy;
				continue;
			}

			// vertical only
			if (dx === 0) {
				buffer[o++] = 118; // 'v'
				let n = dy;
				if (n < 0) {
					buffer[o++] = 45;
					n = -n;
				}
				let s = (n * 100 + 0.5) | 0;
				let q = (s / 100) | 0;
				let r = s - q * 100;

				if (q < 10) {
					buffer[o++] = 48 + q;
				} else if (q < 100) {
					let t = (q / 10) | 0;
					buffer[o++] = 48 + t;
					buffer[o++] = 48 + (q - t * 10);
				} else if (q < 1000) {
					let h = (q / 100) | 0;
					let rem = q - h * 100;
					let t = (rem / 10) | 0;
					buffer[o++] = 48 + h;
					buffer[o++] = 48 + t;
					buffer[o++] = 48 + (rem - t * 10);
				} else {
					let th = (q / 1000) | 0;
					let rem1 = q - th * 1000;
					let h = (rem1 / 100) | 0;
					let rem2 = rem1 - h * 100;
					let t = (rem2 / 10) | 0;
					buffer[o++] = 48 + th;
					buffer[o++] = 48 + h;
					buffer[o++] = 48 + t;
					buffer[o++] = 48 + (rem2 - t * 10);
				}
				if (r !== 0) {
					buffer[o++] = 46;
					let t = (r / 10) | 0;
					buffer[o++] = 48 + t;
					buffer[o++] = 48 + (r - t * 10);
				}

				px = cx;
				py = cy;
				continue;
			}

			// general relative line: 'l dx dy'
			buffer[o++] = 108; // 'l'

			// --- write dx ---
			{
				let n = dx;
				if (n < 0) {
					buffer[o++] = 45;
					n = -n;
				}
				let s = (n * 100 + 0.5) | 0;
				let q = (s / 100) | 0;
				let r = s - q * 100;

				if (q < 10) {
					buffer[o++] = 48 + q;
				} else if (q < 100) {
					let t = (q / 10) | 0;
					buffer[o++] = 48 + t;
					buffer[o++] = 48 + (q - t * 10);
				} else if (q < 1000) {
					let h = (q / 100) | 0;
					let rem = q - h * 100;
					let t = (rem / 10) | 0;
					buffer[o++] = 48 + h;
					buffer[o++] = 48 + t;
					buffer[o++] = 48 + (rem - t * 10);
				} else {
					let th = (q / 1000) | 0;
					let rem1 = q - th * 1000;
					let h = (rem1 / 100) | 0;
					let rem2 = rem1 - h * 100;
					let t = (rem2 / 10) | 0;
					buffer[o++] = 48 + th;
					buffer[o++] = 48 + h;
					buffer[o++] = 48 + t;
					buffer[o++] = 48 + (rem2 - t * 10);
				}
				if (r !== 0) {
					buffer[o++] = 46;
					let t = (r / 10) | 0;
					buffer[o++] = 48 + t;
					buffer[o++] = 48 + (r - t * 10);
				}
				buffer[o++] = 32; // ' '
			}
			let n = dy;
			if (n < 0) {
				buffer[o++] = 45;
				n = -n;
			}
			let s = (n * 100 + 0.5) | 0;
			let q = (s / 100) | 0;
			let r = s - q * 100;

			if (q < 10) {
				buffer[o++] = 48 + q;
			} else if (q < 100) {
				let t = (q / 10) | 0;
				buffer[o++] = 48 + t;
				buffer[o++] = 48 + (q - t * 10);
			} else if (q < 1000) {
				let h = (q / 100) | 0;
				let rem = q - h * 100;
				let t = (rem / 10) | 0;
				buffer[o++] = 48 + h;
				buffer[o++] = 48 + t;
				buffer[o++] = 48 + (rem - t * 10);
			} else {
				let th = (q / 1000) | 0;
				let rem1 = q - th * 1000;
				let h = (rem1 / 100) | 0;
				let rem2 = rem1 - h * 100;
				let t = (rem2 / 10) | 0;
				buffer[o++] = 48 + th;
				buffer[o++] = 48 + h;
				buffer[o++] = 48 + t;
				buffer[o++] = 48 + (rem2 - t * 10);
			}
			if (r !== 0) {
				buffer[o++] = 46;
				let t = (r / 10) | 0;
				buffer[o++] = 48 + t;
				buffer[o++] = 48 + (r - t * 10);
			}

			px = cx;
			py = cy;
		}
		return decoder.decode(buffer.subarray(0, o));
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

export const linear2 = (xys: Float32Array) => {
	const pairs = (xys.length >> 1) | 0;
	if (pairs === 0) return "";

	let o = 0;

	// --- first absolute move 'M x y' ---
	let px = xys[0] | 0;
	let py = xys[1] | 0;

	buffer[o++] = 77; // 'M'

	// write X (px), integer fast-path (0..9999, but handles negatives)
	{
		let n = px;
		if (n < 0) {
			buffer[o++] = 45; // '-'
			n = -n;
		}
		// s/q/r kept to match original structure; r will be 0 for ints, so no decimals output
		let s = (n * 100 + 0.5) | 0;
		let q = (s / 100) | 0;
		let r = s - q * 100;

		if (q < 10) {
			buffer[o++] = 48 + q;
		} else if (q < 100) {
			let t = (q / 10) | 0;
			buffer[o++] = 48 + t;
			buffer[o++] = 48 + (q - t * 10);
		} else if (q < 1000) {
			let h = (q / 100) | 0;
			let rem = q - h * 100;
			let t = (rem / 10) | 0;
			buffer[o++] = 48 + h;
			buffer[o++] = 48 + t;
			buffer[o++] = 48 + (rem - t * 10);
		} else {
			let th = (q / 1000) | 0;
			let rem1 = q - th * 1000;
			let h = (rem1 / 100) | 0;
			let rem2 = rem1 - h * 100;
			let t = (rem2 / 10) | 0;
			buffer[o++] = 48 + th;
			buffer[o++] = 48 + h;
			buffer[o++] = 48 + t;
			buffer[o++] = 48 + (rem2 - t * 10);
		}
		if (r !== 0) {
			buffer[o++] = 46; // '.'
			let t = (r / 10) | 0;
			buffer[o++] = 48 + t;
			buffer[o++] = 48 + (r - t * 10);
		}
		buffer[o++] = 32; // ' '
	}

	// write Y (py)
	{
		let n = py;
		if (n < 0) {
			buffer[o++] = 45;
			n = -n;
		}
		let s = (n * 100 + 0.5) | 0;
		let q = (s / 100) | 0;
		let r = s - q * 100;

		if (q < 10) {
			buffer[o++] = 48 + q;
		} else if (q < 100) {
			let t = (q / 10) | 0;
			buffer[o++] = 48 + t;
			buffer[o++] = 48 + (q - t * 10);
		} else if (q < 1000) {
			let h = (q / 100) | 0;
			let rem = q - h * 100;
			let t = (rem / 10) | 0;
			buffer[o++] = 48 + h;
			buffer[o++] = 48 + t;
			buffer[o++] = 48 + (rem - t * 10);
		} else {
			let th = (q / 1000) | 0;
			let rem1 = q - th * 1000;
			let h = (rem1 / 100) | 0;
			let rem2 = rem1 - h * 100;
			let t = (rem2 / 10) | 0;
			buffer[o++] = 48 + th;
			buffer[o++] = 48 + h;
			buffer[o++] = 48 + t;
			buffer[o++] = 48 + (rem2 - t * 10);
		}
		if (r !== 0) {
			buffer[o++] = 46;
			let t = (r / 10) | 0;
			buffer[o++] = 48 + t;
			buffer[o++] = 48 + (r - t * 10);
		}
	}

	// --- subsequent points: relative 'h' / 'v' / 'l' ---
	for (let i = 1; i < pairs; i++) {
		const idx = i << 1;
		const cx = xys[idx] | 0;
		const cy = xys[idx + 1] | 0;

		let dx = (cx - px) | 0;
		let dy = (cy - py) | 0;

		if ((dx | dy) === 0) {
			px = cx;
			py = cy;
			continue;
		}

		// horizontal-only
		if (dy === 0) {
			buffer[o++] = 104; // 'h'
			let n = dx;
			if (n < 0) {
				buffer[o++] = 45;
				n = -n;
			}
			let s = (n * 100 + 0.5) | 0;
			let q = (s / 100) | 0;
			let r = s - q * 100;

			if (q < 10) {
				buffer[o++] = 48 + q;
			} else if (q < 100) {
				let t = (q / 10) | 0;
				buffer[o++] = 48 + t;
				buffer[o++] = 48 + (q - t * 10);
			} else if (q < 1000) {
				let h = (q / 100) | 0;
				let rem = q - h * 100;
				let t = (rem / 10) | 0;
				buffer[o++] = 48 + h;
				buffer[o++] = 48 + t;
				buffer[o++] = 48 + (rem - t * 10);
			} else {
				let th = (q / 1000) | 0;
				let rem1 = q - th * 1000;
				let h = (rem1 / 100) | 0;
				let rem2 = rem1 - h * 100;
				let t = (rem2 / 10) | 0;
				buffer[o++] = 48 + th;
				buffer[o++] = 48 + h;
				buffer[o++] = 48 + t;
				buffer[o++] = 48 + (rem2 - t * 10);
			}
			if (r !== 0) {
				let t = (r / 10) | 0;
				buffer[o++] = 46;
				buffer[o++] = 48 + t;
				buffer[o++] = 48 + (r - t * 10);
			}

			px = cx;
			py = cy;
			continue;
		}

		// vertical-only
		if (dx === 0) {
			buffer[o++] = 118; // 'v'
			let n = dy;
			if (n < 0) {
				buffer[o++] = 45;
				n = -n;
			}
			let s = (n * 100 + 0.5) | 0;
			let q = (s / 100) | 0;
			let r = s - q * 100;

			if (q < 10) {
				buffer[o++] = 48 + q;
			} else if (q < 100) {
				let t = (q / 10) | 0;
				buffer[o++] = 48 + t;
				buffer[o++] = 48 + (q - t * 10);
			} else if (q < 1000) {
				let h = (q / 100) | 0;
				let rem = q - h * 100;
				let t = (rem / 10) | 0;
				buffer[o++] = 48 + h;
				buffer[o++] = 48 + t;
				buffer[o++] = 48 + (rem - t * 10);
			} else {
				let th = (q / 1000) | 0;
				let rem1 = q - th * 1000;
				let h = (rem1 / 100) | 0;
				let rem2 = rem1 - h * 100;
				let t = (rem2 / 10) | 0;
				buffer[o++] = 48 + th;
				buffer[o++] = 48 + h;
				buffer[o++] = 48 + t;
				buffer[o++] = 48 + (rem2 - t * 10);
			}
			if (r !== 0) {
				buffer[o++] = 46;
				let t = (r / 10) | 0;
				buffer[o++] = 48 + t;
				buffer[o++] = 48 + (r - t * 10);
			}

			px = cx;
			py = cy;
			continue;
		}

		// general relative line: 'l dx dy'
		buffer[o++] = 108; // 'l'

		// dx
		{
			let n = dx;
			if (n < 0) {
				buffer[o++] = 45;
				n = -n;
			}
			let s = (n * 100 + 0.5) | 0;
			let q = (s / 100) | 0;
			let r = s - q * 100;

			if (q < 10) {
				buffer[o++] = 48 + q;
			} else if (q < 100) {
				let t = (q / 10) | 0;
				buffer[o++] = 48 + t;
				buffer[o++] = 48 + (q - t * 10);
			} else if (q < 1000) {
				let h = (q / 100) | 0;
				let rem = q - h * 100;
				let t = (rem / 10) | 0;
				buffer[o++] = 48 + h;
				buffer[o++] = 48 + t;
				buffer[o++] = 48 + (rem - t * 10);
			} else {
				let th = (q / 1000) | 0;
				let rem1 = q - th * 1000;
				let h = (rem1 / 100) | 0;
				let rem2 = rem1 - h * 100;
				let t = (rem2 / 10) | 0;
				buffer[o++] = 48 + th;
				buffer[o++] = 48 + h;
				buffer[o++] = 48 + t;
				buffer[o++] = 48 + (rem2 - t * 10);
			}
			if (r !== 0) {
				buffer[o++] = 46;
				let t = (r / 10) | 0;
				buffer[o++] = 48 + t;
				buffer[o++] = 48 + (r - t * 10);
			}
			buffer[o++] = 32; // ' '
		}

		// dy
		{
			let n = dy;
			if (n < 0) {
				buffer[o++] = 45;
				n = -n;
			}
			let s = (n * 100 + 0.5) | 0;
			let q = (s / 100) | 0;
			let r = s - q * 100;

			if (q < 10) {
				buffer[o++] = 48 + q;
			} else if (q < 100) {
				let t = (q / 10) | 0;
				buffer[o++] = 48 + t;
				buffer[o++] = 48 + (q - t * 10);
			} else if (q < 1000) {
				let h = (q / 100) | 0;
				let rem = q - h * 100;
				let t = (rem / 10) | 0;
				buffer[o++] = 48 + h;
				buffer[o++] = 48 + t;
				buffer[o++] = 48 + (rem - t * 10);
			} else {
				let th = (q / 1000) | 0;
				let rem1 = q - th * 1000;
				let h = (rem1 / 100) | 0;
				let rem2 = rem1 - h * 100;
				let t = (rem2 / 10) | 0;
				buffer[o++] = 48 + th;
				buffer[o++] = 48 + h;
				buffer[o++] = 48 + t;
				buffer[o++] = 48 + (rem2 - t * 10);
			}
			if (r !== 0) {
				buffer[o++] = 46;
				let t = (r / 10) | 0;
				buffer[o++] = 48 + t;
				buffer[o++] = 48 + (r - t * 10);
			}
		}

		px = cx;
		py = cy;
	}

	return decoder.decode(buffer.subarray(0, o));
};
