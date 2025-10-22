# curve-linear

This crate exposes a minimal WebAssembly interface used by the `CurveUtils.linear` runtime in `src/utils/path/curve.ts`.

## Building

To produce a WebAssembly binary that can be loaded synchronously:

```bash
cargo build --release --target wasm32-unknown-unknown
```

The resulting module will be available at `target/wasm32-unknown-unknown/release/curve_linear.wasm`.

Feed the raw bytes from that file into `initializeCurveLinearWasmSync` at runtime to enable the Rust-backed path builder.
