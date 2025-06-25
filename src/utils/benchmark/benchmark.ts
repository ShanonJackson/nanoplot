// takes a function to benchmark, runs it for iterations and return the average runtime in milliseconds
export const benchmark = (fn: () => void, iterations = 1000): number => {
	let total = 0;
	for (let i = 0; i < iterations; i++) {
		const start = performance.now();
		fn();
		const end = performance.now();
		total += end - start;
	}
	return total / iterations;
};
