import React, { useCallback, useEffect, useRef, useState } from "react";

interface VerticalRangeSliderProps {
	min?: number;
	max?: number;
	step?: number;
	value: [number, number];
	onChange: (values: [number, number]) => void;
	className?: string;
	distance?: { minimum?: number };
}

/*
 * VerticalRangeSlider component
 * 100% GPT generated - With minor changes.
 * Saved alot of time, but will revisit to clean up the code at some point
 * Shouldn't add event listeners except in useEffect's
 * useEffect event listeners should use AbortController on event listeners to make cleanup smaller (controller.abort())
 * anything handle<event> should be renamed on<Event> i.e handleClick -> onClick
 * Get rid of localized mutation, follow functional programming principles.
 */

export function VerticalRangeSlider({
	min = 0,
	max = 100,
	step = 1,
	value: [startValue, endValue],
	onChange,
	className = "",
	distance,
}: VerticalRangeSliderProps) {
	const [activeThumb, setActiveThumb] = useState<"start" | "end" | null>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const rangeRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const originalRef = useRef<{ start: number; end: number }>({ start: 0, end: 0 });
	const dragStartYRef = useRef<number>(0);
	const minimumDistance = distance?.minimum ?? 0;
	const lowerValue = Math.min(startValue, endValue);
	const higherValue = Math.max(startValue, endValue);
	const startPct = ((lowerValue - min) / (max - min)) * 100;
	const endPct = ((higherValue - min) / (max - min)) * 100;

	const enforceMinDistance = useCallback(
		(s: number, e: number, thumb?: "start" | "end"): [number, number] => {
			if (minimumDistance <= 0) return [s, e];
			const gap = Math.abs(e - s);
			if (gap < minimumDistance) {
				if (thumb === "start") {
					s = Math.min(s, e - minimumDistance);
				} else if (thumb === "end") {
					e = Math.max(e, s + minimumDistance);
				}
			}
			return [s, e];
		},
		[minimumDistance],
	);

	// drag entire filled range
	const onRangePointerDown = (e: React.PointerEvent) => {
		e.preventDefault();
		setActiveThumb(null);
		originalRef.current = { start: startValue, end: endValue };
		dragStartYRef.current = e.clientY;
		document.addEventListener("pointermove", onRangePointerMove);
		document.addEventListener("pointerup", onRangePointerUp);
	};

	const onRangePointerMove = (e: PointerEvent) => {
		e.preventDefault();
		if (!trackRef.current) return;
		const dy = dragStartYRef.current - e.clientY;
		const trackH = trackRef.current.getBoundingClientRect().height;
		const deltaVal = (dy / trackH) * (max - min);

		let newStart = originalRef.current.start + deltaVal;
		let newEnd = originalRef.current.end + deltaVal;
		const gap = Math.max(originalRef.current.end - originalRef.current.start, minimumDistance);

		if (newStart < min) {
			newStart = min;
			newEnd = min + gap;
		}
		if (newEnd > max) {
			newEnd = max;
			newStart = max - gap;
		}

		if (step) {
			newStart = Math.round(newStart / step) * step;
			newEnd = Math.round(newEnd / step) * step;
		}

		onChange([newStart, newEnd]);
	};

	const onRangePointerUp = () => {
		document.removeEventListener("pointermove", onRangePointerMove);
		document.removeEventListener("pointerup", onRangePointerUp);
	};

	// single thumb move
	const handleMove = useCallback(
		(clientY: number, thumb: "start" | "end") => {
			if (!trackRef.current) return;
			const rect = trackRef.current.getBoundingClientRect();
			const offset = rect.bottom - clientY;
			let pct = Math.max(0, Math.min(1, offset / rect.height));
			let val = min + pct * (max - min);
			if (step) val = Math.round(val / step) * step;
			val = Math.max(min, Math.min(max, val));

			let s = startValue;
			let e = endValue;
			if (thumb === "start") s = val;
			else e = val;
			[s, e] = enforceMinDistance(s, e, thumb);
			onChange([s, e]);
		},
		[min, max, step, startValue, endValue, onChange, enforceMinDistance],
	);

	const handleMouseDown = (e: React.MouseEvent, thumb: "start" | "end") => {
		e.preventDefault();
		setActiveThumb(thumb);
		handleMove(e.clientY, thumb);
	};
	const handleTouchStart = (e: React.TouchEvent, thumb: "start" | "end") => {
		setActiveThumb(thumb);
		handleMove(e.touches[0].clientY, thumb);
	};

	const handleKeyDown = (e: React.KeyboardEvent, thumb: "start" | "end") => {
		let val = thumb === "start" ? startValue : endValue;
		if (e.key === "ArrowUp" || e.key === "ArrowRight") val = Math.min(max, val + step);
		else if (e.key === "ArrowDown" || e.key === "ArrowLeft") val = Math.max(min, val - step);
		else if (e.key === "Home") val = min;
		else if (e.key === "End") val = max;
		else return;
		e.preventDefault();
		let s = startValue;
		let eVal = endValue;
		if (thumb === "start") s = val;
		else eVal = val;
		[s, eVal] = enforceMinDistance(s, eVal, thumb);
		onChange([s, eVal]);
	};

	useEffect(() => {
		if (!activeThumb) return;
		const onMove = (e: MouseEvent) => handleMove(e.clientY, activeThumb);
		const onUp = () => setActiveThumb(null);
		document.addEventListener("mousemove", onMove);
		document.addEventListener("mouseup", onUp);
		return () => {
			document.removeEventListener("mousemove", onMove);
			document.removeEventListener("mouseup", onUp);
		};
	}, [activeThumb, handleMove]);

	return (
		<div className="h-full flex flex-col items-center">
			<div className={`h-full relative ${className}`} ref={containerRef}>
				<div ref={trackRef} className="absolute left-1/2 -translate-x-1/2 w-2 h-full rounded-full bg-gray-200">
					<div
						ref={rangeRef}
						className="absolute w-full rounded-full bg-purple-500 cursor-grab"
						style={{ bottom: `${startPct}%`, height: `${endPct - startPct}%` }}
						onPointerDown={onRangePointerDown}
					/>
					<div
						role="slider"
						tabIndex={0}
						aria-valuemin={min}
						aria-valuemax={max}
						aria-valuenow={startValue}
						aria-orientation="vertical"
						onKeyDown={(e) => handleKeyDown(e, "start")}
						className={`absolute left-1/2 h-5 w-5 [transform:translate(-50%)] rounded-full border-2 border-white bg-purple-500 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
							activeThumb === "start" ? "cursor-grabbing z-20" : "cursor-grab z-10"
						}`}
						style={{ bottom: `${startPct}%` }}
						onMouseDown={(e) => handleMouseDown(e, "start")}
						onTouchStart={(e) => handleTouchStart(e, "start")}
					/>
					<div
						role="slider"
						tabIndex={0}
						aria-valuemin={min}
						aria-valuemax={max}
						aria-valuenow={endValue}
						aria-orientation="vertical"
						onKeyDown={(e) => handleKeyDown(e, "end")}
						className={`absolute left-1/2 h-5 w-5 [transform:translate(-50%,100%)] rounded-full border-2 border-white bg-purple-500 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
							activeThumb === "end" ? "cursor-grabbing z-20" : "cursor-grab z-10"
						}`}
						style={{ bottom: `${endPct}%` }}
						onMouseDown={(e) => handleMouseDown(e, "end")}
						onTouchStart={(e) => handleTouchStart(e, "end")}
					/>
				</div>
			</div>
		</div>
	);
}
