import { FloatingFocusManager, FloatingPortal } from '@floating-ui/react';
import type { ComponentPropsWithoutRef } from 'react';

import { usePopoverContext } from './context';

type PopoverContentProps = ComponentPropsWithoutRef<'div'>;

function PopoverContent({ children, style, ...props }: PopoverContentProps) {
  const { context, floatingStyles, getFloatingProps, open, setFloating } =
    usePopoverContext('Content');

  if (!open) {
    return null;
  }

  return (
    <FloatingPortal>
      <FloatingFocusManager context={context} modal={false}>
        <div ref={setFloating} style={{ ...floatingStyles, ...style }} {...getFloatingProps(props)}>
          {children}
        </div>
      </FloatingFocusManager>
    </FloatingPortal>
  );
}

export default PopoverContent;
export type { PopoverContentProps };
