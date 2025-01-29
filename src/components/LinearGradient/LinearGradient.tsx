type Props = {
	id: string;
	gradient: string;
};

export const LinearGradient = ({ id, gradient }: Props) => {
	const parseDirection = (direction: string) => {
		if (direction.includes("to ")) {
			switch (direction.replace("to ", "").trim()) {
				case "top":
					return { x1: 0, y1: 1, x2: 0, y2: 0 };
				case "right":
					return { x1: 0, y1: 0, x2: 1, y2: 0 };
				case "bottom":
					return { x1: 0, y1: 0, x2: 0, y2: 1 };
				case "left":
					return { x1: 1, y1: 0, x2: 0, y2: 0 };
				case "top left":
					return { x1: 1, y1: 1, x2: 0, y2: 0 };
				case "top right":
					return { x1: 0, y1: 1, x2: 1, y2: 0 };
				case "bottom left":
					return { x1: 1, y1: 0, x2: 0, y2: 1 };
				case "bottom right":
					return { x1: 0, y1: 0, x2: 1, y2: 1 };
			}
		} else if (direction.match(/\d+deg/)) {
			const angle = parseFloat(direction) * (Math.PI / 180);
			return {
				x1: 0.5 - 0.5 * Math.cos(angle),
				y1: 0.5 - 0.5 * Math.sin(angle),
				x2: 0.5 + 0.5 * Math.cos(angle),
				y2: 0.5 + 0.5 * Math.sin(angle),
			};
		}
		return { x1: 0, y1: 0, x2: 0, y2: 1 }; // Default to "to bottom"
	};

	const parseStops = (stops: string[]) =>
		stops.map((stop, i, arr) => {
			const [color, offset] = stop.trim().split(/\s+(?![^()]*\))/);
			return {
				color,
				offset: offset || (i === 0 ? "0%" : i === arr.length - 1 ? "100%" : undefined),
			};
		});

	const { x1, y1, x2, y2, stops } = (() => {
		const match = gradient.match(/linear-gradient\(([^)]+)\)/);
		if (!match) throw new Error("Invalid gradient string");
		const parts = match[1].split(/,(?![^()]*\))/).map((p) => p.trim());
		const direction = parts[0].match(/^(to|\d+deg|\d+rad|\d+turn)/) ? parts.shift()! : "to bottom";
		return { ...parseDirection(direction), stops: parseStops(parts) };
	})();

	return (
		<linearGradient id={id} x1={x1} y1={y1} x2={x2} y2={y2}>
			{stops.map(({ color, offset }, i) => (
				<stop key={i} stopColor={color} offset={offset} />
			))}
		</linearGradient>
	);
};
