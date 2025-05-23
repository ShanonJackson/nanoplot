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

/* deduplicates tailwind classes - localized mutation for perf, perf version */
export const tw = (...args: (StringOrFalsey | Record<string, StringOrFalsey | boolean>)[]) => {
	const result: Record<string, string> = {};
	cx(...args)
		.replace(/\s+/g, " ")
		.split(" ")
		.forEach((cls) => {
			return (result[unique[cls] || cls.split("-")[0]] = cls);
		});
	return Object.values(result).join(" ");
};
