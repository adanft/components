import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../../helpers/cn';

type DropdownMenuSeparatorProps = ComponentPropsWithoutRef<'hr'>;

function DropdownMenuSeparator({ className, ...props }: DropdownMenuSeparatorProps) {
  return <hr className={cn('my-1 border-border', className)} {...props} />;
}

export type { DropdownMenuSeparatorProps };
export default DropdownMenuSeparator;
