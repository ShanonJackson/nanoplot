declare module "*.wasm" {
        const wasmModule:
                | Record<string, unknown>
                | WebAssembly.Module
                | WebAssembly.Instance
                | ArrayBuffer
                | Promise<Record<string, unknown> | WebAssembly.Module | WebAssembly.Instance | ArrayBuffer>;
        export default wasmModule;
}
