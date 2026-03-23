import { cn } from '../../helpers/cn';
import type { TableFootProps } from './types';

function TableFoot({ className, children, ...props }: TableFootProps) {
  return (
    <tfoot
      className={cn('bg-surface border-t border-border text-sm text-muted', className)}
      {...props}>
      {children}
    </tfoot>
  );
}

export default TableFoot;
export type { TableFootProps };
