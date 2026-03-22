import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../../helpers/cn';
import { useModalContext } from './context';

type ModalBackdropProps = ComponentPropsWithoutRef<'div'>;

function ModalBackdrop({ className, ...props }: ModalBackdropProps) {
  const { onClose } = useModalContext('Backdrop');

  return (
    <div
      aria-hidden="true"
      onClick={onClose}
      className={cn('fixed inset-0 z-40 bg-black/50 pointer-events-auto', className)}
      {...props}
    />
  );
}

export default ModalBackdrop;
export type { ModalBackdropProps };
