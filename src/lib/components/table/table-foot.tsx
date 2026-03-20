import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../../helpers/cn';

type TableFootProps = ComponentPropsWithoutRef<'tfoot'>;

function TableFoot({ className, ...props }: TableFootProps) {
  const footClassName = cn('border-t', 'border-border', className);

  return <tfoot {...props} className={footClassName} />;
}

export default TableFoot;
export type { TableFootProps };
