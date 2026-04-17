import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import PaginationFoot from '../components/pagination/foot';

describe('PaginationFoot', () => {
  it('renders nothing when totalPages === 0', () => {
    const { container } = render(
      <PaginationFoot
        pageIndex={0}
        pageSize={10}
        totalItems={0}
        totalPages={0}
        onPageChange={() => {}}
      />,
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders all pages without ellipsis when totalPages <= 6', () => {
    render(
      <PaginationFoot
        pageIndex={0}
        pageSize={10}
        totalItems={50}
        totalPages={5}
        onPageChange={() => {}}
      />,
    );

    for (let i = 1; i <= 5; i++) {
      expect(screen.getByRole('button', { name: `Page ${i}` })).toBeInTheDocument();
    }
    expect(screen.queryByText('…')).not.toBeInTheDocument();
  });

  it('renders first + ellipsis + window + ellipsis + last when totalPages > 6 and pageIndex is in the middle', () => {
    render(
      <PaginationFoot
        pageIndex={5}
        pageSize={10}
        totalItems={100}
        totalPages={10}
        onPageChange={() => {}}
      />,
    );

    expect(screen.getByRole('button', { name: 'Page 1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Page 5' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Page 6' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Page 7' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Page 10' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Page 3' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Page 9' })).not.toBeInTheDocument();

    const ellipses = screen.getAllByText('…');

    expect(ellipses).toHaveLength(2);
  });

  it('marks the active page button with aria-current="page"', () => {
    render(
      <PaginationFoot
        pageIndex={2}
        pageSize={10}
        totalItems={50}
        totalPages={5}
        onPageChange={() => {}}
      />,
    );

    const activeButton = screen.getByRole('button', { name: 'Page 3' });

    expect(activeButton).toHaveAttribute('aria-current', 'page');

    const inactiveButton = screen.getByRole('button', { name: 'Page 1' });

    expect(inactiveButton).not.toHaveAttribute('aria-current');
  });

  it('calls onPageChange with the correct 0-indexed page when a page button is clicked', () => {
    const onPageChange = vi.fn();

    render(
      <PaginationFoot
        pageIndex={0}
        pageSize={10}
        totalItems={50}
        totalPages={5}
        onPageChange={onPageChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Page 3' }));

    expect(onPageChange).toHaveBeenCalledTimes(1);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange(pageIndex - 1) when the prev button is clicked', () => {
    const onPageChange = vi.fn();

    render(
      <PaginationFoot
        pageIndex={3}
        pageSize={10}
        totalItems={50}
        totalPages={5}
        onPageChange={onPageChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Previous page' }));

    expect(onPageChange).toHaveBeenCalledTimes(1);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange(pageIndex + 1) when the next button is clicked', () => {
    const onPageChange = vi.fn();

    render(
      <PaginationFoot
        pageIndex={1}
        pageSize={10}
        totalItems={50}
        totalPages={5}
        onPageChange={onPageChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Next page' }));

    expect(onPageChange).toHaveBeenCalledTimes(1);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('disables the prev button when pageIndex === 0', () => {
    render(
      <PaginationFoot
        pageIndex={0}
        pageSize={10}
        totalItems={50}
        totalPages={5}
        onPageChange={() => {}}
      />,
    );

    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next page' })).not.toBeDisabled();
  });

  it('disables the next button when pageIndex === totalPages - 1', () => {
    render(
      <PaginationFoot
        pageIndex={4}
        pageSize={10}
        totalItems={50}
        totalPages={5}
        onPageChange={() => {}}
      />,
    );

    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Previous page' })).not.toBeDisabled();
  });

  it('shows the correct "Showing X–Y of Z items" range for a full page in the middle', () => {
    render(
      <PaginationFoot
        pageIndex={1}
        pageSize={10}
        totalItems={25}
        totalPages={3}
        onPageChange={() => {}}
      />,
    );

    expect(screen.getByText('Showing 11–20 of 25 items')).toBeInTheDocument();
  });

  it('clamps the range on the last partial page', () => {
    render(
      <PaginationFoot
        pageIndex={2}
        pageSize={10}
        totalItems={25}
        totalPages={3}
        onPageChange={() => {}}
      />,
    );

    expect(screen.getByText('Showing 21–25 of 25 items')).toBeInTheDocument();
  });

  it('reflects a custom label prop in the caption', () => {
    render(
      <PaginationFoot
        pageIndex={0}
        pageSize={10}
        totalItems={25}
        totalPages={3}
        onPageChange={() => {}}
        label="users"
      />,
    );

    expect(screen.getByText('Showing 1–10 of 25 users')).toBeInTheDocument();
  });

  it('exposes the nav with aria-label="Pagination"', () => {
    render(
      <PaginationFoot
        pageIndex={0}
        pageSize={10}
        totalItems={50}
        totalPages={5}
        onPageChange={() => {}}
      />,
    );

    expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
  });
});
