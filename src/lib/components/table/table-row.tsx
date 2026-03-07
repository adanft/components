import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../../helpers/cn';

type TableRowProps = ComponentPropsWithoutRef<'tr'>;

function TableRow({ className, ...props }: TableRowProps) {
  const rowClassName = cn(
    'border-b',
    'ui-border-default',
    'last:border-b-0',
    'transition-colors',
    'ui-hover-bg-brand-soft',
    className,
  );

  return <tr {...props} className={rowClassName} />;
}

export default TableRow;
export type { TableRowProps };
