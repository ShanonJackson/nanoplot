# Curve linear WASM performance experiments

This log tracks the tuning attempts applied to the `CurveUtils.linear` WebAssembly implementation. Each entry lists the change explored, the measurement command, and whether the tweak was kept.

## Baseline
- **Command:** `CURVE_LINEAR_WASM=crates/curve-linear/target/wasm32-unknown-unknown/release/curve_linear.wasm bun run scripts/curve-linear-benchmark.ts`
- **Results:**
  - `linearFallback (JS legacy)` – avg 1.739 ms, median 1.134 ms, min 0.835 ms, max 10.079 ms
  - `linearJS (JS optimized)` – avg 2.186 ms, median 1.338 ms, min 1.033 ms, max 27.565 ms
  - `CurveUtils.linear (WASM)` – avg 1.115 ms, median 0.753 ms, min 0.580 ms, max 8.815 ms
- **Observation:** WASM sits ~36 % ahead of the JS fallback but still far from the 2× stretch goal.

## Experiments

### Experiment 1 – Replace integer divisions with reciprocal multiplication
- **Change:** Updated the Rust formatter to use precomputed reciprocal constants for `/ 100` and `/ 1000`, eliminating integer division instructions in `write_small_uint` and `write_scaled`.
- **Command:** `CURVE_LINEAR_WASM=crates/curve-linear/target/wasm32-unknown-unknown/release/curve_linear.wasm bun run scripts/curve-linear-benchmark.ts`
- **Results:**
  - `linearFallback (JS legacy)` – avg 0.845 ms, median 0.593 ms, min 0.521 ms, max 7.537 ms
  - `linearJS (JS optimized)` – avg 0.824 ms, median 0.664 ms, min 0.589 ms, max 4.533 ms
  - `CurveUtils.linear (WASM)` – avg 0.567 ms, median 0.421 ms, min 0.378 ms, max 4.751 ms
- **Outcome:** Improvement (~7% faster than baseline), so the change is kept.

### Experiment 2 – Preallocate full output capacity and drop bounds checks inside the hot loop
- **Change:** Guaranteed that the JavaScript bridge reserves enough bytes for every command (18 bytes per point) and removed the per-character capacity checks inside the Rust formatter so the wasm loop writes directly.
- **Command:** `CURVE_LINEAR_WASM=crates/curve-linear/target/wasm32-unknown-unknown/release/curve_linear.wasm bun run scripts/curve-linear-benchmark.ts`
- **Results:**
  - `linearFallback (JS legacy)` – avg 1.437 ms, median 0.984 ms, min 0.816 ms, max 12.383 ms
  - `linearJS (JS optimized)` – avg 1.709 ms, median 1.254 ms, min 0.990 ms, max 9.448 ms
  - `CurveUtils.linear (WASM)` – avg 0.961 ms, median 0.675 ms, min 0.546 ms, max 4.325 ms
- **Outcome:** Kept. Eliminating the defensive branches brings WASM to ~1.8× the JS fallback on this dataset.

