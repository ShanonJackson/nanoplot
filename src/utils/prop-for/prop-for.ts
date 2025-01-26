export const propFor = {
	boolean: ({ value, required, prop }: { value: boolean | undefined; prop: string; required?: boolean }) => {
		if (required) return `${prop}={${value ?? false}}`;
		return value ? `${prop}={${value}}` : "";
	},
	string: ({ value, required, prop }: { value: string | undefined; prop: string; required?: boolean }) => {
		if (required) return `${prop}="${value ?? ""}"`;
		return value ? `${prop}="${value}"` : "";
	},
	number: ({ value, required, prop }: { value: number | undefined; prop: string; required?: boolean }) => {
		if (required) return `${prop}={${value ?? 0}}`;
		return value ? `${prop}={${value}}` : "";
	},
};
