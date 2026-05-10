import TableBody from './body';
import TableCaption from './caption';
import TableCell from './cell';
import TableFooter from './footer';
import TableHead from './head';
import TableHeader from './header';
import TableRow from './row';
import TableRoot from './table';

const Table = Object.assign(TableRoot, {
  Body: TableBody,
  Caption: TableCaption,
  Cell: TableCell,
  Footer: TableFooter,
  Head: TableHead,
  Header: TableHeader,
  Row: TableRow,
});

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
