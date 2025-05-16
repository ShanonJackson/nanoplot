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
	type Unit = keyof typeof dur;
	const units: Unit[] = ["years", "months", "days", "hours", "minutes", "seconds"];
	const largestUnit = units.find((u) => dur[u] > 0);
	if (!largestUnit) throw new Error("Duration must have at least one non-zero component");

	// Split into step (largest) and offset (others)
	const stepUnits: Record<Unit, number> = { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
	const offsetUnits: Record<Unit, number> = { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
	// Assign step for largestUnit
	stepUnits[largestUnit] = dur[largestUnit];
	// Rest go to offset
	units.forEach((u) => {
		if (u !== largestUnit) offsetUnits[u] = dur[u];
	});

	const add = (d: Date, delta: Record<Unit, number>) => {
		const c = new Date(d.getTime());
		if (delta.years) c.setFullYear(c.getFullYear() + delta.years);
		if (delta.months) c.setMonth(c.getMonth() + delta.months);
		if (delta.days) c.setDate(c.getDate() + delta.days);
		if (delta.hours) c.setHours(c.getHours() + delta.hours);
		if (delta.minutes) c.setMinutes(c.getMinutes() + delta.minutes);
		if (delta.seconds) c.setSeconds(c.getSeconds() + delta.seconds);
		return c;
	};

	const result: Date[] = [];
	const startFloor = getFloorDateFromDuration(min, duration);
	let i = 0;

	while (true) {
		// Advance largest unit by i steps
		const stepDelta: Record<Unit, number> = Object.fromEntries(units.map((u) => [u, stepUnits[u] * i])) as Record<Unit, number>;

		const base = add(startFloor, stepDelta);
		const tick = add(base, offsetUnits);

		if (tick > max) {
			result.push(tick);
			break;
		}
		if (tick >= startFloor) {
			result.push(tick);
		}
		i++;
	}
	return result;
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
