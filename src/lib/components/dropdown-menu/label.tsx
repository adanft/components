import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../../helpers/cn';

type DropdownMenuLabelProps = ComponentPropsWithoutRef<'div'>;

function DropdownMenuLabel({ className, ...props }: DropdownMenuLabelProps) {
  return (
    <div
      className={cn(
        'px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted',
        className,
      )}
      {...props}
    />
  );
}

export type { DropdownMenuLabelProps };
export default DropdownMenuLabel;
