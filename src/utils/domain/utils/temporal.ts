import { TemporalDate } from "../../../hooks/use-graph/use-graph";

export type TemporalKind = "Instant" | "ZonedDateTime" | "PlainDateTime" | "PlainDate";
export const UNITS = ["years", "months", "days", "hours", "minutes", "seconds"] as const;
export type DurUnit = (typeof UNITS)[number];

export const isTemporal = (v: unknown): v is TemporalDate =>
	v instanceof Temporal.Instant ||
	v instanceof Temporal.ZonedDateTime ||
	v instanceof Temporal.PlainDateTime ||
	v instanceof Temporal.PlainDate;

export const toEpochMs = (v: TemporalDate): number => {
	if ("epochMilliseconds" in v) return v.epochMilliseconds; /* Instant | ZonedDateTime */
	if (v instanceof Temporal.PlainDateTime) return v.toZonedDateTime("UTC").epochMilliseconds;
	return v.toZonedDateTime({ timeZone: "UTC", plainTime: new Temporal.PlainTime() }).epochMilliseconds;
};

export const getTemporalKind = (v: TemporalDate): TemporalKind => {
	if (v instanceof Temporal.Instant) return "Instant";
	if (v instanceof Temporal.ZonedDateTime) return "ZonedDateTime";
	if (v instanceof Temporal.PlainDateTime) return "PlainDateTime";
	return "PlainDate";
};

export const getTimeZone = (v: TemporalDate): string => (v instanceof Temporal.ZonedDateTime ? v.timeZoneId : "UTC");

/** Convert any TemporalValue to ZonedDateTime for uniform arithmetic. */
export const toZdt = (v: TemporalDate, timeZone: string): Temporal.ZonedDateTime => {
	if (v instanceof Temporal.ZonedDateTime) return v;
	if (v instanceof Temporal.Instant) return v.toZonedDateTimeISO(timeZone);
	if (v instanceof Temporal.PlainDateTime) return v.toZonedDateTime(timeZone);
	return (v as Temporal.PlainDate).toZonedDateTime({ timeZone, plainTime: new Temporal.PlainTime() });
};

/** Convert a ZonedDateTime to the target TemporalKind. */
export const toKind = (zdt: Temporal.ZonedDateTime, kind: TemporalKind): TemporalDate => {
	switch (kind) {
		case "Instant":
			return zdt.toInstant();
		case "ZonedDateTime":
			return zdt;
		case "PlainDateTime":
			return zdt.toPlainDateTime();
		case "PlainDate":
			return zdt.toPlainDate();
	}
};

/** Convert epoch milliseconds directly to the target TemporalKind. */
export const fromEpochMs = (ms: number, kind: TemporalKind, timeZone: string): TemporalDate =>
	toKind(Temporal.Instant.fromEpochMilliseconds(ms).toZonedDateTimeISO(timeZone), kind);

/** Find the largest non-zero unit in a Temporal.Duration. */
export const largestUnit = (dur: Temporal.Duration): DurUnit | undefined => UNITS.find((u) => dur[u] > 0);
