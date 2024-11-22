import { RefCallback, RefObject, useCallback, useRef, useState } from "react";

export const useStatefulRef = <T extends Element>(): [RefObject<T>, RefCallback<T>] => {
	const [, update] = useState(0);
	const ref = useRef<T | null>();

	const setRef = useCallback((element: T | null) => {
		/* stable function identity in ref prop on elements prevents unnecessary re-runs (see react docs) */
		update((key) => key + 1);
		ref.current = element;
	}, []);
	return [ref as RefObject<T>, setRef];
};
