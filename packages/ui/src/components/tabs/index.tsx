import TabsContent from './content';
import TabsList from './list';
import TabsRoot from './tabs';
import TabsTrigger from './trigger';

const Tabs = Object.assign(TabsRoot, {
  Content: TabsContent,
  List: TabsList,
  Trigger: TabsTrigger,
});

export default Tabs;
export type { TabsContentProps } from './content';
export type { TabsListOrientation, TabsListProps } from './list';
export type { TabsProps } from './tabs';
export type { TabsTriggerProps } from './trigger';
