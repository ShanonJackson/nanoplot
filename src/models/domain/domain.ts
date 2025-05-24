export type MinMax = "min" | "max" | "auto";
export type ISODuration = `P${string}`;
export type Expression =
	| "auto"
	| "min"
	| "max"
	| `${MinMax} - ${number}`
	| `${MinMax} - ${number}%`
	| `${MinMax} - ${ISODuration}`
	| `${MinMax} + ${number}%`
	| `${MinMax} + ${number}`
	| `${MinMax} + ${ISODuration}`
	| number;
type From = "auto" | Expression | number;
type To = "auto" | Expression | number;
type Jumps = "auto" | ISODuration | number;

export type FromToJumps = {
	from?: From;
	to?: To;
	jumps?: Jumps;
};
