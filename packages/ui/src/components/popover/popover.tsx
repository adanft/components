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
  open: boolean;
  onOpenChange: (open: boolean) => void;
  placement?: Placement;
};

function Popover({ children, open, onOpenChange, placement = 'bottom' }: PopoverProps) {
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
  const role = useRole(context, { role: 'dialog' });

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  return (
    <PopoverContext.Provider
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
    </PopoverContext.Provider>
  );
}

export default Popover;
export type { PopoverProps };
