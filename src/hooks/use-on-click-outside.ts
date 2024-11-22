import { RefObject, useEffect } from "react";

export const useOnClickOutside = (ignore: Array<RefObject<Element>>, onClickOutside: (e: Event) => void, dependencies: unknown[] = []) => {
	useEffect(() => {
		const onClick = (e: Event) => {
			if (ignore.some((ele) => e.target instanceof Element && ele.current?.contains(e.target))) return;
			onClickOutside(e);
		};
		document.addEventListener("click", onClick, true);
		return () => document.removeEventListener("click", onClick, true);
	}, dependencies);
};
