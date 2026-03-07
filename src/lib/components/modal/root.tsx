import { useState, type ReactNode } from 'react';

import { ModalContext } from './context';

type ModalRootProps = {
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

function ModalRoot({
  children,
  defaultOpen = false,
  open: openProp,
  onOpenChange,
}: ModalRootProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : uncontrolledOpen;

  const setOpen = (nextOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(nextOpen);
    }

    onOpenChange?.(nextOpen);
  };

  return <ModalContext.Provider value={{ open, setOpen }}>{children}</ModalContext.Provider>;
}

export default ModalRoot;
export type { ModalRootProps };
