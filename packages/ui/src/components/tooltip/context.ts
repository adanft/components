import type { FloatingContext, UseInteractionsReturn } from '@floating-ui/react';
import type { CSSProperties } from 'react';
import { createContext, useContext } from 'react';

type TooltipContextValue = {
  context: FloatingContext;
  floatingStyles: CSSProperties;
  getFloatingProps: UseInteractionsReturn['getFloatingProps'];
  getReferenceProps: UseInteractionsReturn['getReferenceProps'];
  open: boolean;
  setFloating: (node: HTMLElement | null) => void;
  setReference: (node: Element | null) => void;
};

const TooltipContext = createContext<TooltipContextValue | null>(null);

function useTooltipContext(componentName: string) {
  const context = useContext(TooltipContext);

  if (!context) {
    throw new Error(`<Tooltip.${componentName}> must be used within <Tooltip>.`);
  }

  return context;
}

export type { TooltipContextValue };
export { TooltipContext, useTooltipContext };
