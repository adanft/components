import { createContext, type RefObject, useContext } from 'react';

type SidebarContextValue = {
  action: (state: boolean) => void;
  collapsed: boolean;
  sidebarId: string;
  state: boolean;
  toggleRef: RefObject<HTMLButtonElement | null>;
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
