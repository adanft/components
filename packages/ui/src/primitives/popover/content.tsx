import { FloatingFocusManager, FloatingPortal } from '@floating-ui/react';
import type { ComponentPropsWithoutRef } from 'react';

import { usePopoverContext } from './context';

type PopoverContentProps = ComponentPropsWithoutRef<'div'>;

function PopoverContent({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  children,
  style,
  ...props
}: PopoverContentProps) {
  const { contentRole, context, floatingStyles, getFloatingProps, open, setFloating } =
    usePopoverContext('Content');

  if (!open) {
    return null;
  }

  const hasAccessibleName =
    (typeof ariaLabel === 'string' && ariaLabel.trim().length > 0) ||
    (typeof ariaLabelledby === 'string' && ariaLabelledby.trim().length > 0);

  if (contentRole === 'dialog' && !hasAccessibleName) {
    throw new Error(
      '<Popover.Content> requires aria-label or aria-labelledby when Popover uses role="dialog".',
    );
  }

  return (
    <FloatingPortal>
      <FloatingFocusManager context={context} modal={false}>
        <div
          ref={setFloating}
          style={{ ...floatingStyles, ...style }}
          {...getFloatingProps({
            ...props,
            'aria-label': ariaLabel,
            'aria-labelledby': ariaLabelledby,
          })}>
          {children}
        </div>
      </FloatingFocusManager>
    </FloatingPortal>
  );
}

export default PopoverContent;
export type { PopoverContentProps };
