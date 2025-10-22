const decoder = typeof TextDecoder !== "undefined" ? new TextDecoder() : null;

type Point = { x: number; y: number };

export type LinearExports = {
        memory: WebAssembly.Memory;
        alloc: (size: number) => number;
        dealloc: (ptr: number, size: number) => void;
        linear_path: (coordsPtr: number, points: number, outputPtr: number, outputCapacity: number) => number;
};

interface LinearWasmState {
        exports: LinearExports;
        memory: WebAssembly.Memory;
        memoryBuffer: ArrayBuffer;
        inputPtr: number;
        inputCapacity: number;
        outputPtr: number;
        outputCapacity: number;
        inputView: Uint32Array;
        outputView: Uint8Array;
}

let wasmState: LinearWasmState | null = null;

const createWasmState = (exports: LinearExports): LinearWasmState => ({
        exports,
        memory: exports.memory,
        memoryBuffer: exports.memory.buffer,
        inputPtr: 0,
        inputCapacity: 0,
        outputPtr: 0,
        outputCapacity: 0,
        inputView: new Uint32Array(),
        outputView: new Uint8Array(),
});

export const isLinearWasmExports = (value: unknown): value is LinearExports => {
        if (!value || typeof value !== "object") {
                return false;
        }
        const exports = value as Partial<LinearExports> & Record<string, unknown>;
        return (
                exports.memory instanceof WebAssembly.Memory &&
                typeof exports.alloc === "function" &&
                typeof exports.dealloc === "function" &&
                typeof exports.linear_path === "function"
        );
};

export const initializeLinearWasmFromExports = (exports: LinearExports): void => {
        disposeLinearWasm();
        if (decoder === null) {
                throw new Error("TextDecoder is not available; curve wasm cannot be initialized.");
        }
        wasmState = createWasmState(exports);
};

const INPUT_BYTES = Uint32Array.BYTES_PER_ELEMENT;

const toArrayBuffer = (bytes: BufferSource): ArrayBuffer => {
        if (bytes instanceof ArrayBuffer) {
                return bytes;
        }
        if (ArrayBuffer.isView(bytes)) {
                const view = bytes;
                if (view.byteOffset === 0 && view.byteLength === view.buffer.byteLength) {
                        return view.buffer;
                }
                return view.buffer.slice(view.byteOffset, view.byteOffset + view.byteLength);
        }
        throw new TypeError("Unsupported BufferSource type for WebAssembly initialization.");
};

const nextPowerOfTwo = (value: number): number => {
        let v = value <= 0 ? 1 : value - 1;
        v |= v >> 1;
        v |= v >> 2;
        v |= v >> 4;
        v |= v >> 8;
        v |= v >> 16;
        return v + 1;
};

const refreshViews = (state: LinearWasmState) => {
        const buffer = state.exports.memory.buffer;
        if (buffer !== state.memoryBuffer) {
                state.memoryBuffer = buffer;
        }
        if (state.inputPtr !== 0 && state.inputCapacity > 0) {
                state.inputView = new Uint32Array(state.memoryBuffer, state.inputPtr, state.inputCapacity / INPUT_BYTES);
        }
        if (state.outputPtr !== 0 && state.outputCapacity > 0) {
                state.outputView = new Uint8Array(state.memoryBuffer, state.outputPtr, state.outputCapacity);
        }
};

const ensureInputCapacity = (state: LinearWasmState, points: number): boolean => {
        const requiredBytes = points * 2 * INPUT_BYTES;
        if (requiredBytes <= state.inputCapacity && state.exports.memory.buffer === state.memoryBuffer) {
                return false;
        }
        if (requiredBytes <= state.inputCapacity) {
                refreshViews(state);
                return true;
        }
        if (state.inputPtr !== 0 && state.inputCapacity > 0) {
                state.exports.dealloc(state.inputPtr, state.inputCapacity);
        }
        const capacity = nextPowerOfTwo(Math.max(requiredBytes, 64));
        const ptr = state.exports.alloc(capacity);
        if (ptr === 0) {
                throw new Error("Failed to allocate input buffer for curve wasm module.");
        }
        state.inputPtr = ptr;
        state.inputCapacity = capacity;
        refreshViews(state);
        return true;
};

const ensureOutputCapacity = (state: LinearWasmState, points: number): boolean => {
        const estimate = points === 0 ? 1 : points * 16 + 32;
        if (estimate <= state.outputCapacity && state.exports.memory.buffer === state.memoryBuffer) {
                return false;
        }
        if (estimate <= state.outputCapacity) {
                refreshViews(state);
                return true;
        }
        if (state.outputPtr !== 0 && state.outputCapacity > 0) {
                state.exports.dealloc(state.outputPtr, state.outputCapacity);
        }
        const capacity = nextPowerOfTwo(Math.max(estimate, 64));
        const ptr = state.exports.alloc(capacity);
        if (ptr === 0) {
                throw new Error("Failed to allocate output buffer for curve wasm module.");
        }
        state.outputPtr = ptr;
        state.outputCapacity = capacity;
        refreshViews(state);
        return true;
};

const SIGN_MASK = 0x8000_0000;

const encodeDelta = (current: number, previous: number): number => {
        let delta = current - previous;
        const sign = delta < 0 ? SIGN_MASK : 0;
        if (sign !== 0) {
                delta = -delta;
        }
        const magnitude = Math.floor(delta * 100 + 0.5);
        return (magnitude & ~SIGN_MASK) | sign;
};

const copyCoords = (state: LinearWasmState, coords: Point[]) => {
        const view = state.inputView;
        let prevX = 0;
        let prevY = 0;
        let index = 0;
        for (let i = 0; i < coords.length; i++) {
                const point = coords[i];
                const x = point.x;
                const y = point.y;
                view[index++] = encodeDelta(x, prevX);
                view[index++] = encodeDelta(y, prevY);
                prevX = x;
                prevY = y;
        }
};

export const initializeLinearWasmSync = (bytes: BufferSource): void => {
        if (typeof WebAssembly === "undefined") {
                throw new Error("WebAssembly is not available in this environment.");
        }
        const moduleBytes = toArrayBuffer(bytes);
        const module = new WebAssembly.Module(moduleBytes);
        const instance = new WebAssembly.Instance(module, {});
        const exports = instance.exports as Record<string, unknown>;
        const memory = exports.memory;
        if (!(memory instanceof WebAssembly.Memory)) {
                throw new Error("curve wasm module does not export linear memory.");
        }
        const alloc = exports.alloc;
        const dealloc = exports.dealloc;
        const linear_path = exports.linear_path;
        if (typeof alloc !== "function" || typeof dealloc !== "function" || typeof linear_path !== "function") {
                throw new Error("curve wasm module exports are incomplete.");
        }
        initializeLinearWasmFromExports({
                memory,
                alloc: alloc as LinearExports["alloc"],
                dealloc: dealloc as LinearExports["dealloc"],
                linear_path: linear_path as LinearExports["linear_path"],
        });
};

export const disposeLinearWasm = (): void => {
        if (!wasmState) return;
        const { exports, inputPtr, inputCapacity, outputPtr, outputCapacity } = wasmState;
        if (inputPtr !== 0 && inputCapacity > 0) {
                exports.dealloc(inputPtr, inputCapacity);
        }
        if (outputPtr !== 0 && outputCapacity > 0) {
                exports.dealloc(outputPtr, outputCapacity);
        }
        wasmState = null;
};

export const isLinearWasmReady = (): boolean => wasmState !== null && decoder !== null;

export const applyLinearWasmExports = (maybeExports: unknown): boolean => {
        if (!isLinearWasmExports(maybeExports)) {
                return false;
        }
        initializeLinearWasmFromExports(maybeExports);
        return true;
};

export const linearWasm = (coords: Point[]): string | null => {
        const state = wasmState;
        if (!state) return null;
        if (decoder === null) return null;
        if (coords.length === 0) return "";

        const reallocInput = ensureInputCapacity(state, coords.length);
        const reallocOutput = ensureOutputCapacity(state, coords.length);
        if (reallocInput || reallocOutput) {
                // Views may have been recreated; ensure they point to current memory.
                refreshViews(state);
        }
        copyCoords(state, coords);

        let written = state.exports.linear_path(state.inputPtr, coords.length, state.outputPtr, state.outputCapacity);
        let attempts = 0;
        while (written === 0 && attempts < 4) {
                ensureOutputCapacity(state, coords.length * 2);
                refreshViews(state);
                written = state.exports.linear_path(state.inputPtr, coords.length, state.outputPtr, state.outputCapacity);
                attempts++;
        }
        if (written === 0) {
                return null;
        }
        return decoder.decode(state.outputView.subarray(0, written));
};
