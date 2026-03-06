import type { ComponentPropsWithoutRef } from 'react';

type TableRowProps = ComponentPropsWithoutRef<'tr'>;

function TableRow({ className, ...props }: TableRowProps) {
  const rowClassName = [
    'border-b',
    'ui-border-default',
    'last:border-b-0',
    'transition-colors',
    'ui-hover-bg-brand-soft',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <tr {...props} className={rowClassName} />;
}

export default TableRow;
export type { TableRowProps };
