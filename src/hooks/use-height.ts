import { RefObject, useLayoutEffect, useState } from "react";

export const useHeight = (ref: RefObject<Element | null>) => {
	const [height, setHeight] = useState<number>();
	useLayoutEffect(() => {
		const { current: element } = ref;
		if (!element) return;
		const measure = () => setHeight(element.getBoundingClientRect().height);
		measure();
		const resize = new ResizeObserver(measure);
		resize.observe(element);
		return () => resize.unobserve(element);
	}, [ref.current]);
	return height;
};
