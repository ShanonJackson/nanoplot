import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";

interface Props {}

const HeaderPage = (props: Props) => {
	return (
		<div className="flex justify-end items-center gap-8 p-4 py-2 bg-gradient-to-r from-primary to-primary-foreground text-white">
			<ThemeToggle />
			{/* svg menu icon */}
			<p>Menu</p>
		</div>
	);
};

export default HeaderPage;
