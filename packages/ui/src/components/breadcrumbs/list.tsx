import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../../helpers/cn';

type BreadcrumbsListProps = ComponentPropsWithoutRef<'ol'>;

function BreadcrumbsList({ className, ...props }: BreadcrumbsListProps) {
  return <ol {...props} className={cn('flex flex-wrap items-center gap-2', className)} />;
}

export default BreadcrumbsList;
export type { BreadcrumbsListProps };
