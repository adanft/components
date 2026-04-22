import { cn } from '../../helpers/cn';
import type { TableBodyProps } from './types';

function TableBody({ className, ...props }: TableBodyProps) {
  return <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props} />;
}

export default TableBody;
export type { TableBodyProps } from './types';
