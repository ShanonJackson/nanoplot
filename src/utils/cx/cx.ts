type Socket = string | number | null | false | undefined;

const uniq: Record<string, string> = {
	absolute: "position",
	relative: "position",
	static: "position",
	block: "display",
	hidden: "display",
	flex: "flex-display",
	"flex-col": "flex-direction",
	stroke: "stroke", // ✅ Needed for [stroke:red] vs stroke-gray-100
};

const splitRegex = /[^\[\]:]+|\[[^\]]+\]/g;

export function tw(...args: (Socket | Record<string, Socket | boolean>)[]): string {
	const seen: Record<string, string> = {};
	const order: string[] = [];

	function add(cls: string) {
		const parts = cls.match(splitRegex)!;
		const last = parts.pop()!;

		let base: string;

		if (last.startsWith("[")) {
			// Bracket: [stroke:red] → stroke
			const bracketProp = last.slice(1).split(":")[0];
			base = uniq[bracketProp] ?? bracketProp;
		} else {
			const prefix = last.split("-")[0];
			base = uniq[last] ?? uniq[prefix] ?? prefix;
		}

		const id = [...parts, base].join(":");

		if (!(id in seen)) order.push(id);
		seen[id] = cls;
	}

	for (const arg of args) {
		if (!arg) continue;
		if (typeof arg === "string") {
			for (const cls of arg.match(/\S+/g) || []) add(cls);
		} else {
			for (const cls in arg as any) if ((arg as any)[cls]) add(cls);
		}
	}

	return order.map((id) => seen[id]).join(" ");
}

export const cx = tw;
