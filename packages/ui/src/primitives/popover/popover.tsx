import {
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import type { ReactNode } from 'react';

import { PopoverContext } from './context';

type PopoverPosition =
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

type PopoverProps = {
  children: ReactNode;
  contentRole?: 'dialog' | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  position?: PopoverPosition;
  triggerHasPopup?: boolean;
};

function Popover({
  children,
  contentRole = 'dialog',
  open,
  onOpenChange,
  position = 'bottom',
  triggerHasPopup = true,
}: PopoverProps) {
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange(nextOpen) {
      onOpenChange(nextOpen);
    },
    placement: position,
    middleware: [offset(16), flip(), shift({ padding: 16 })],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, contentRole ? { role: contentRole } : { enabled: false });

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  return (
    <PopoverContext.Provider
      value={{
        context,
        floatingStyles,
        getFloatingProps,
        getReferenceProps,
        hasPopup: triggerHasPopup,
        open,
        setFloating: refs.setFloating,
        setReference: refs.setReference,
      }}>
      {children}
    </PopoverContext.Provider>
  );
}

export default Popover;
export type { PopoverPosition, PopoverProps };
