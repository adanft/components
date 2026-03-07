import { Children, cloneElement, type ReactElement } from 'react';

import { useModalContext } from './context';

type ModalCloseProps = {
  children: ReactElement;
};

function ModalClose({ children }: ModalCloseProps) {
  const { setOpen } = useModalContext('Modal.Close');
  const child = Children.only(children) as ReactElement<{ onClick?: () => void }>;

  return cloneElement(child, {
    onClick: () => {
      setOpen(false);
    },
  });
}

export default ModalClose;
export type { ModalCloseProps };
