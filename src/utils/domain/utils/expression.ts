import { Expression } from "../../../models/domain/domain";
import { InternalGraphContext } from "../../../hooks/use-graph/use-graph";
import { GraphUtils } from "../../graph/graph";

/*
	This purpose of this function is to take expressions like "max" and "max - 10%"
	and calculate the value of the expression.
	i.e [0,.....100] AND "max + 10%" RETURNS 110;
 */
export const expression = ({ expr, data, dimension }: { expr: Expression; data: InternalGraphContext["data"]; dimension: "x" | "y" }) => {
	if (!GraphUtils.isXYData(data)) return null;
	// const max = Math.max(...data.flatMap((line) => line.data.map((d) => d[dimension]));
	// const min = Math.min(...data.flatMap((line) => line.data.map((d) => d[dimension]));
	//
	// if (expr === "min" || expr === "auto") {
	// 	if (isDateTime) {
	// 		const jumpsInterval = typeof jumps === "string" ? DateDomain.intervalForJumps(jumps) : "days";
	// 		return from === "auto" ? new Date(min) : DateDomain.floor({ date: new Date(min), unit: 0, interval: jumpsInterval });
	// 	}
	// 	return expr === "min" ? min : DomainUtils.autoMinFor(min);
	// }
	// if (typeof expr === "number") return expr;
	// const operator = expr.match(/(\+|-)/)?.[0];
	// const isPercentage = expr.includes("%");
	// const value = +expr.replace(/[^0-9]/g, "");
	// const interval = expr.match(/(?<=\d+\s)\w+/)?.[0]; /* Time interval i.e 'months', 'years' etc. */
	// if (operator === "+") {
	// 	if (interval) {
	// 		return DateDomain.floor({ date: new Date(min), unit: value, interval });
	// 	}
	// 	return isPercentage ? min + (min * value) / 100 : min + value;
	// }
	// if (operator === "-") {
	// 	if (interval) {
	// 		return DateDomain.floor({ date: new Date(min), unit: value, interval });
	// 	}
	// 	return isPercentage ? min - (min * value) / 100 : min - value;
	// }
	// return min;
};
