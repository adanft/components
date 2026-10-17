import { type ComponentPropsWithoutRef, useId } from 'react';

import { cn } from '../../helpers/cn';
import Select from '../select';

type PaginationHeadProps = ComponentPropsWithoutRef<'div'> & {
  pageSize: number;
  totalItems: number;
  onPaginationChange: (next: { pageSize: number; pageIndex: number }) => void;
  label?: string;
  messages?: {
    perPage?: (label: string) => string;
    total?: (count: number, label: string) => string;
  };
  pageSizeOptions?: number[];
};

const DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

function PaginationHead({
  className,
  id,
  label = 'items',
  messages,
  onPaginationChange,
  pageSize,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  totalItems,
  ...props
}: PaginationHeadProps) {
  const autoId = useId();
  const selectId = id ?? autoId;
  const perPageText = messages?.perPage?.(label) ?? `${label} per page:`;

  return (
    <div
      {...props}
      className={cn('flex flex-wrap items-center justify-between text-sm font-medium', className)}>
      <label htmlFor={selectId} className="flex items-center gap-2 text-foreground">
        <span className="text-nowrap">{perPageText}</span>
        <Select
          id={selectId}
          aria-label={messages?.perPage ? perPageText : `${label} per page`}
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
        {messages?.total?.(totalItems, label) ?? `Total ${totalItems} ${label}`}
      </span>
    </div>
  );
}

export default PaginationHead;
export type { PaginationHeadProps };
