import { cn } from '../../helpers/cn';
import type { TableRowProps } from './types';

function TableRow({ className, ...props }: TableRowProps) {
  return <tr className={cn('border-b border-border', className)} {...props} />;
}

export default TableRow;
export type { TableRowProps } from './types';
