import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../../helpers/cn';

export type PaginationFootProps = ComponentPropsWithoutRef<'div'> & {
  pageIndex: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  onPageChange: (pageIndex: number) => void;
  label?: string;
};

const ELLIPSIS = -1;

function getPageNumbers(pageIndex: number, totalPages: number): number[] {
  const pages: number[] = [];

  if (totalPages <= 6) {
    for (let i = 0; i < totalPages; i++) pages.push(i);
    return pages;
  }

  pages.push(0);
  if (pageIndex > 2) pages.push(ELLIPSIS);

  const start = Math.max(1, pageIndex - 1);
  const end = Math.min(totalPages - 2, pageIndex + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (pageIndex < totalPages - 3) pages.push(ELLIPSIS);
  pages.push(totalPages - 1);

  return pages;
}

const baseButtonClasses =
  'inline-flex size-10 cursor-pointer items-center justify-center rounded-md';

const arrowButtonClasses = cn(
  baseButtonClasses,
  'border border-transparent text-foreground',
  'hover:border-border hover:bg-surface hover:shadow-sm',
  'disabled:cursor-not-allowed disabled:text-muted disabled:hover:border-transparent disabled:hover:bg-transparent disabled:hover:shadow-none',
);

const pageButtonClasses = cn(
  baseButtonClasses,
  'border border-border bg-surface text-foreground shadow-sm',
);

function PaginationFoot({
  className,
  label = 'items',
  onPageChange,
  pageIndex,
  pageSize,
  totalItems,
  totalPages,
  ...props
}: PaginationFootProps) {
  if (totalPages === 0) return null;

  const canPrev = pageIndex > 0;
  const canNext = pageIndex < totalPages - 1;

  const pages = getPageNumbers(pageIndex, totalPages);

  const rangeStart = pageIndex * pageSize + 1;
  const rangeEnd = Math.min((pageIndex + 1) * pageSize, totalItems);

  return (
    <div
      {...props}
      className={cn('flex items-center justify-between text-sm font-medium', className)}>
      <nav aria-label="Pagination">
        <ul className="flex items-center gap-2">
          <li>
            <button
              type="button"
              aria-label="Previous page"
              disabled={!canPrev}
              onClick={() => onPageChange(pageIndex - 1)}
              className={arrowButtonClasses}>
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
          </li>
          {pages.map((page, idx) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: ellipsis sentinel (-1) can appear twice; composite key disambiguates positions
            <li key={`${page}-${idx}`}>
              {page === ELLIPSIS ? (
                <span
                  aria-hidden="true"
                  className="inline-flex size-10 items-center justify-center text-muted">
                  …
                </span>
              ) : (
                <button
                  type="button"
                  aria-label={`Page ${page + 1}`}
                  aria-current={pageIndex === page ? 'page' : undefined}
                  onClick={() => onPageChange(page)}
                  className={cn(pageButtonClasses, pageIndex === page && 'bg-brand text-white')}>
                  {page + 1}
                </button>
              )}
            </li>
          ))}
          <li>
            <button
              type="button"
              aria-label="Next page"
              disabled={!canNext}
              onClick={() => onPageChange(pageIndex + 1)}
              className={arrowButtonClasses}>
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </li>
        </ul>
      </nav>
      <p className="text-muted">
        Showing {rangeStart}–{rangeEnd} of {totalItems} {label}
      </p>
    </div>
  );
}

export default PaginationFoot;
