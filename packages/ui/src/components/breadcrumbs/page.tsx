import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../../helpers/cn';

type BreadcrumbsPageProps = ComponentPropsWithoutRef<'span'>;

function BreadcrumbsPage({ className, ...props }: BreadcrumbsPageProps) {
  return (
    <span {...props} aria-current="page" className={cn('font-medium text-heading', className)} />
  );
}

export default BreadcrumbsPage;
export type { BreadcrumbsPageProps };
