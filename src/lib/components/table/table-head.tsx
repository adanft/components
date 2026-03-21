import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../../helpers/cn';

type TableHeadProps = ComponentPropsWithoutRef<'thead'>;

function TableHead({ className, ...props }: TableHeadProps) {
  const headClassName = cn('border-b border-border', className);

  return <thead {...props} className={headClassName} />;
}

export default TableHead;
export type { TableHeadProps };
