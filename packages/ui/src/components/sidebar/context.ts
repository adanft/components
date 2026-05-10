import { createContext, useContext } from 'react';

type SidebarContextValue = {
  action: (state: boolean) => void;
  collapsed: boolean;
  state: boolean;
};

const SidebarContext = createContext<SidebarContextValue | null>(null);

function useSidebarContext(componentName: string) {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error(`<Sidebar.${componentName}> must be used within <Sidebar>.`);
  }

  return context;
}

export { SidebarContext, useSidebarContext };
