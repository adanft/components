import { createContext, useContext } from 'react';

type TabsContextValue = {
  baseId: string;
  onValueChange: (value: string) => void;
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

export { TabsContext, useTabsContext };
