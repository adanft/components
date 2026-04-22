import type { ComponentPropsWithoutRef } from 'react';

type TableProps = ComponentPropsWithoutRef<'table'>;
type TableCaptionProps = ComponentPropsWithoutRef<'caption'>;
type TableHeaderProps = ComponentPropsWithoutRef<'thead'>;
type TableBodyProps = ComponentPropsWithoutRef<'tbody'>;
type TableFooterProps = ComponentPropsWithoutRef<'tfoot'>;
type TableRowProps = ComponentPropsWithoutRef<'tr'>;
type TableHeadProps = ComponentPropsWithoutRef<'th'>;
type TableCellProps = ComponentPropsWithoutRef<'td'>;

export type {
  TableBodyProps,
  TableCaptionProps,
  TableCellProps,
  TableFooterProps,
  TableHeaderProps,
  TableHeadProps,
  TableProps,
  TableRowProps,
};
