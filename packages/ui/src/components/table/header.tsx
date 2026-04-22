import { cn } from '../../helpers/cn';
import type { TableHeaderProps } from './types';

function TableHeader({ className, ...props }: TableHeaderProps) {
  return <thead className={cn('[&_tr]:border-b-2 [&_tr]:border-border', className)} {...props} />;
}

export default TableHeader;
export type { TableHeaderProps } from './types';
