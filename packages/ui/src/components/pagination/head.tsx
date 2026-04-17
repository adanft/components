import { type ComponentPropsWithoutRef, useId } from 'react';

import { cn } from '../../helpers/cn';

type PaginationHeadProps = ComponentPropsWithoutRef<'div'> & {
  pageSize: number;
  totalItems: number;
  onPaginationChange: (next: { pageSize: number; pageIndex: number }) => void;
  label?: string;
  pageSizeOptions?: number[];
};

const DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

function capitalize(value: string) {
  if (value.length === 0) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

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
  const capitalizedLabel = capitalize(label);

  return (
    <div {...props} className={cn('flex justify-between text-sm font-medium', className)}>
      <label htmlFor={selectId} className="text-foreground">
        {capitalizedLabel} per page:{' '}
        <select
          id={selectId}
          aria-label={`${capitalizedLabel} per page`}
          className="cursor-pointer bg-background text-foreground outline-none"
          onChange={(event) => {
            onPaginationChange({
              pageSize: parseInt(event.target.value, 10),
              pageIndex: 0,
            });
          }}
          value={pageSize}>
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </label>
      <span className="text-muted">
        Total {totalItems} {label}
      </span>
    </div>
  );
}

export default PaginationHead;
export type { PaginationHeadProps };
