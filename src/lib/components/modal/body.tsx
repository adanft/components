import { useEffect, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { useModalContext } from './context';
import { cn } from '../../helpers/cn';

type ModalBodyProps = ComponentPropsWithoutRef<'div'> & { closeIcon: ReactNode };

function ModalBody({ children, className, closeIcon, ...props }: ModalBodyProps) {
  const { open, setOpen } = useModalContext('Modal.Body');

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.body.classList.add('overflow-hidden');
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, setOpen]);

  if (!open) {
    return null;
  }

  const bodyClassName = cn('rounded-md', 'bg-surface', 'p-4', 'relative', className);

  return createPortal(
    <div className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-black/50 backdrop-blur-xs">
      <div {...props} className={bodyClassName}>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="cursor-pointer absolute top-4 right-4 leading-none">
          {closeIcon}
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}

export default ModalBody;
export type { ModalBodyProps };
