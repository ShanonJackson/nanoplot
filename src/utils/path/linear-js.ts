const decoder = new TextDecoder();

const digitTable = new Uint8Array(200);
for (let i = 0; i < 100; i += 1) {
        const tens = 48 + ((i / 10) | 0);
        digitTable[i * 2] = tens;
        digitTable[i * 2 + 1] = 48 + (i % 10);
}

const uintScratch = new Uint8Array(20);

export const linearJS = (coords: Array<{ x: number; y: number }>): string => {
        if (coords.length === 0) return "";
        const buffer = new Uint8Array(coords.length * 16 + 1);
        let offset = 0;
        let prevX = 0;
        let prevY = 0;

        for (let i = 0; i < coords.length; i += 1) {
                const { x, y } = coords[i];
                buffer[offset++] = i === 0 ? 77 : 108;
                let delta = x - prevX;
                if (delta < 0) {
                        buffer[offset++] = 45;
                        delta = -delta;
                }
                let scaled = (delta * 100 + 0.5) | 0;
                let integerPart = (scaled / 100) | 0;
                let remaining = integerPart >>> 0;
                let cursor = uintScratch.length;
                while (remaining >= 100) {
                        const pairIndex = (remaining % 100) * 2;
                        remaining = (remaining / 100) | 0;
                        uintScratch[--cursor] = digitTable[pairIndex + 1];
                        uintScratch[--cursor] = digitTable[pairIndex];
                }
                if (remaining < 10) {
                        uintScratch[--cursor] = 48 + remaining;
                } else {
                        const pairIndex = remaining * 2;
                        uintScratch[--cursor] = digitTable[pairIndex + 1];
                        uintScratch[--cursor] = digitTable[pairIndex];
                }
                for (let s = cursor; s < uintScratch.length; s += 1) {
                        buffer[offset++] = uintScratch[s];
                }
                let fractional = scaled - integerPart * 100;
                if (fractional !== 0) {
                        buffer[offset++] = 46;
                        const pairIndex = fractional * 2;
                        buffer[offset++] = digitTable[pairIndex];
                        buffer[offset++] = digitTable[pairIndex + 1];
                }
                buffer[offset++] = 32;

                delta = y - prevY;
                if (delta < 0) {
                        buffer[offset++] = 45;
                        delta = -delta;
                }
                scaled = (delta * 100 + 0.5) | 0;
                integerPart = (scaled / 100) | 0;
                remaining = integerPart >>> 0;
                cursor = uintScratch.length;
                while (remaining >= 100) {
                        const pairIndex = (remaining % 100) * 2;
                        remaining = (remaining / 100) | 0;
                        uintScratch[--cursor] = digitTable[pairIndex + 1];
                        uintScratch[--cursor] = digitTable[pairIndex];
                }
                if (remaining < 10) {
                        uintScratch[--cursor] = 48 + remaining;
                } else {
                        const pairIndex = remaining * 2;
                        uintScratch[--cursor] = digitTable[pairIndex + 1];
                        uintScratch[--cursor] = digitTable[pairIndex];
                }
                for (let s = cursor; s < uintScratch.length; s += 1) {
                        buffer[offset++] = uintScratch[s];
                }
                fractional = scaled - integerPart * 100;
                if (fractional !== 0) {
                        buffer[offset++] = 46;
                        const pairIndex = fractional * 2;
                        buffer[offset++] = digitTable[pairIndex];
                        buffer[offset++] = digitTable[pairIndex + 1];
                }
                prevX = x;
                prevY = y;
        }
        return decoder.decode(buffer.subarray(0, offset));
};

export const linearFallback = (coords: Array<{ x: number; y: number }>): string => {
        if (coords.length === 0) return "";
        const buffer = new Uint8Array(coords.length * 12 + 1);
        let offset = 0;
        let prevX = 0;
        let prevY = 0;

        for (let i = 0; i < coords.length; i++) {
                const { x, y } = coords[i];
                buffer[offset++] = i === 0 ? 77 : 108; // 'M' for first, 'l' for others

                const dx = x - prevX;
                const dy = y - prevY;

                // Process X coordinate
                let n = dx;
                if (n < 0) {
                        buffer[offset++] = 45; // '-'
                        n = -n;
                }
                const scaledX = (n * 100 + 0.5) | 0;
                const intX = (scaledX / 100) | 0;
                const fracX = scaledX % 100;

                // Optimize for single-digit case (0–9)
                if (intX < 10) {
                        buffer[offset++] = 48 + intX;
                } else if (intX < 100) {
                        buffer[offset++] = 48 + ((intX / 10) | 0);
                        buffer[offset++] = 48 + (intX % 10);
                } else if (intX < 1000) {
                        buffer[offset++] = 48 + ((intX / 100) | 0);
                        buffer[offset++] = 48 + (((intX % 100) / 10) | 0);
                        buffer[offset++] = 48 + (intX % 10);
                } else {
                        buffer[offset++] = 48 + ((intX / 1000) | 0);
                        buffer[offset++] = 48 + (((intX % 1000) / 100) | 0);
                        buffer[offset++] = 48 + (((intX % 100) / 10) | 0);
                        buffer[offset++] = 48 + (intX % 10);
                }
                if (fracX !== 0) {
                        buffer[offset++] = 46; // '.'
                        buffer[offset++] = 48 + ((fracX / 10) | 0);
                        buffer[offset++] = 48 + (fracX % 10);
                }
                buffer[offset++] = 32; // ' '

                // Process Y coordinate
                n = dy;
                if (n < 0) {
                        buffer[offset++] = 45; // '-'
                        n = -n;
                }
                const scaledY = (n * 100 + 0.5) | 0;
                const intY = (scaledY / 100) | 0;
                const fracY = scaledY % 100;

                // Optimize for single-digit case (0–9)
                if (intY < 10) {
                        buffer[offset++] = 48 + intY;
                } else if (intY < 100) {
                        buffer[offset++] = 48 + ((intY / 10) | 0);
                        buffer[offset++] = 48 + (intY % 10);
                } else if (intY < 1000) {
                        buffer[offset++] = 48 + ((intY / 100) | 0);
                        buffer[offset++] = 48 + (((intY % 100) / 10) | 0);
                        buffer[offset++] = 48 + (intY % 10);
                } else {
                        buffer[offset++] = 48 + ((intY / 1000) | 0);
                        buffer[offset++] = 48 + (((intY % 1000) / 100) | 0);
                        buffer[offset++] = 48 + (((intY % 100) / 10) | 0);
                        buffer[offset++] = 48 + (intY % 10);
                }

                if (fracY !== 0) {
                        buffer[offset++] = 46; // '.'
                        buffer[offset++] = 48 + ((fracY / 10) | 0);
                        buffer[offset++] = 48 + (fracY % 10);
                }
                prevX = x;
                prevY = y;
        }
        return decoder.decode(buffer.subarray(0, offset));
};
