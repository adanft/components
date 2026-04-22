import type { FloatingContext, UseInteractionsReturn } from '@floating-ui/react';
import type { CSSProperties } from 'react';
import { createContext, useContext } from 'react';

type PopoverContextValue = {
  context: FloatingContext;
  floatingStyles: CSSProperties;
  getFloatingProps: UseInteractionsReturn['getFloatingProps'];
  getReferenceProps: UseInteractionsReturn['getReferenceProps'];
  hasPopup: boolean;
  open: boolean;
  setFloating: (node: HTMLElement | null) => void;
  setReference: (node: Element | null) => void;
};

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopoverContext(componentName: string) {
  const context = useContext(PopoverContext);

  if (!context) {
    throw new Error(`<Popover.${componentName}> must be used within <Popover>.`);
  }

  return context;
}

export type { PopoverContextValue };
export { PopoverContext, usePopoverContext };
