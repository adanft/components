import { FloatingFocusManager, useFloating } from '@floating-ui/react';
import { type ReactNode, useCallback, useEffect, useId, useRef, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

import { ModalContext } from './context';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

let scrollLockCount = 0;
let previousDocumentOverflow = '';

const subscribeToClientEnvironment = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function useIsClient() {
  return useSyncExternalStore(subscribeToClientEnvironment, getClientSnapshot, getServerSnapshot);
}

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
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const lastFloatingNodeRef = useRef<WeakRef<HTMLDivElement> | null>(null);
  const isClient = useIsClient();
  const { context: floatingContext, refs } = useFloating({
    open,
    onOpenChange(nextOpen) {
      if (!nextOpen) onClose();
    },
  });

  const setFloating = useCallback(
    (node: HTMLDivElement | null) => {
      // Capture before autofocus, once per opening, not on same-node ref reattachment.
      // Keep the target through detachment so Floating UI can restore it on cleanup.
      if (node && node !== lastFloatingNodeRef.current?.deref()) {
        lastFloatingNodeRef.current = new WeakRef(node);
        const activeElement = node.ownerDocument.activeElement;
        const HTMLElementClass = node.ownerDocument.defaultView?.HTMLElement;
        returnFocusRef.current =
          HTMLElementClass && activeElement instanceof HTMLElementClass ? activeElement : null;
      }
      refs.setFloating(node);
    },
    [refs.setFloating],
  );

  useEffect(() => {
    if (!open) return;

    const unlockDocumentScroll = lockDocumentScroll();

    return () => {
      unlockDocumentScroll();
      initialFocusRef.current = null;
    };
  }, [open]);

  if (!open || !isClient) return null;

  return createPortal(
    <ModalContext.Provider value={{ initialFocusRef, onClose, titleId }}>
      <FloatingFocusManager
        context={floatingContext}
        initialFocus={initialFocusRef}
        modal
        outsideElementsInert
        returnFocus={returnFocusRef}>
        <div
          ref={setFloating}
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
