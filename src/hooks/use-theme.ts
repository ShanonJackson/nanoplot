export const useTheme = () => {
	return document.cookie.includes("theme=light") ? "light" : "dark";
};
