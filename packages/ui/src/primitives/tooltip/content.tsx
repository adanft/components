import { FloatingPortal } from '@floating-ui/react';
import type { ComponentPropsWithoutRef } from 'react';

import { useTooltipContext } from './context';

type TooltipContentProps = ComponentPropsWithoutRef<'div'>;

function TooltipContent({ children, style, ...props }: TooltipContentProps) {
  const { floatingStyles, getFloatingProps, open, setFloating } = useTooltipContext('Content');

  if (!open) {
    return null;
  }

  return (
    <FloatingPortal>
      <div ref={setFloating} style={{ ...floatingStyles, ...style }} {...getFloatingProps(props)}>
        {children}
      </div>
    </FloatingPortal>
  );
}

export default TooltipContent;
export type { TooltipContentProps };
