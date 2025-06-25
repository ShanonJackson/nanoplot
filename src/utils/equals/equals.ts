// deep equals including date support
export const equals = <T>(a: T, b: T): boolean => {
	if (a === b) return true; // fast path for reference equality
	if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime(); // date comparison
	if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) return false; // non-object or null check
	const keysA = Object.keys(a);
	const keysB = Object.keys(b);
	if (keysA.length !== keysB.length) return false; // different number of keys
	for (const key of keysA) {
		if (!keysB.includes(key) || !equals((a as any)[key], (b as any)[key])) return false; // recursive equality check
	}
	return true;
};
