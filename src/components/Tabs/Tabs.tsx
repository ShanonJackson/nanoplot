import TabsProvider from "./tabs-context";

interface TabsProps {
	children: React.ReactNode;
}

export const Tabs = ({ children }: TabsProps) => {
	return <TabsProvider>{children}</TabsProvider>;
};
