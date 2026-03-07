import { Children, cloneElement, type ReactElement } from 'react';

import { useModalContext } from './context';

type ModalTriggerProps = {
  children: ReactElement;
};

function ModalTrigger({ children }: ModalTriggerProps) {
  const { setOpen } = useModalContext('Modal.Trigger');
  const child = Children.only(children) as ReactElement<{ onClick?: () => void }>;

  return cloneElement(child, {
    onClick: () => {
      setOpen(true);
    },
  });
}

export default ModalTrigger;
export type { ModalTriggerProps };
