import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../../helpers/cn';

type TableRowProps = ComponentPropsWithoutRef<'tr'>;

function TableRow({ className, ...props }: TableRowProps) {
  const rowClassName = cn(
    'border-b',
    'border-border',
    'last:border-b-0',
    'transition-colors',
    'hover:bg-brand/10',
    className,
  );

  return <tr {...props} className={rowClassName} />;
}

export default TableRow;
export type { TableRowProps };
