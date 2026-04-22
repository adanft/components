import { cn } from '../../helpers/cn';
import type { TableCellProps } from './types';

function TableCell({ className, ...props }: TableCellProps) {
  return <td className={cn('p-4 align-middle', className)} {...props} />;
}

export default TableCell;
export type { TableCellProps } from './types';
