export const PathUtils = {
	trend: (data: Array<{ x: number; y: number }>, viewbox: { x: number; y: number }) => {
		const n = data.length;
		const meanX = data.reduce((sum, point) => sum + point.x, 0) / n;
		const meanY = data.reduce((sum, point) => sum + point.y, 0) / n;

		// Calculate the slope (m) and y-intercept (b)
		const { numerator, denominator } = data.reduce(
			(acc, point) => {
				acc.numerator += (point.x - meanX) * (point.y - meanY);
				acc.denominator += (point.x - meanX) ** 2;
				return acc;
			},
			{ numerator: 0, denominator: 0 },
		);
		const m = numerator / denominator;
		const b = meanY - m * meanX;

		// Define the start and end points of the trendline
		const xValues = data.map((point) => point.x);
		const minX = Math.min(...xValues);
		const maxX = Math.max(...xValues);
		const startY = m * minX + b;
		const endY = m * maxX + b;

		// Map the data coordinates to the SVG coordinate system
		const xRange = maxX - minX;
		const yRange = Math.max(...data.map((point) => point.y)) - Math.min(...data.map((point) => point.y));
		const scaleX = viewbox.x / xRange;
		const scaleY = viewbox.y / yRange;

		// Convert coordinates to SVG space (flip the Y axis)
		const svgStartX = (minX - minX) * scaleX;
		const svgStartY = viewbox.y - (startY - Math.min(...data.map((point) => point.y))) * scaleY;
		const svgEndX = (maxX - minX) * scaleX;
		const svgEndY = viewbox.y - (endY - Math.min(...data.map((point) => point.y))) * scaleY;
		return `M ${svgStartX} ${viewbox.y - svgStartY} L ${svgEndX} ${viewbox.y - svgEndY}`;
	},
	annularArc: (x: number, y: number, startAngle: number, endAngle: number, innerRadius: number, outerRadius: number) => {
		if (endAngle - startAngle >= 360) {
			return `M ${x - outerRadius} ${y} A ${outerRadius} ${outerRadius} 0 1 1 ${
				x + outerRadius
			} ${y} A ${outerRadius} ${outerRadius} 1 1 1 ${x - outerRadius} ${y} M ${
				x - innerRadius
			} ${y} A ${innerRadius} ${innerRadius} 0 1 1 ${x + innerRadius} ${y} A ${innerRadius} ${innerRadius} 1 1 1 ${
				x - innerRadius
			} ${y} Z`;
		}
		const [START, end] = [startAngle % 360, endAngle % 360];
		const END = START > end ? end + 360 : end;
		const point = (x: number, y: number, r: number, angle: number) => [
			(x + Math.sin(angle) * r).toFixed(2),
			(y - Math.cos(angle) * r).toFixed(2),
		];
		const [s, e] = [(START / 360) * 2 * Math.PI, (END / 360) * 2 * Math.PI];
		const P = [point(x, y, innerRadius, s), point(x, y, outerRadius, s), point(x, y, outerRadius, e), point(x, y, innerRadius, e)];
		const flag = e - s > Math.PI ? "1" : "0";
		return `M ${P[0][0]} ${P[0][1]} L ${P[1][0]} ${P[1][1]} A ${outerRadius} ${outerRadius} 0 ${flag} 1 ${P[2][0]} ${P[2][1]} L ${P[3][0]} ${P[3][1]} A ${innerRadius} ${innerRadius}  0 ${flag} 0 ${P[0][0]} ${P[0][1]} Z`;
	},
	polarToCartesian: (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
		const angleRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
		return {
			x: Number((centerX + radius * Math.cos(angleRadians)).toFixed(5)),
			y: Number((centerY + radius * Math.sin(angleRadians)).toFixed(5)),
		};
	},
	describeArc: (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
		if (endAngle - startAngle >= 360) return PathUtils.circleArc(x, y, radius);
		const start = PathUtils.polarToCartesian(x, y, radius, endAngle);
		const end = PathUtils.polarToCartesian(x, y, radius, startAngle);

		const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
		// more than 5.dp can give hydration error between server/client because floating point decimals past like 10 seem to be different in node/bun
		return ["M", start.x.toFixed(5), start.y.toFixed(5), "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(" ");
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
	borderRadius: (xy1: { x: number; y: number }, xy2: { x: number; y: number }, radius: number, horizontal = false) => {
		const middle = horizontal ? xy2.y - xy1.y : xy2.x - xy1.x;
		if (horizontal) {
			return `M ${xy1.x} ${xy1.y} H ${xy2.x - radius} Q ${xy2.x} ${xy1.y} ${xy2.x} ${xy1.y + (radius > middle / 2 ? middle / 2 : radius)} L ${xy2.x} ${xy2.y - (radius > middle / 2 ? middle / 2 : radius)} Q ${xy2.x} ${xy2.y} ${xy2.x - radius} ${xy2.y} H ${xy1.x}`;
		}
		return `M ${xy1.x} ${xy1.y} V ${xy2.y + radius + radius} Q ${xy1.x} ${xy2.y} ${xy1.x + (radius > middle / 2 ? middle / 2 : radius)} ${xy2.y} L ${xy2.x - (radius > middle / 2 ? middle / 2 : radius)} ${xy2.y} Q ${xy2.x} ${xy2.y} ${xy2.x} ${xy2.y + radius + radius} L ${xy2.x} ${xy1.y} Z`;
	},
};
