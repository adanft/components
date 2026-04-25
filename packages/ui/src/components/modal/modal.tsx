import { FloatingFocusManager, useFloating } from '@floating-ui/react';
import { type ReactNode, useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';

import { ModalContext } from './context';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

let scrollLockCount = 0;
let previousDocumentOverflow = '';

function lockDocumentScroll() {
  const style = document.documentElement.style;

  if (scrollLockCount === 0) {
    previousDocumentOverflow = style.overflow;
    style.overflow = 'hidden';
  }

  scrollLockCount += 1;

  return () => {
    scrollLockCount = Math.max(0, scrollLockCount - 1);

    if (scrollLockCount === 0) {
      style.overflow = previousDocumentOverflow;
      previousDocumentOverflow = '';
    }
  };
}

function Modal({ open, onClose, children }: ModalProps) {
  const titleId = `modal-title-${useId()}`;
  const initialFocusRef = useRef<HTMLElement | null>(null);
  const { context: floatingContext, refs } = useFloating({
    open,
    onOpenChange(nextOpen) {
      if (!nextOpen) onClose();
    },
  });

  useEffect(() => {
    if (!open) return;

    const unlockDocumentScroll = lockDocumentScroll();

    return () => {
      unlockDocumentScroll();
      initialFocusRef.current = null;
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <ModalContext.Provider value={{ initialFocusRef, onClose, titleId }}>
      <FloatingFocusManager
        context={floatingContext}
        initialFocus={initialFocusRef}
        modal
        outsideElementsInert
        returnFocus>
        <div
          ref={refs.setFloating}
          data-modal-portal
          className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none px-4">
          {children}
        </div>
      </FloatingFocusManager>
    </ModalContext.Provider>,
    document.body,
  );
}

export default Modal;
export type { ModalProps };
