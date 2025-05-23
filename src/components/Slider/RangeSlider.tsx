import React, { useCallback, useEffect, useRef, useState } from "react";

interface RangeSliderProps {
	min?: number;
	max?: number;
	step?: number;
	value: [number, number];
	onChange: (values: [number, number]) => void;
	className?: string;
	distance?: {
		minimum?: number;
	};
}

export function RangeSlider({
	min = 0,
	max = 100,
	step = 1,
	value: [startValue, endValue],
	onChange,
	className = "",
	distance,
}: RangeSliderProps) {
	const [activeThumb, setActiveThumb] = useState<"start" | "end" | null>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const rangeRef = useRef<HTMLDivElement>(null);

	// Use refs for drag state to avoid re-renders
	const originalRef = useRef<{ start: number; end: number }>({ start: 0, end: 0 });
	const dragStartXRef = useRef<number>(0);

	// Minimum distance constraint
	const minimumDistance = distance?.minimum ?? 0;

	const lowerValue = Math.min(startValue, endValue);
	const higherValue = Math.max(startValue, endValue);
	const startPercentage = ((lowerValue - min) / (max - min)) * 100;
	const endPercentage = ((higherValue - min) / (max - min)) * 100;

	// Enforce minimum gap on thumbs
	const enforceMinimumDistance = useCallback(
		(newStart: number, newEnd: number, thumb?: "start" | "end"): [number, number] => {
			if (minimumDistance <= 0) return [newStart, newEnd];
			const gap = Math.abs(newEnd - newStart);
			if (gap < minimumDistance) {
				if (thumb === "start") {
					newStart = Math.min(newStart, newEnd - minimumDistance);
				} else if (thumb === "end") {
					newEnd = Math.max(newEnd, newStart + minimumDistance);
				}
			}
			return [newStart, newEnd];
		},
		[minimumDistance],
	);

	// Handle pointer drag on the filled range
	const onRangePointerDown = (e: React.PointerEvent) => {
		e.preventDefault();
		setActiveThumb(null); // disable thumb drag
		originalRef.current = { start: startValue, end: endValue };
		dragStartXRef.current = e.clientX;

		document.addEventListener("pointermove", onRangePointerMove);
		document.addEventListener("pointerup", onRangePointerUp);
	};

	const onRangePointerMove = (e: PointerEvent) => {
		e.preventDefault();
		if (!trackRef.current) return;

		const dx = e.clientX - dragStartXRef.current;
		const trackWidth = trackRef.current.getBoundingClientRect().width;
		const deltaValue = (dx / trackWidth) * (max - min);

		let newStart = originalRef.current.start + deltaValue;
		let newEnd = originalRef.current.end + deltaValue;
		const gap = Math.max(originalRef.current.end - originalRef.current.start, minimumDistance);

		// clamp to bounds
		if (newStart < min) {
			newStart = min;
			newEnd = min + gap;
		}
		if (newEnd > max) {
			newEnd = max;
			newStart = max - gap;
		}

		// step snapping
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

	// Move single thumb
	const handleMove = useCallback(
		(clientX: number, thumb: "start" | "end") => {
			if (!trackRef.current) return;
			const rect = trackRef.current.getBoundingClientRect();
			const offset = clientX - rect.left;
			let pct = Math.max(0, Math.min(1, offset / rect.width));
			let val = min + pct * (max - min);
			if (step) val = Math.round(val / step) * step;
			val = Math.max(min, Math.min(max, val));

			let newStart = startValue;
			let newEnd = endValue;

			if (thumb === "start") {
				newStart = val;
			} else {
				newEnd = val;
			}

			[newStart, newEnd] = enforceMinimumDistance(newStart, newEnd, thumb);
			onChange([newStart, newEnd]);
		},
		[min, max, step, startValue, endValue, onChange, enforceMinimumDistance],
	);

	const handleMouseDown = (e: React.MouseEvent, thumb: "start" | "end") => {
		e.preventDefault();
		setActiveThumb(thumb);
		handleMove(e.clientX, thumb);
	};
	const handleTouchStart = (e: React.TouchEvent, thumb: "start" | "end") => {
		setActiveThumb(thumb);
		handleMove(e.touches[0].clientX, thumb);
	};

	const handleKeyDown = (e: React.KeyboardEvent, thumb: "start" | "end") => {
		// same keyboard logic as before, applying enforceMinimumDistance
		let newVal = thumb === "start" ? startValue : endValue;
		switch (e.key) {
			case "ArrowRight":
			case "ArrowUp":
				newVal = Math.min(max, newVal + step);
				break;
			case "ArrowLeft":
			case "ArrowDown":
				newVal = Math.max(min, newVal - step);
				break;
			case "Home":
				newVal = min;
				break;
			case "End":
				newVal = max;
				break;
			default:
				return;
		}
		e.preventDefault();
		let newStart = startValue;
		let newEnd = endValue;
		if (thumb === "start") newStart = newVal;
		else newEnd = newVal;
		[newStart, newEnd] = enforceMinimumDistance(newStart, newEnd, thumb);
		onChange([newStart, newEnd]);
		// move focus if swapped (omitted for brevity)
	};

	useEffect(() => {
		if (!activeThumb) return;
		const onMove = (e: MouseEvent) => handleMove(e.clientX, activeThumb);
		const onUp = () => setActiveThumb(null);
		document.addEventListener("mousemove", onMove);
		document.addEventListener("mouseup", onUp);
		return () => {
			document.removeEventListener("mousemove", onMove);
			document.removeEventListener("mouseup", onUp);
		};
	}, [activeThumb, handleMove]);

	return (
		<div className={`relative w-full ${className}`}>
			<div ref={trackRef} className="relative h-2 w-full rounded-full bg-gray-200">
				<div
					ref={rangeRef}
					className="absolute h-full rounded-full bg-purple-500 cursor-grab"
					style={{ left: `${startPercentage}%`, width: `${endPercentage - startPercentage}%` }}
					onPointerDown={onRangePointerDown}
				/>

				{/* Start Thumb */}
				<div
					role="slider"
					tabIndex={0}
					aria-valuemin={min}
					aria-valuemax={max}
					aria-valuenow={startValue}
					aria-label="Minimum value"
					onKeyDown={(e) => handleKeyDown(e, "start")}
					className={`absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-purple-500 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
						activeThumb === "start" ? "cursor-grabbing z-20" : "cursor-grab z-10"
					}`}
					style={{ left: `${startPercentage}%` }}
					onMouseDown={(e) => handleMouseDown(e, "start")}
					onTouchStart={(e) => handleTouchStart(e, "start")}
				/>

				{/* End Thumb */}
				<div
					role="slider"
					tabIndex={0}
					aria-valuemin={min}
					aria-valuemax={max}
					aria-valuenow={endValue}
					aria-label="Maximum value"
					onKeyDown={(e) => handleKeyDown(e, "end")}
					className={`absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-purple-500 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
						activeThumb === "end" ? "cursor-grabbing z-20" : "cursor-grab z-10"
					}`}
					style={{ left: `${endPercentage}%` }}
					onMouseDown={(e) => handleMouseDown(e, "end")}
					onTouchStart={(e) => handleTouchStart(e, "end")}
				/>
			</div>
		</div>
	);
}
