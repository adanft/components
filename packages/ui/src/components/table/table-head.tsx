import { cn } from '../../helpers/cn';
import type { TableHeadProps } from './types';

function TableHead({ className, ...props }: TableHeadProps) {
  return (
    <th
      className={cn('h-10 px-4 text-left align-middle font-medium text-heading', className)}
      {...props}
    />
  );
}

export default TableHead;
export type { TableHeadProps } from './types';
