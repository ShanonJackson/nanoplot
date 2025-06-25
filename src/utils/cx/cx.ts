type Socket = string | number | null | false | undefined;

const uniq: Record<string, string> = {
	absolute: "position",
	relative: "position",
	static: "position",
	block: "display",
	hidden: "display",
};
const splitRegex = /[^\[\]:]+|\[[^\]]+\]/g;
export function tw(...args: (Socket | Record<string, Socket | boolean>)[]): string {
	const seen: Record<string, string> = {};
	const order: string[] = [];
	function add(cls: string) {
		const parts = cls.match(splitRegex)!;
		const last = parts.pop()!;
		const base = last.startsWith("[") ? last.slice(1).split(":")[0] : last.split("-")[0];
		const id = [...parts, uniq[base] || base].join(":");
		if (!(id in seen)) order.push(id);
		seen[id] = cls;
	}
	for (const arg of args) {
		if (!arg) continue;
		if (typeof arg === "string") {
			for (const cls of arg.match(/\S+/g) || []) add(cls);
		} else {
			// @ts-ignore (perf related, gpt generated, don't really care about safety on this part.);
			for (const cls in arg) if (arg[cls]) add(cls);
		}
	}
	return order.map((id) => seen[id]).join(" ");
}

export const cx = tw;
