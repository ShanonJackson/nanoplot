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
