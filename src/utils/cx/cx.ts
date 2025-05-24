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
const dynamicPropertyRegex = /\[(.*?)\]/g;
/* regex to remove modifiers in tailwind class names i.e dark:md:stroke-red-500 with N number of modifiers, */
const modifiers = /(?:dark|light|hover|focus|active|group-hover|peer-hover|peer-focus|peer-active|first|last|odd|even|placeholder-shown):/g;

const toUniqueIdentifier = (cls: string) => {
	if (cls.match(dynamicPropertyRegex)) return cls.split(":")[0].replace("[", "").replace(modifiers, "");
	return unique[cls] || cls.split("-")[0]?.replace(modifiers, "");
};

export const tw = (...args: (StringOrFalsey | Record<string, StringOrFalsey | boolean>)[]) => {
	const result: Record<string, string> = {};
	cx(...args)
		.replace(/\s+/g, " ")
		.split(" ")
		.forEach((cls) => (result[toUniqueIdentifier(cls)] = cls));
	return Object.values(result).join(" ");
};
