import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../../helpers/cn';

type TableHeadCellProps = ComponentPropsWithoutRef<'th'>;

function TableHeadCell({ className, scope = 'col', ...props }: TableHeadCellProps) {
  const headCellClassName = cn(
    'px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-brand',
    className,
  );

  return <th {...props} scope={scope} className={headCellClassName} />;
}

export default TableHeadCell;
export type { TableHeadCellProps };
