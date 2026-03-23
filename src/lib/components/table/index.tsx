import { cn } from '../../helpers/cn';
import TableBody from './body';
import TableFoot from './foot';
import TableHead from './head';
import type { TableProps } from './types';

function TableRoot({ className, ...props }: TableProps) {
  return (
    <div className="w-full overflow-hidden rounded-md border border-border">
      <table className={cn('w-full border-collapse', className)} {...props} />
    </div>
  );
}

const Table = Object.assign(TableRoot, { Head: TableHead, Body: TableBody, Foot: TableFoot });

export default Table;
export type { TableBodyProps, TableFootProps, TableHeadProps, TableProps } from './types';
