export const PathUtils = {
	polarToCartesian: (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
		const angleRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
		return {
			x: centerX + radius * Math.cos(angleRadians),
			y: centerY + radius * Math.sin(angleRadians),
		};
	},
	describeArc: (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
		if (endAngle - startAngle >= 360) return PathUtils.circleArc(x, y, radius);
		const start = PathUtils.polarToCartesian(x, y, radius, endAngle);
		const end = PathUtils.polarToCartesian(x, y, radius, startAngle);

		const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
		return ["M", start.x, start.y, "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(" ");
	},
	circleArc: (cx: number, cy: number, r: number) => {
		const theta = (360 * Math.PI) / 180;
		const dx = r * Math.cos(theta);
		const dy = -r * Math.sin(theta);
		return `M ${cx} ${cy} m ${dx}, ${dy} a ${r}, ${r} 0 1,0 ${-2 * dx}, ${-2 * dy} a ${r}, ${r} 0 1,0 ${2 * dx}, ${2 * dy}`;
	},
	parse: (pathString: string) => {
		/* ChatGPT generated parses a path string that may contain relative values and converts it to absolute values */
		const commands: Array<{ type: string; coords: number[] }> = [];
		const regex = /([a-zA-Z])|([-+]?\d*\.?\d+)/g; // Match commands or numbers
		let match;
		let currentCommand = null;

		while ((match = regex.exec(pathString)) !== null) {
			const token = match[0];

			if (isNaN(Number(token))) {
				// It's a command
				currentCommand = token;
				commands.push({ type: currentCommand, coords: [] });
			} else {
				// It's a number, add it to the last command
				const value = parseFloat(token);
				if (currentCommand) {
					const lastCommand = commands[commands.length - 1];
					lastCommand.coords.push(value);
				}
			}
		}

		// Expand continuation numbers for commands like `m` or `l`
		const expandedCommands = [];
		let lastCommand = null;
		let lastCoords = [0, 0]; // Track the last absolute position
		for (const command of commands) {
			const { type, coords } = command;

			if (type.toLowerCase() === "m" || type.toLowerCase() === "l") {
				// MoveTo or LineTo commands need pairs of coordinates
				let i = 0;
				while (i < coords.length) {
					const x = coords[i];
					const y = coords[i + 1] ?? 0; // Ensure pairs

					if (type === "m" || type === "l") {
						// Relative
						lastCoords = [lastCoords[0] + x, lastCoords[1] + y];
					} else {
						// Absolute
						lastCoords = [x, y];
					}

					expandedCommands.push({ type: type.toLowerCase() === "m" && i === 0 ? "M" : "L", coords: [...lastCoords] });
					i += 2;
				}

				// Convert subsequent `m` to `l` (relative move-to becomes relative line-to)
				if (type === "m") {
					command.type = "l";
				}
			} else if (type === "h") {
				// Horizontal line
				for (const x of coords) {
					lastCoords[0] += x; // Update x position
					expandedCommands.push({ type: "L", coords: [...lastCoords] });
				}
			} else if (type === "v") {
				// Vertical line
				for (const y of coords) {
					lastCoords[1] += y; // Update y position
					expandedCommands.push({ type: "L", coords: [...lastCoords] });
				}
			} else if (type === "z" || type === "Z") {
				// Close path
				expandedCommands.push({ type: "Z", coords: [] });
			}

			lastCommand = command;
		}

		return expandedCommands;
	},
	center: (path: string) => {
		const parsed = PathUtils.parse(path);
		const centerX = parsed.reduce((acc, { coords }) => acc + (coords?.[0] ?? 0), 0) / parsed.length;
		const centerY = parsed.reduce((acc, { coords }) => acc + (coords[1] ?? 0), 0) / parsed.length;
		return { x: centerX, y: centerY };
	},
};
