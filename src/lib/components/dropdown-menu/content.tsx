import { FloatingFocusManager, FloatingList, FloatingPortal } from '@floating-ui/react';
import type { ComponentPropsWithoutRef } from 'react';

import { useDropdownMenuContext } from './context';

type DropdownMenuContentProps = ComponentPropsWithoutRef<'div'>;

function DropdownMenuContent({ children, style, ...props }: DropdownMenuContentProps) {
  const { context, floatingStyles, getFloatingProps, labelsRef, listRef, open, setFloating } =
    useDropdownMenuContext('Content');

  if (!open) {
    return null;
  }

  return (
    <FloatingPortal>
      <FloatingFocusManager context={context} modal={false} returnFocus>
        <div
          ref={setFloating}
          data-state={open ? 'open' : 'closed'}
          style={{ ...floatingStyles, ...style }}
          {...getFloatingProps(props)}>
          <FloatingList elementsRef={listRef} labelsRef={labelsRef}>
            {children}
          </FloatingList>
        </div>
      </FloatingFocusManager>
    </FloatingPortal>
  );
}

export type { DropdownMenuContentProps };
export default DropdownMenuContent;
