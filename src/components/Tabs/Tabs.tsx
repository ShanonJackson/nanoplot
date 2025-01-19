import TabsProvider from './tabs-context';

interface TabsProps {
  children: React.ReactNode;
}

export default function Tabs({ children }: TabsProps) {
  return <TabsProvider>{children}</TabsProvider>;
}