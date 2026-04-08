import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import PaginationHead from '../components/pagination/head';

describe('PaginationHead', () => {
  it('renders capitalized label and total count', () => {
    render(<PaginationHead pageSize={10} totalItems={42} onChange={() => {}} />);

    expect(screen.getByText(/Items per page:/)).toBeInTheDocument();
    expect(screen.getByText('Total 42 items')).toBeInTheDocument();
  });

  it('renders all default page size options', () => {
    render(<PaginationHead pageSize={10} totalItems={42} onChange={() => {}} />);

    const options = screen.getAllByRole('option');

    expect(options).toHaveLength(4);
    expect(options.map((option) => option.textContent)).toEqual(['5', '10', '20', '50']);
  });

  it('reflects current pageSize as the selected value', () => {
    render(<PaginationHead pageSize={20} totalItems={100} onChange={() => {}} />);

    const select = screen.getByRole('combobox') as HTMLSelectElement;

    expect(select.value).toBe('20');
  });

  it('calls onChange with { pageSize: <new>, pageIndex: 0 } when user selects a new size', () => {
    const onChange = vi.fn();

    render(<PaginationHead pageSize={10} totalItems={42} onChange={onChange} />);

    fireEvent.change(screen.getByRole('combobox'), { target: { value: '20' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith({ pageSize: 20, pageIndex: 0 });
  });

  it('respects custom pageSizeOptions prop', () => {
    render(
      <PaginationHead
        pageSize={25}
        totalItems={100}
        onChange={() => {}}
        pageSizeOptions={[15, 25, 100]}
      />,
    );

    const options = screen.getAllByRole('option');

    expect(options.map((option) => option.textContent)).toEqual(['15', '25', '100']);
  });

  it('respects custom label prop and capitalizes it', () => {
    render(<PaginationHead pageSize={10} totalItems={3} onChange={() => {}} label="users" />);

    expect(screen.getByText(/Users per page:/)).toBeInTheDocument();
    expect(screen.getByText('Total 3 users')).toBeInTheDocument();
  });

  it('links label to select via htmlFor/id', () => {
    render(<PaginationHead pageSize={10} totalItems={42} onChange={() => {}} />);

    const select = screen.getByRole('combobox');
    const id = select.getAttribute('id');

    expect(id).toBeTruthy();

    const label = document.querySelector(`label[for="${id}"]`);

    expect(label).not.toBeNull();
  });

  it('exposes an accessible name on the select via aria-label', () => {
    render(<PaginationHead pageSize={10} totalItems={42} onChange={() => {}} label="users" />);

    expect(screen.getByRole('combobox', { name: 'Users per page' })).toBeInTheDocument();
  });

  it('forwards extra props like className and id to the wrapper div', () => {
    const { container } = render(
      <PaginationHead
        pageSize={10}
        totalItems={42}
        onChange={() => {}}
        className="custom-wrapper"
        id="my-pagination-head"
      />,
    );

    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper.tagName).toBe('DIV');
    expect(wrapper).toHaveClass('custom-wrapper');
  });

  it('parses the select value as a base-10 integer', () => {
    const onChange = vi.fn();

    render(
      <PaginationHead
        pageSize={5}
        totalItems={100}
        onChange={onChange}
        pageSizeOptions={[5, 50]}
      />,
    );

    fireEvent.change(screen.getByRole('combobox'), { target: { value: '50' } });

    expect(onChange).toHaveBeenCalledWith({ pageSize: 50, pageIndex: 0 });
    expect(typeof onChange.mock.calls[0][0].pageSize).toBe('number');
  });
});
