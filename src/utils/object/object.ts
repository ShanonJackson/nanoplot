export const ObjectUtils = {
	groupBy: <K extends PropertyKey, T>(iterable: Iterable<T>, cb: (item: T, index: number) => K): Partial<Record<K, T[]>> => {
		const obj = Object.create(null);
		let i = 0;
		for (const value of iterable) {
			const key = cb(value, i++);
			key in obj ? obj[key].push(value) : (obj[key] = [value]);
		}
		return obj;
	},
};
