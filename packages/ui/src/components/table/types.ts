import type { ComponentPropsWithoutRef, Key, ReactNode } from 'react';

type TableProps = ComponentPropsWithoutRef<'table'>;

type TableHeadProps<THeader> = ComponentPropsWithoutRef<'thead'> & {
  headers: readonly THeader[];
  renderHeader: (header: THeader, index: number) => ReactNode;
  getHeaderKey?: (header: THeader, index: number) => Key;
};

type TableBodyProps<TRow, TCell> = ComponentPropsWithoutRef<'tbody'> & {
  rows: readonly TRow[];
  getRowKey: (row: TRow, index: number) => Key;
  getRowCells: (row: TRow, rowIndex: number) => readonly TCell[];
  renderCell: (cell: TCell, row: TRow, rowIndex: number, cellIndex: number) => ReactNode;
  getCellKey?: (cell: TCell, row: TRow, rowIndex: number, cellIndex: number) => Key;
  striped?: boolean;
};

type TableFootProps = ComponentPropsWithoutRef<'tfoot'>;

export type { TableBodyProps, TableFootProps, TableHeadProps, TableProps };
