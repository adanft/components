import type { FloatingContext, UseInteractionsReturn } from '@floating-ui/react';
import type { CSSProperties, MutableRefObject } from 'react';
import { createContext, useContext } from 'react';

type DropdownMenuContextValue = {
  activeIndex: number | null;
  context: FloatingContext;
  floatingStyles: CSSProperties;
  getFloatingProps: UseInteractionsReturn['getFloatingProps'];
  getItemProps: UseInteractionsReturn['getItemProps'];
  getReferenceProps: UseInteractionsReturn['getReferenceProps'];
  labelsRef: MutableRefObject<Array<string | null>>;
  listRef: MutableRefObject<Array<HTMLElement | null>>;
  open: boolean;
  setActiveIndex: (index: number | null) => void;
  setFloating: (node: HTMLElement | null) => void;
  setReference: (node: Element | null) => void;
};

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null);

function useDropdownMenuContext(componentName: string) {
  const context = useContext(DropdownMenuContext);

  if (!context) {
    throw new Error(`<DropdownMenu.${componentName}> must be used within <DropdownMenu>.`);
  }

  return context;
}

export type { DropdownMenuContextValue };
export { DropdownMenuContext, useDropdownMenuContext };
