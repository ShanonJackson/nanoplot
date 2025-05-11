import React from "react";

export const mergeRefs = <T>(
	...inputRefs: Array<React.Ref<T> | React.ForwardedRef<T> | undefined> | React.ForwardedRef<T>[]
): React.Ref<T> | React.RefCallback<T> => {
	const refs = inputRefs.filter((s) => !!s);
	if (refs.length === 1 && refs[0]) return refs[0];
	return (ref) => {
		refs.forEach((inputRef) => {
			if (typeof inputRef === "function") inputRef(ref);
			if (inputRef && "current" in inputRef) inputRef.current = ref;
		});
	};
};
