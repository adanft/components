import { cn } from '../../helpers/cn';
import type { TableProps } from './types';

function Table({ className, ...props }: TableProps) {
  return (
    <div className="relative w-full overflow-x-auto rounded-md border-2 border-border">
      <table
        className={cn('w-full caption-bottom border-collapse text-sm', className)}
        {...props}
      />
    </div>
  );
}

export default Table;
export type { TableProps } from './types';
