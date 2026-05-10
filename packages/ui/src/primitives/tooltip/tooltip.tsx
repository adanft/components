import {
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import type { ReactNode } from 'react';

import { TooltipContext } from './context';

type TooltipPosition =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end';

type TooltipProps = {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  position?: TooltipPosition;
};

function Tooltip({ children, open, onOpenChange, position = 'top' }: TooltipProps) {
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange(nextOpen) {
      onOpenChange(nextOpen);
    },
    placement: position,
    middleware: [offset(16), flip(), shift({ padding: 16 })],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role]);

  return (
    <TooltipContext.Provider
      value={{
        context,
        floatingStyles,
        getFloatingProps,
        getReferenceProps,
        open,
        setFloating: refs.setFloating,
        setReference: refs.setReference,
      }}>
      {children}
    </TooltipContext.Provider>
  );
}

export default Tooltip;
export type { TooltipPosition, TooltipProps };
