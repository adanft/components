import {
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';

import { cn } from '../../helpers/cn';
import Box from '../box';
import { useModalContext } from './context';

type ModalPanelProps = ComponentPropsWithoutRef<'div'>;

const focusableSelector = [
  '[contentEditable=true]',
  '[tabindex]',
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'iframe',
  'input:not([disabled])',
  'select:not([disabled])',
  'details>summary',
  'textarea:not([disabled])',
]
  .map((selector) => `${selector}:not([tabindex='-1'])`)
  .join(',');

function getFocusableElements(container: HTMLElement | null): HTMLElement[] {
  if (!container) return [];
  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelector))
    .filter((el) => !el.closest('[hidden]') && el.offsetParent !== null)
    .sort((a, z) =>
      Math.sign((a.tabIndex || Number.MAX_SAFE_INTEGER) - (z.tabIndex || Number.MAX_SAFE_INTEGER)),
    );
}

function ModalPanel({ onClick, onKeyDown, className, ...props }: ModalPanelProps) {
  const { titleId, onClose } = useModalContext('Panel');
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (panelRef.current?.querySelector<HTMLElement>('[data-autofocus]') ?? panelRef.current)?.focus();
  }, []);

  function handleClick(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    onClick?.(e);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') {
      onClose();
      onKeyDown?.(e);
      return;
    }

    if (e.key === 'Tab') {
      const focusable = getFocusableElements(panelRef.current);
      const active = document.activeElement;
      const first = focusable[0];
      const last = focusable.at(-1);

      if (focusable.length === 0) {
        e.preventDefault();
      } else if (e.shiftKey && (active === first || active === panelRef.current)) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && (active === last || active === panelRef.current)) {
        e.preventDefault();
        first?.focus();
      }
    }

    onKeyDown?.(e);
  }

  return (
    <Box
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      tabIndex={-1}
      className={cn('z-50 pointer-events-auto outline-none', className)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
}

export default ModalPanel;
export type { ModalPanelProps };
