import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../../helpers/cn';
import { ChevronRightIcon } from '../../icons';

type BreadcrumbsSeparatorProps = ComponentPropsWithoutRef<'li'>;

function BreadcrumbsSeparator({ children, className, ...props }: BreadcrumbsSeparatorProps) {
  return (
    <li
      {...props}
      aria-hidden="true"
      role="presentation"
      className={cn('inline-flex items-center text-muted', className)}>
      {children ?? <ChevronRightIcon className="size-4" />}
    </li>
  );
}

export default BreadcrumbsSeparator;
export type { BreadcrumbsSeparatorProps };
