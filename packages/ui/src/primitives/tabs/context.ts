import { createContext, useContext } from 'react';

type TabsTriggerRegistration = {
  disabled: boolean;
  node: HTMLElement;
  value: string;
};

type TabsContextValue = {
  baseId: string;
  onValueChange: (value: string) => void;
  registerTrigger: (trigger: TabsTriggerRegistration) => () => void;
  triggers: TabsTriggerRegistration[];
  value: string;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(componentName: string) {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error(`<Tabs.${componentName}> must be used within <Tabs>.`);
  }

  return context;
}

export type { TabsTriggerRegistration };
export { TabsContext, useTabsContext };
