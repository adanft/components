import { FloatingFocusManager, FloatingList, FloatingPortal } from '@floating-ui/react';
import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../../helpers/cn';
import { useDropdownMenuContext } from './context';

type DropdownMenuContentProps = ComponentPropsWithoutRef<'div'>;

function DropdownMenuContent({ children, className, style, ...props }: DropdownMenuContentProps) {
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
          className={cn(
            'bg-surface flex flex-col gap-2 rounded-md border border-border p-2 shadow-card outline-none',
            className,
          )}
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
