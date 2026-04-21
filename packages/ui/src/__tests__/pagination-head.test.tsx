import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { PaginationHead } from '../index';

describe('PaginationHead', () => {
  it('renders the label and total count', () => {
    render(
      <PaginationHead
        pageSize={10}
        totalItems={125}
        onPaginationChange={() => undefined}
        label="items"
      />,
    );

    expect(screen.getByText('items per page:')).toBeInTheDocument();
    expect(screen.getByText('Total 125 items')).toBeInTheDocument();
  });

  it('uses the shared Select base contract', () => {
    render(
      <PaginationHead
        pageSize={10}
        totalItems={125}
        onPaginationChange={() => undefined}
        label="items"
      />,
    );

    const select = screen.getByRole('combobox', { name: 'items per page' });

    expect(select).toHaveClass(
      'w-full',
      'appearance-none',
      'rounded-md',
      'border',
      'border-border',
      'bg-background',
      'px-3',
      'py-2',
      'pr-10',
      'text-foreground',
    );
  });

  it('resets pageIndex when the page size changes', () => {
    const onPaginationChange = vi.fn();

    render(
      <PaginationHead
        pageSize={10}
        totalItems={125}
        onPaginationChange={onPaginationChange}
        pageSizeOptions={[10, 20, 50]}
      />,
    );

    fireEvent.change(screen.getByRole('combobox', { name: 'items per page' }), {
      target: { value: '20' },
    });

    expect(onPaginationChange).toHaveBeenCalledWith({ pageIndex: 0, pageSize: 20 });
  });
});
