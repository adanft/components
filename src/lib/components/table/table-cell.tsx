import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../../helpers/cn';

type TableCellProps = ComponentPropsWithoutRef<'td'>;

function TableCell({ className, ...props }: TableCellProps) {
  const cellClassName = cn('px-4 py-3 align-middle', className);

  return <td {...props} className={cellClassName} />;
}

export default TableCell;
export type { TableCellProps };
