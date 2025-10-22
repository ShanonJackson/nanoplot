# Curve linear WASM performance experiments

This log tracks the tuning attempts applied to the `CurveUtils.linear` WebAssembly implementation. Each entry lists the change explored, the measurement command, and whether the tweak was kept.

## Baseline
- **Command:** `CURVE_LINEAR_WASM=crates/curve-linear/target/wasm32-unknown-unknown/release/curve_linear.wasm bun run scripts/curve-linear-benchmark.ts`
- **Results:**
  - `linearFallback (JS legacy)` – avg 0.854 ms, median 0.566 ms, min 0.508 ms, max 5.082 ms
  - `linearJS (JS optimized)` – avg 0.831 ms, median 0.622 ms, min 0.551 ms, max 5.782 ms
  - `CurveUtils.linear (WASM)` – avg 0.611 ms, median 0.439 ms, min 0.400 ms, max 3.541 ms
- **Observation:** WASM currently ~26 % faster than the optimized JS helper but still short of the 2× goal.

## Experiments

### Experiment 1 – Replace integer divisions with reciprocal multiplication
- **Change:** Updated the Rust formatter to use precomputed reciprocal constants for `/ 100` and `/ 1000`, eliminating integer division instructions in `write_small_uint` and `write_scaled`.
- **Command:** `CURVE_LINEAR_WASM=crates/curve-linear/target/wasm32-unknown-unknown/release/curve_linear.wasm bun run scripts/curve-linear-benchmark.ts`
- **Results:**
  - `linearFallback (JS legacy)` – avg 0.845 ms, median 0.593 ms, min 0.521 ms, max 7.537 ms
  - `linearJS (JS optimized)` – avg 0.824 ms, median 0.664 ms, min 0.589 ms, max 4.533 ms
  - `CurveUtils.linear (WASM)` – avg 0.567 ms, median 0.421 ms, min 0.378 ms, max 4.751 ms
- **Outcome:** Improvement (~7% faster than baseline), so the change is kept.

