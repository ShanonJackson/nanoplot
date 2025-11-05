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
	linear: (xys: Float32Array): string => {
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
	},
	natural: (xys: Float32Array) => {
		const pairs = xys.length >> 1;
		if (pairs === 0) return "";
		if (pairs <= 2) {
			let p = `M ${xys[0]} ${xys[1]}`;
			if (pairs === 2) p += ` L ${xys[2]} ${xys[3]}`;
			return p;
		}
		const xs = new Array<number>(pairs);
		const ys = new Array<number>(pairs);
		for (let i = 0, j = 0; i < pairs; i++, j += 2) {
			xs[i] = xys[j];
			ys[i] = xys[j + 1];
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
			for (let i = n - 2; i >= 0; --i) c1[i] = (r[i] - c1[i + 1]) / b[i];
			c2[n - 1] = (arr[n] + c1[n - 1]) / 2;
			for (let i = 0; i < n - 1; ++i) c2[i] = 2 * arr[i + 1] - c1[i + 1];
			return [c1, c2];
		}

		const [px1, px2] = controlPoints(xs);
		const [py1, py2] = controlPoints(ys);
		let path = `M ${xs[0]} ${ys[0]}`;
		for (let i = 0; i < pairs - 1; i++) {
			path += ` C ${px1[i]} ${py1[i]}, ${px2[i]} ${py2[i]}, ${xs[i + 1]} ${ys[i + 1]}`;
		}
		return path;
	},
	monotoneX: (xys: Float32Array) => {
		const pairs = xys.length >> 1;
		if (pairs === 0) return "";
		if (pairs === 1) return `M ${xys[0]} ${xys[1]}`;
		const xs = new Array<number>(pairs);
		const ys = new Array<number>(pairs);
		for (let i = 0, j = 0; i < pairs; i++, j += 2) {
			xs[i] = xys[j];
			ys[i] = xys[j + 1];
		}
		const tangents = new Array<number>(pairs);
		for (let i = 0; i < pairs; i++) {
			if (i === 0) tangents[i] = (ys[1] - ys[0]) / (xs[1] - xs[0]);
			else if (i === pairs - 1) tangents[i] = (ys[i] - ys[i - 1]) / (xs[i] - xs[i - 1]);
			else tangents[i] = (ys[i + 1] - ys[i - 1]) / (xs[i + 1] - xs[i - 1]);
		}
		let path = `M ${xs[0]} ${ys[0]}`;
		for (let i = 0; i < pairs - 1; i++) {
			const dx = xs[i + 1] - xs[i];
			const cx1 = xs[i] + dx / 3;
			const cy1 = ys[i] + (tangents[i] * dx) / 3;
			const cx2 = xs[i + 1] - dx / 3;
			const cy2 = ys[i + 1] - (tangents[i + 1] * dx) / 3;
			path += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${xs[i + 1]} ${ys[i + 1]}`;
		}
		return path;
	},
	stepBefore: (xys: Float32Array): string => {
		const pairs = xys.length >> 1;
		if (pairs === 0) return "";
		let path = `M ${xys[0]} ${xys[1]}`;
		for (let i = 1, j = 2; i < pairs; i++, j += 2) {
			path += ` V ${xys[j + 1]} H ${xys[j]}`;
		}
		return path;
	},
	stepAfter: (xys: Float32Array): string => {
		const pairs = xys.length >> 1;
		if (pairs === 0) return "";
		let path = `M ${xys[0]} ${xys[1]}`;
		for (let i = 1, j = 2; i < pairs; i++, j += 2) {
			path += ` H ${xys[j]} V ${xys[j + 1]}`;
		}
		return path;
	},
	// Build a linear path from a subrange of an interleaved XY Float32Array without copying.
	// startPoint and endPoint are in number-of-points (not indices). endPoint is exclusive.
};

export const linearRange = (xys: Float32Array, startPoint: number, endPoint: number): string => {
	const start = startPoint | 0;
	const end = endPoint | 0;
	const pairs = (end - start) | 0;
	if (pairs <= 0) return "";

	let o = 0;
	let base = start << 1;
	let px = xys[base] | 0;
	let py = xys[base + 1] | 0;

	buffer[o++] = 77; // 'M'
	// write X (px)
	{
		let n = px; if (n < 0) { buffer[o++] = 45; n = -n; }
		let s = (n * 100 + 0.5) | 0; let q = (s / 100) | 0; let r = s - q * 100;
		if (q < 10) { buffer[o++] = 48 + q; }
		else if (q < 100) { let t = (q / 10) | 0; buffer[o++] = 48 + t; buffer[o++] = 48 + (q - t * 10); }
		else if (q < 1000) { let h = (q / 100) | 0; let rem = q - h * 100; let t = (rem / 10) | 0; buffer[o++] = 48 + h; buffer[o++] = 48 + t; buffer[o++] = 48 + (rem - t * 10); }
		else { let th = (q / 1000) | 0; let rem1 = q - th * 1000; let h = (rem1 / 100) | 0; let rem2 = rem1 - h * 100; let t = (rem2 / 10) | 0; buffer[o++] = 48 + th; buffer[o++] = 48 + h; buffer[o++] = 48 + t; buffer[o++] = 48 + (rem2 - t * 10); }
		if (r !== 0) { buffer[o++] = 46; let t = (r / 10) | 0; buffer[o++] = 48 + t; buffer[o++] = 48 + (r - t * 10); }
		buffer[o++] = 32; // space
	}
	// write Y (py)
	{
		let n = py; if (n < 0) { buffer[o++] = 45; n = -n; }
		let s = (n * 100 + 0.5) | 0; let q = (s / 100) | 0; let r = s - q * 100;
		if (q < 10) { buffer[o++] = 48 + q; }
		else if (q < 100) { let t = (q / 10) | 0; buffer[o++] = 48 + t; buffer[o++] = 48 + (q - t * 10); }
		else if (q < 1000) { let h = (q / 100) | 0; let rem = q - h * 100; let t = (rem / 10) | 0; buffer[o++] = 48 + h; buffer[o++] = 48 + t; buffer[o++] = 48 + (rem - t * 10); }
		else { let th = (q / 1000) | 0; let rem1 = q - th * 1000; let h = (rem1 / 100) | 0; let rem2 = rem1 - h * 100; let t = (rem2 / 10) | 0; buffer[o++] = 48 + th; buffer[o++] = 48 + h; buffer[o++] = 48 + t; buffer[o++] = 48 + (rem2 - t * 10); }
		if (r !== 0) { buffer[o++] = 46; let t = (r / 10) | 0; buffer[o++] = 48 + t; buffer[o++] = 48 + (r - t * 10); }
	}

	for (let i = start + 1; i < end; i++) {
		const idx = i << 1;
		const cx = xys[idx] | 0;
		const cy = xys[idx + 1] | 0;
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
			if (r !== 0) { buffer[o++] = 46; let t = (r / 10) | 0; buffer[o++] = 48 + t; buffer[o++] = 48 + (r - t * 10); }
			buffer[o++] = 32;
		}
		// dy
		{
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

	return decoder.decode(buffer.subarray(0, o));
};
