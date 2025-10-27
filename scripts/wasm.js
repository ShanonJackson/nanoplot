// Build the Rust crate to WASM and inline it into src/utils/plot.wasm.js
const { readFileSync, writeFileSync } = require("node:fs");
const { execSync } = require("node:child_process");
const { resolve } = require("node:path");

const wasmOutJs = resolve("./src/utils/native/plot.wasm.ts");
const wasmBin = resolve("./target/wasm32-unknown-unknown/release/svg_path.wasm");

// 1) Build wasm (workspace crate name: svg_path)
execSync("cargo build -p svg_path --target wasm32-unknown-unknown --release", {
	stdio: "inherit",
});

// 2) Inline bytes and instantiate module synchronously, exporting the instance's exports
const bytes = readFileSync(wasmBin);
const arr = Array.from(bytes);
const js =
	`// Auto-generated from /scripts/wasm.js\n` +
	`export const plotter = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([${arr.join(",")}])), {});\n`;

writeFileSync(wasmOutJs, js);
console.log(`Wrote ${wasmOutJs} (${bytes.length} bytes inlined)`);
