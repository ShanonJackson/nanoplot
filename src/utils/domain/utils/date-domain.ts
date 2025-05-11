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
	const largestUnit = units.find((u) => dur[u] > 0);
	if (!largestUnit) throw new Error("Duration must have at least one non-zero component");

	// Extract UTC components
	const Y = d.getUTCFullYear();
	const M = d.getUTCMonth();
	const D = d.getUTCDate();
	const h = d.getUTCHours();
	const m_ = d.getUTCMinutes();
	const s = d.getUTCSeconds();

	let y = Y,
		mo = M,
		da = D,
		hh = h,
		mm = m_,
		ss = s;

	switch (largestUnit) {
		case "years": {
			const N = dur.years!;
			// If already at exact boundary, keep. Otherwise, move to next block.
			const base = Math.floor((Y - 1) / N) * N + 1;
			y = base + (Y % N === 1 && M === 0 && D === 1 && h === 0 && m_ === 0 && s === 0 ? 0 : N);
			mo = 0;
			da = 1;
			hh = 0;
			mm = 0;
			ss = 0;
			break;
		}
		case "months": {
			const N = dur.months!;
			// floor month block, then if not exact on 1st 00:00:00, advance one block
			const block = Math.floor(M / N) * N;
			const isExact = M === block && D === 1 && h === 0 && m_ === 0 && s === 0;
			mo = isExact ? block : block + N;
			da = 1;
			hh = 0;
			mm = 0;
			ss = 0;
			break;
		}
		case "days": {
			const N = dur.days!;
			const offset = Math.floor((D - 1) / N) * N + 1;
			const isExact = D === offset && h === 0 && m_ === 0 && s === 0;
			da = isExact ? offset : offset + N;
			hh = 0;
			mm = 0;
			ss = 0;
			break;
		}
		case "hours": {
			const N = dur.hours!;
			const offset = Math.floor(h / N) * N;
			const isExact = h === offset && m_ === 0 && s === 0;
			hh = isExact ? offset : offset + N;
			mm = 0;
			ss = 0;
			break;
		}
		case "minutes": {
			const N = dur.minutes!;
			const offset = Math.floor(m_ / N) * N;
			const isExact = m_ === offset && s === 0;
			mm = isExact ? offset : offset + N;
			ss = 0;
			break;
		}
		case "seconds": {
			const N = dur.seconds!;
			const offset = Math.floor(s / N) * N;
			const isExact = s === offset;
			ss = isExact ? offset : offset + N;
			break;
		}
	}

	return new Date(y, mo, da, hh, mm, ss);
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
