// Simple Node.js benchmark replicating src/utils/path/curve.spec.ts
// Usage: node scripts/bench-curve-node.js [runs]

const { performance } = require("node:perf_hooks");
const path = require("node:path");

// Allow override of run count via CLI, default to 400 like the spec
const RUNS = Number(process.argv[2]) > 0 ? Number(process.argv[2]) : 400;

// Load the same dataset used in the spec
const data = require(path.join(__dirname, "..", "src", "utils", "path", "data.spec.json"));

// Prepare interleaved Float32Array [x0,y0,x1,y1,...]
const interleaved = new Float32Array(data.flatMap((d) => [d.x, d.y]));

const decoder = new TextDecoder("utf-8");

const MAX_POINTS = 200_000;
const buffer = new Uint8Array(MAX_POINTS * 12 + 1);
const CurveUtils = {
	linear2: (xys) => {
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
};

(async () => {
	// Import ESM build of CurveUtils from dist

	const times = [];
	for (let i = 0; i < RUNS; i++) {
		const start = performance.now();
		// Run the same hot path
		CurveUtils.linear2(interleaved);
		const end = performance.now();
		times.push(end - start);
	}

	const sum = times.reduce((a, b) => a + b, 0);
	const avg = sum / times.length;
	const min = Math.min(...times);
	const max = Math.max(...times);

	console.log("CurveUtils.linear2 benchmark (ms):");
	console.log({ runs: RUNS, min, max, average: avg });
})();
