import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../../helpers/cn';

type TableProps = ComponentPropsWithoutRef<'table'>;

function Table({ className, ...props }: TableProps) {
  const tableClassName = cn('w-full', 'border-collapse', 'text-left', 'text-foreground', className);

  return <table {...props} className={tableClassName} />;
}

export default Table;
export type { TableProps };
