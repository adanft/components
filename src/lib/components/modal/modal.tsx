import { useEffect, useId, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { ModalContext } from './context';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

function Modal({ open, onClose, children }: ModalProps) {
  const titleId = `modal-title-${useId()}`;
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  if (open) {
    previousActiveElementRef.current ??= document.activeElement as HTMLElement | null;
  }

  useEffect(() => {
    if (!open) return;

    const elements = Array.from(document.body.children).filter(
      (el) => !el.hasAttribute('data-modal-portal'),
    );

    elements.forEach((el) => el.setAttribute('inert', ''));

    const style = document.documentElement.style;
    const previousOverflow = style.overflow;
    style.overflow = 'hidden';

    return () => {
      elements.forEach((el) => el.removeAttribute('inert'));
      style.overflow = previousOverflow;
      previousActiveElementRef.current?.focus();
      previousActiveElementRef.current = null;
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <ModalContext.Provider value={{ onClose, titleId }}>
      <div
        data-modal-portal
        className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none px-4">
        {children}
      </div>
    </ModalContext.Provider>,
    document.body,
  );
}

export default Modal;
export type { ModalProps };
