const decoder = new TextDecoder();

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
