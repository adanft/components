import { type ComponentPropsWithoutRef, useId } from 'react';

import { cn } from '../../helpers/cn';
import Select from '../select';

type PaginationHeadProps = ComponentPropsWithoutRef<'div'> & {
  pageSize: number;
  totalItems: number;
  onPaginationChange: (next: { pageSize: number; pageIndex: number }) => void;
  label?: string;
  pageSizeOptions?: number[];
};

const DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

function PaginationHead({
  className,
  id,
  label = 'items',
  onPaginationChange,
  pageSize,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  totalItems,
  ...props
}: PaginationHeadProps) {
  const autoId = useId();
  const selectId = id ?? autoId;

  return (
    <div
      {...props}
      className={cn('flex flex-wrap items-center justify-between text-sm font-medium', className)}>
      <label htmlFor={selectId} className="flex items-center gap-2 text-foreground">
        <span className="text-nowrap">{label} per page:</span>
        <Select
          id={selectId}
          aria-label={`${label} per page`}
          onChange={(event) => {
            onPaginationChange({
              pageSize: Number.parseInt(event.target.value, 10),
              pageIndex: 0,
            });
          }}
          value={pageSize}>
          {pageSizeOptions.map((pageSizeOption) => (
            <option key={pageSizeOption} value={pageSizeOption}>
              {pageSizeOption}
            </option>
          ))}
        </Select>
      </label>
      <span className="text-muted">
        Total {totalItems} {label}
      </span>
    </div>
  );
}

export default PaginationHead;
export type { PaginationHeadProps };
