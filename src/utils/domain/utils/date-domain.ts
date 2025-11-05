export const parseDuration = (iso: string) => {
	const m = iso.match(/^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/);
	if (!m) throw new Error(`Invalid ISO duration: ${iso}`);
	return {
		years: Number(m[1] || 0),
		months: Number(m[2] || 0),
		days: Number(m[3] || 0),
		hours: Number(m[4] || 0),
		minutes: Number(m[5] || 0),
		seconds: Number(m[6] || 0),
	};
};

export const getFloorDateFromDuration = (d: Date, duration: string) => {
	const Y = d.getFullYear();
	const M = d.getMonth();
	const D = d.getDate();
	const h = d.getHours();
	const m_ = d.getMinutes();
	const s = d.getSeconds();

	let y = Y;
	let mo = M;
	let da = 1;
	let hh = 0;
	let mm = 0;
	let ss = 0;

	const dur = parseDuration(duration);
	type Unit = keyof typeof dur;
	const units: Unit[] = ["years", "months", "days", "hours", "minutes", "seconds"];
	const largestUnit = units.find((u) => dur[u] > 0);
	if (!largestUnit) throw new Error("Duration must have at least one non-zero component");

	switch (largestUnit) {
		case "years": {
			const N = dur.years;
			y = Math.floor((Y - 1) / N) * N + 1;
			break;
		}
		case "months": {
			const N = dur.months;
			mo = Math.floor(M / N) * N;
			break;
		}
		case "days": {
			const N = dur.days;
			da = Math.floor((D - 1) / N) * N + 1;
			break;
		}
		case "hours": {
			const N = dur.hours;
			da = D;
			hh = Math.floor(h / N) * N;
			break;
		}
		case "minutes": {
			const N = dur.minutes;
			da = D;
			hh = h;
			mm = Math.floor(m_ / N) * N;
			break;
		}
		case "seconds": {
			const N = dur.seconds;
			da = D;
			hh = h;
			mm = m_;
			ss = Math.floor(s / N) * N;
			break;
		}
	}
	return new Date(y, mo, da, hh, mm, ss);
};

export const getDateDomain = ({ min, max, duration }: { min: Date; max: Date; duration: string }): Date[] => {
	const dur = parseDuration(duration);
	const units = ["years", "months", "days", "hours", "minutes", "seconds"] as const;

	// find largest unit
	let unit: keyof typeof dur = "seconds";
	for (let i = 0; i < 6; i++) {
		const u = units[i];
		if (dur[u]) {
			unit = u;
			break;
		}
	}

	const step = dur[unit];
	if (!step) throw new Error("invalid duration");

	// precompute offset (no spread / delete)
	const oY = dur.years && unit !== "years" ? dur.years : 0;
	const oM = dur.months && unit !== "months" ? dur.months : 0;
	const oD = dur.days && unit !== "days" ? dur.days : 0;
	const oH = dur.hours && unit !== "hours" ? dur.hours : 0;
	const oMin = dur.minutes && unit !== "minutes" ? dur.minutes : 0;
	const oS = dur.seconds && unit !== "seconds" ? dur.seconds : 0;

	const start = getFloorDateFromDuration(min, duration);
	const res: Date[] = [];

	if (unit === "years" || unit === "months") {
		// baseline constants
		const y0 = start.getFullYear();
		const m0 = start.getMonth();
		const d0 = start.getDate() + oD;
		const h0 = start.getHours() + oH;
		const mi0 = start.getMinutes() + oMin;
		const s0 = start.getSeconds() + oS;

		// fast numeric path
		let n = 0;
		let t = 0;
		let y, m;
		while (true) {
			if (unit === "years") {
				y = y0 + step * n;
				m = m0 + oM;
			} else {
				const totalM = m0 + step * n + oM;
				y = y0 + ((totalM / 12) | 0);
				m = totalM % 12;
			}
			t = +new Date(y, m, d0, h0, mi0, s0);
			res.push(new Date(t));
			if (t >= +max) break;
			n++;
		}
		return res;
	}

	// time-based arithmetic
	const MS_D = 864e5,
		MS_H = 36e5,
		MS_M = 6e4,
		MS_S = 1e3;
	let stepMs = 0;
	switch (unit) {
		case "days":
			stepMs = step * MS_D;
			break;
		case "hours":
			stepMs = step * MS_H;
			break;
		case "minutes":
			stepMs = step * MS_M;
			break;
		default:
			stepMs = step * MS_S;
	}

	const offMs = oD * MS_D + oH * MS_H + oMin * MS_M + oS * MS_S;
	const startT = start.getTime() + offMs;
	const maxT = +max;
	const count = ((maxT - startT) / stepMs + 1.000001) | 0;

	const arr = new Array(count);
	for (let i = 0; i < count; i++) arr[i] = new Date(startT + i * stepMs);
	return arr;
};

export const getCeilDateFromDuration = (d: Date, duration: string): Date => {
	const dur = parseDuration(duration);
	type Unit = keyof typeof dur;
	const units: Unit[] = ["years", "months", "days", "hours", "minutes", "seconds"];
	const largestUnit = units.find((u) => dur[u]! > 0);
	if (!largestUnit) throw new Error("Duration must have at least one non‑zero component");

	const Y = d.getFullYear();
	const M = d.getMonth(); // 0–11
	const D = d.getDate(); // 1–31
	const h = d.getHours(); // 0–23
	const m_ = d.getMinutes(); // 0–59
	const s = d.getSeconds(); // 0–59

	let result: Date;

	switch (largestUnit) {
		case "years": {
			const N = dur.years!;
			// e.g. ceil(2024 / 5) * 5 = 2025 if N=5
			const nextYear = Math.ceil(Y / N) * N;
			result = new Date(nextYear, 0, 1, 0, 0, 0);
			break;
		}

		case "months": {
			const N = dur.months!;
			const monthNo = M + 1; // 1–12
			const blockEnd = Math.ceil(monthNo / N) * N; // e.g. ceil(12/5)*5=15
			if (blockEnd <= 12) {
				result = new Date(Y, blockEnd - 1, 1, 0, 0, 0);
			} else {
				// overflow into next year
				result = new Date(Y + 1, blockEnd - 12 - 1, 1, 0, 0, 0);
			}
			break;
		}

		case "days": {
			const N = dur.days!;
			// if not exactly at 00:00, treat as one day later
			const effDay = D + (h || m_ || s ? 1 : 0);
			// next multiple of N
			const nextMultiple = Math.ceil(effDay / N) * N;
			// let JS roll over month/year
			result = new Date(Y, M, nextMultiple, 0, 0, 0);
			break;
		}

		case "hours": {
			const N = dur.hours!;
			const blockEnd = Math.ceil(h / N) * N; // e.g. ceil(23/5)*5=25
			const overflowDays = Math.floor(blockEnd / 24);
			const hour = blockEnd % 24;
			result = new Date(Y, M, D + overflowDays, hour, 0, 0);
			break;
		}

		case "minutes": {
			const N = dur.minutes!;
			const blockEnd = Math.ceil(m_ / N) * N;
			const overflowHours = Math.floor(blockEnd / 60);
			const minute = blockEnd % 60;
			result = new Date(Y, M, D, h + overflowHours, minute, 0);
			break;
		}

		case "seconds": {
			const N = dur.seconds!;
			const blockEnd = Math.ceil(s / N) * N;
			const overflowMinutes = Math.floor(blockEnd / 60);
			const second = blockEnd % 60;
			result = new Date(Y, M, D, h, m_ + overflowMinutes, second);
			break;
		}

		default:
			throw new Error(`Unsupported unit: ${largestUnit}`);
	}

	return result;
};

type ISOUnit = "Y" | "M" | "W" | "D" | "H" | "M" | "S";
interface Candidate {
	iso: string;
	ms: number;
}

const TARGET_TICKS = 10;
export function getDurationFromMinMax(min: number, max: number): string {
	// Convert to numeric ms
	const span = max - min;

	// Candidate intervals in ISO + their ms lengths
	const candidates: Candidate[] = [
		{ iso: "PT1S", ms: 1000 },
		{ iso: "PT5S", ms: 5 * 1000 },
		{ iso: "PT15S", ms: 15 * 1000 },
		{ iso: "PT30S", ms: 30 * 1000 },
		{ iso: "PT1M", ms: 60 * 1000 },
		{ iso: "PT5M", ms: 5 * 60 * 1000 },
		{ iso: "PT15M", ms: 15 * 60 * 1000 },
		{ iso: "PT30M", ms: 30 * 60 * 1000 },
		{ iso: "PT1H", ms: 60 * 60 * 1000 },
		{ iso: "PT3H", ms: 3 * 60 * 60 * 1000 },
		{ iso: "PT6H", ms: 6 * 60 * 60 * 1000 },
		{ iso: "PT12H", ms: 12 * 60 * 60 * 1000 },
		{ iso: "P1D", ms: 24 * 60 * 60 * 1000 },
		{ iso: "P2D", ms: 2 * 24 * 60 * 60 * 1000 },
		{ iso: "P7D", ms: 7 * 24 * 60 * 60 * 1000 },
		{ iso: "P1M", ms: 30 * 24 * 60 * 60 * 1000 }, // ≈30 days
		{ iso: "P3M", ms: 3 * 30 * 24 * 60 * 60 * 1000 },
		{ iso: "P6M", ms: 6 * 30 * 24 * 60 * 60 * 1000 },
		{ iso: "P1Y", ms: 365 * 24 * 60 * 60 * 1000 }, // ≈1 year
	];

	// For each candidate, how many ticks would it give?
	// pick the iso whose tick-count is closest to targetTicks
	let best: Candidate = candidates[0];
	let bestDiff = Infinity;

	for (const cand of candidates) {
		const ticks = span / cand.ms;
		const diff = Math.abs(ticks - TARGET_TICKS);
		if (diff < bestDiff) {
			bestDiff = diff;
			best = cand;
		}
	}
	return best.iso;
}

export function getDurationFromRange(start: Date, end: Date): string {
	if (end.getTime() < start.getTime()) {
		throw new Error("End date must be on or after start date");
	}

	// Mutable cursor
	const cursor = new Date(start.getTime());

	// 1) Years
	let years = end.getFullYear() - cursor.getFullYear();
	cursor.setFullYear(cursor.getFullYear() + years);
	if (cursor.getTime() > end.getTime()) {
		years -= 1;
		cursor.setFullYear(cursor.getFullYear() - 1);
	}

	// 2) Months
	let months = end.getMonth() - cursor.getMonth();
	cursor.setMonth(cursor.getMonth() + months);
	if (cursor.getTime() > end.getTime()) {
		months -= 1;
		cursor.setMonth(cursor.getMonth() - 1);
	}

	// 3) Days
	const msPerDay = 24 * 60 * 60 * 1000;
	let deltaMs = end.getTime() - cursor.getTime();
	const days = Math.floor(deltaMs / msPerDay);
	cursor.setDate(cursor.getDate() + days);

	// 4) Hours
	const msPerHour = 60 * 60 * 1000;
	deltaMs = end.getTime() - cursor.getTime();
	const hours = Math.floor(deltaMs / msPerHour);
	cursor.setHours(cursor.getHours() + hours);

	// 5) Minutes
	const msPerMinute = 60 * 1000;
	deltaMs = end.getTime() - cursor.getTime();
	const minutes = Math.floor(deltaMs / msPerMinute);
	cursor.setMinutes(cursor.getMinutes() + minutes);

	// 6) Seconds
	const msPerSecond = 1000;
	deltaMs = end.getTime() - cursor.getTime();
	const seconds = Math.floor(deltaMs / msPerSecond);

	// Assemble ISO string
	let iso = "P";
	if (years) iso += `${years}Y`;
	if (months) iso += `${months}M`;
	if (days) iso += `${days}D`;
	if (hours || minutes || seconds) iso += "T";
	if (hours) iso += `${hours}H`;
	if (minutes) iso += `${minutes}M`;
	if (seconds) iso += `${seconds}S`;
	return iso === "P" ? "P0D" : iso;
}

export const removeDurationFromDate = (dte: Date, duration: string): Date => {
	const dur = parseDuration(duration);
	type Unit = keyof typeof dur;
	const units: Unit[] = ["years", "months", "days", "hours", "minutes", "seconds"];
	const largestUnit = units.find((u) => dur[u] > 0);
	if (!largestUnit) throw new Error("Duration must have at least one non-zero component");

	// We subtract the entire duration from the given date
	const newDate = new Date(dte.getTime());

	if (dur.years) newDate.setFullYear(newDate.getFullYear() - dur.years);
	if (dur.months) newDate.setMonth(newDate.getMonth() - dur.months);
	if (dur.days) newDate.setDate(newDate.getDate() - dur.days);
	if (dur.hours) newDate.setHours(newDate.getHours() - dur.hours);
	if (dur.minutes) newDate.setMinutes(newDate.getMinutes() - dur.minutes);
	if (dur.seconds) newDate.setSeconds(newDate.getSeconds() - dur.seconds);

	return newDate;
};

export const addDurationToDate = (dte: Date, duration: string): Date => {
	const dur = parseDuration(duration);
	type Unit = keyof typeof dur;
	const units: Unit[] = ["years", "months", "days", "hours", "minutes", "seconds"];
	const largestUnit = units.find((u) => dur[u] > 0);
	if (!largestUnit) throw new Error("Duration must have at least one non-zero component");

	// Add each part of the duration
	const newDate = new Date(dte.getTime());

	if (dur.years) newDate.setFullYear(newDate.getFullYear() + dur.years);
	if (dur.months) newDate.setMonth(newDate.getMonth() + dur.months);
	if (dur.days) newDate.setDate(newDate.getDate() + dur.days);
	if (dur.hours) newDate.setHours(newDate.getHours() + dur.hours);
	if (dur.minutes) newDate.setMinutes(newDate.getMinutes() + dur.minutes);
	if (dur.seconds) newDate.setSeconds(newDate.getSeconds() + dur.seconds);

	return newDate;
};
