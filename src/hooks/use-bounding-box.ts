import { RefObject, useLayoutEffect, useState } from "react";

export const useBoundingBox = (ref: RefObject<Element | null>) => {
	const [box, setBox] = useState<DOMRectReadOnly>();
	useLayoutEffect(() => {
		if (!ref.current) return;
		setBox(ref.current.getBoundingClientRect());
		const obs = new ResizeObserver(() => setBox(ref.current?.getBoundingClientRect()));
		obs.observe(ref.current);
		return () => obs.disconnect();
	}, [ref.current]);
	return box;
};
