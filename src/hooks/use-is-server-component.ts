import * as R from "react";

export const useIsServerComponent = () => {
	/* createContext is undefined inside server component environment */
	return !R.createContext;
};
