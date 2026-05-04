import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../../helpers/cn';

type BreadcrumbsItemProps = ComponentPropsWithoutRef<'li'>;

function BreadcrumbsItem({ children, className, ...props }: BreadcrumbsItemProps) {
  return (
    <li {...props} className={cn('inline-flex items-center gap-2', className)}>
      {children}
    </li>
  );
}

export default BreadcrumbsItem;
export type { BreadcrumbsItemProps };
