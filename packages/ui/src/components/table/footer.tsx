import { cn } from '../../helpers/cn';
import type { TableFooterProps } from './types';

function TableFooter({ className, ...props }: TableFooterProps) {
  return (
    <tfoot
      className={cn(
        'border-t border-border bg-surface/50 font-medium [&>tr]:last:border-b-0',
        className,
      )}
      {...props}
    />
  );
}

export default TableFooter;
export type { TableFooterProps } from './types';
