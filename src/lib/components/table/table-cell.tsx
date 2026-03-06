import type { ComponentPropsWithoutRef } from 'react';

type TableCellProps = ComponentPropsWithoutRef<'td'>;

function TableCell({ className, ...props }: TableCellProps) {
  const cellClassName = ['px-4', 'py-3', 'align-middle', className].filter(Boolean).join(' ');

  return <td {...props} className={cellClassName} />;
}

export default TableCell;
export type { TableCellProps };
