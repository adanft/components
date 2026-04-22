import { cn } from '../../helpers/cn';
import TableBody from './body';
import TableCaption from './caption';
import TableCell from './cell';
import TableFooter from './footer';
import TableHeader from './header';
import TableRow from './row';
import TableHead from './table-head';
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
export type {
  TableBodyProps,
  TableCaptionProps,
  TableCellProps,
  TableFooterProps,
  TableHeaderProps,
  TableHeadProps,
  TableProps,
  TableRowProps,
} from './types';
export { TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow };
