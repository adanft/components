import type { ComponentPropsWithoutRef, MouseEvent } from 'react';

import { cn } from '../../helpers/cn';
import { useModalContext } from './context';

type ModalBackdropProps = ComponentPropsWithoutRef<'div'>;

function ModalBackdrop({ className, onClick, ...props }: ModalBackdropProps) {
  const { onClose } = useModalContext('Backdrop');

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    onClose();
  }

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: intentionally hidden from a11y tree via aria-hidden
    // biome-ignore lint/a11y/useKeyWithClickEvents: backdrop keyboard handling is managed by the Modal focus-trap
    <div
      aria-hidden="true"
      onClick={handleClick}
      className={cn('fixed inset-0 z-40 bg-black/50 pointer-events-auto', className)}
      {...props}
    />
  );
}

export default ModalBackdrop;
export type { ModalBackdropProps };
