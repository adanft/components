import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../../helpers/cn';

type BreadcrumbsProps = ComponentPropsWithoutRef<'nav'>;

function BreadcrumbsRoot({
  'aria-label': ariaLabel = 'Breadcrumb',
  children,
  className,
  ...props
}: BreadcrumbsProps) {
  return (
    <nav {...props} aria-label={ariaLabel} className={cn('text-sm text-muted', className)}>
      {children}
    </nav>
  );
}

export default BreadcrumbsRoot;
export type { BreadcrumbsProps };
