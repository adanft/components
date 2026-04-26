import type { ComponentPropsWithoutRef, KeyboardEvent, MouseEvent } from 'react';

import { cn } from '../../helpers/cn';
import Box from '../box';
import { useModalContext } from './context';

type ModalPanelProps = ComponentPropsWithoutRef<'div'>;

function ModalPanel({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  onClick,
  onKeyDown,
  className,
  ...props
}: ModalPanelProps) {
  const { initialFocusRef, titleId, onClose } = useModalContext('Panel');
  const accessibleNameProps = ariaLabelledBy
    ? { 'aria-labelledby': ariaLabelledBy }
    : { 'aria-labelledby': ariaLabel ? undefined : titleId, 'aria-label': ariaLabel };

  function setInitialFocus(node: HTMLDivElement | null) {
    initialFocusRef.current = node?.querySelector<HTMLElement>('[data-autofocus]') ?? node;
  }

  function handleClick(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    onClick?.(e);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(e);

    if (e.defaultPrevented) {
      return;
    }

    if (e.key === 'Escape') {
      onClose();
    }
  }

  return (
    <Box
      {...props}
      ref={setInitialFocus}
      role="dialog"
      aria-modal="true"
      {...accessibleNameProps}
      tabIndex={-1}
      className={cn('z-50 pointer-events-auto outline-none', className)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    />
  );
}

export default ModalPanel;
export type { ModalPanelProps };
