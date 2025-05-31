type StringOrFalsey = string | undefined | number | null | false | 0n;
export const cx = (...args: (StringOrFalsey | Record<string, StringOrFalsey | boolean>)[]) => {
	return args
		.map((str) => {
			if (!str || typeof str === "string") return str;
			return Object.entries(str).map(([k, v]) => (v ? k : ""));
		})
		.flat()
		.filter(Boolean)
		.join(" ");
};

const unique: Record<string, string> = {
	absolute: "position",
	relative: "position",
	static: "position",
	block: "display",
	hidden: "display",
};
const getReplaceKnown = (cls: string): string =>
	cls
		.split(":")
		.map((token) => unique[token] ?? token)
		.join(":");
export const toUniqueIdentifier = (c: string): string => {
	const m = c.match(/[^\[\]:]+|\[[^\]]+]/g)!;
	const l = m.pop()!;
	return getReplaceKnown([...m, l[0] === "[" ? l.slice(1).split(":")[0] : l.split("-")[0]].join(":"));
};

export const tw = (...args: (StringOrFalsey | Record<string, StringOrFalsey | boolean>)[]) => {
	const result: Record<string, string> = {};
	cx(...args)
		.replace(/\s+/g, " ")
		.split(" ")
		.forEach((cls) => (result[toUniqueIdentifier(cls)] = cls));
	return Object.values(result).join(" ");
};
