import type { ComponentPropsWithoutRef } from 'react';

type TableHeadCellProps = ComponentPropsWithoutRef<'th'>;

function TableHeadCell({ className, scope = 'col', ...props }: TableHeadCellProps) {
  const headCellClassName = [
    'px-4',
    'py-3',
    'text-xs',
    'font-semibold',
    'uppercase',
    'tracking-[0.12em]',
    'ui-text-brand',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <th {...props} scope={scope} className={headCellClassName} />;
}

export default TableHeadCell;
export type { TableHeadCellProps };
