export type interval = "days" | "months" | "years" | "hours" | "minutes" | "seconds" | "milliseconds";
export type MinMax = "min" | "max";
export type Expression =
	| "auto"
	| "min"
	| "max"
	| `${MinMax} - ${number}`
	| `${MinMax} - ${number}%`
	| `${MinMax} - ${number} ${interval}`
	| `${MinMax} + ${number}%`
	| `${MinMax} + ${number}`
	| `${MinMax} + ${number} ${interval}`
	| number;
type From = "auto" | Expression | number;
type To = "auto" | Expression | number;
type Jumps = "auto" | `every ${number} ${interval}` | number;

export type FromToJumps = {
	from?: From;
	to?: To;
	jumps?: Jumps;
};
