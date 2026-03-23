import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Table } from '../index';

type User = { id: number; name: string; role: string };

const users: User[] = [
  { id: 1, name: 'Ana Torres', role: 'Admin' },
  { id: 2, name: 'Diego Ruiz', role: 'Editor' },
  { id: 3, name: 'Camila Vega', role: 'Viewer' },
  { id: 4, name: 'Luis Mora', role: 'Editor' },
  { id: 5, name: 'Sara Lima', role: 'Admin' },
];

const headers = [
  { id: 'name', label: 'Name' },
  { id: 'role', label: 'Role' },
] as const;

function TanStackAdapterTable() {
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => <strong>{row.original.name}</strong>,
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => row.original.role,
    },
  ];

  const table = useReactTable({
    data: users.slice(0, 2),
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table aria-label="TanStack users">
      <Table.Head
        headers={table.getFlatHeaders()}
        getHeaderKey={(header) => header.id}
        renderHeader={(header) => flexRender(header.column.columnDef.header, header.getContext())}
      />
      <Table.Body
        rows={table.getRowModel().rows}
        getRowKey={(row) => row.id}
        getRowCells={(row) => row.getVisibleCells()}
        getCellKey={(cell) => cell.id}
        renderCell={(cell) => flexRender(cell.column.columnDef.cell, cell.getContext())}
      />
    </Table>
  );
}

describe('Table', () => {
  it('renders the semantic root with native props', () => {
    const { container } = render(
      <Table aria-label="Users" className="custom-table">
        <tbody />
      </Table>,
    );

    const table = screen.getByRole('table', { name: 'Users' });
    const wrapper = container.firstElementChild;

    expect(wrapper?.tagName).toBe('DIV');
    expect(wrapper).toHaveClass('border', 'border-border', 'rounded-md', 'overflow-hidden');
    expect(table).toHaveClass('w-full', 'border-collapse', 'custom-table');
  });

  it('renders headers via headers and renderHeader', () => {
    render(
      <Table>
        <Table.Head
          headers={headers}
          getHeaderKey={(header) => header.id}
          renderHeader={(header) => header.label}
        />
      </Table>,
    );

    const columnHeaders = screen.getAllByRole('columnheader');

    expect(columnHeaders).toHaveLength(2);
    expect(columnHeaders[0]).toHaveTextContent('Name');
    expect(columnHeaders[1]).toHaveTextContent('Role');
    expect(columnHeaders[0]).toHaveAttribute('scope', 'col');
  });

  it('renders rows and cells via rows, getRowCells, and renderCell', () => {
    render(
      <Table>
        <Table.Body
          rows={users.slice(0, 2)}
          getRowKey={(row) => row.id}
          getRowCells={(row) => [row.name, row.role]}
          renderCell={(cell) => cell}
        />
      </Table>,
    );

    const rows = screen.getAllByRole('row');
    const cells = screen.getAllByRole('cell');

    expect(rows).toHaveLength(2);
    expect(cells).toHaveLength(4);
    expect(cells[0]).toHaveTextContent('Ana Torres');
    expect(cells[3]).toHaveTextContent('Editor');
  });

  it('applies striped styling in Table.Body', () => {
    render(
      <Table>
        <Table.Body
          rows={users.slice(0, 3)}
          getRowKey={(row) => row.id}
          getRowCells={(row) => [row.name]}
          renderCell={(cell) => cell}
          striped
        />
      </Table>,
    );

    const rows = screen.getAllByRole('row');

    expect(rows).toHaveLength(3);
    for (const row of rows) {
      expect(row).toHaveClass('even:bg-subtle/50');
    }
  });

  it('preserves footer colSpan with manual rows', () => {
    render(
      <Table>
        <Table.Foot>
          <tr>
            <td colSpan={2} data-testid="foot-cell">
              Total: 5
            </td>
          </tr>
        </Table.Foot>
      </Table>,
    );

    const footCell = screen.getByTestId('foot-cell');

    expect(footCell).toHaveAttribute('colSpan', '2');
    expect(footCell.parentElement?.tagName).toBe('TR');
    expect(footCell.parentElement?.parentElement?.tagName).toBe('TFOOT');
  });

  it('renders a TanStack adapter flow with getFlatHeaders and getVisibleCells', () => {
    render(<TanStackAdapterTable />);

    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Role' })).toBeInTheDocument();
    expect(screen.getByText('Ana Torres')).toBeInTheDocument();
    expect(screen.getByText('Editor')).toBeInTheDocument();
  });

  it('does not require context or providers for compound parts', () => {
    render(
      <table>
        <Table.Head headers={headers} renderHeader={(header) => header.label} />
        <Table.Body
          rows={users.slice(0, 1)}
          getRowKey={(row) => row.id}
          getRowCells={(row) => [row.name, row.role]}
          renderCell={(cell) => cell}
        />
      </table>,
    );

    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument();
    expect(screen.getByText('Ana Torres')).toBeInTheDocument();
  });
});
