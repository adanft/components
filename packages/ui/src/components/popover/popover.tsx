import type { Placement } from '@floating-ui/react';
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

type PopoverProps = {
  children: ReactNode;
  contentRole?: 'dialog' | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  placement?: Placement;
  triggerHasPopup?: boolean;
};

function Popover({
  children,
  contentRole = 'dialog',
  open,
  onOpenChange,
  placement = 'bottom',
  triggerHasPopup = true,
}: PopoverProps) {
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange(nextOpen) {
      onOpenChange(nextOpen);
    },
    placement,
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
export type { PopoverProps };
