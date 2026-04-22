import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '../index';

type User = { name: string; role: string };

const users: User[] = [
  { name: 'Ana Torres', role: 'Admin' },
  { name: 'Diego Ruiz', role: 'Editor' },
  { name: 'Camila Vega', role: 'Viewer' },
];

describe('Table', () => {
  it('renders the semantic root with native props and horizontal overflow wrapper', () => {
    const { container } = render(
      <Table aria-label="Users" className="custom-table">
        <tbody />
      </Table>,
    );

    const table = screen.getByRole('table', { name: 'Users' });
    const wrapper = container.firstElementChild;

    expect(wrapper?.tagName).toBe('DIV');
    expect(wrapper).toHaveClass('relative', 'w-full', 'overflow-x-auto');
    expect(table).toHaveClass(
      'w-full',
      'caption-bottom',
      'border-collapse',
      'text-sm',
      'custom-table',
    );
  });

  it('renders semantic caption, header, body, row, head, and cell elements', () => {
    render(
      <Table>
        <TableCaption>Users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead scope="col">Name</TableHead>
            <TableHead scope="col">Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Ana Torres</TableCell>
            <TableCell>Admin</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(2);
    expect(screen.getAllByRole('columnheader')).toHaveLength(2);
    expect(screen.getAllByRole('cell')).toHaveLength(2);
    expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveAttribute('scope', 'col');
  });

  it('lets each semantic part extend base styles with className', () => {
    render(
      <Table className="table-class">
        <TableCaption className="caption-class">Users</TableCaption>
        <TableHeader className="header-class">
          <TableRow className="row-class">
            <TableHead className="head-class">Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="body-class">
          <TableRow>
            <TableCell className="cell-class">Ana Torres</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter className="footer-class">
          <TableRow>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableFooter>
      </Table>,
    );

    expect(screen.getByRole('table')).toHaveClass('table-class');
    expect(screen.getByText('Users')).toHaveClass('caption-class');
    expect(screen.getByText('Name').closest('thead')).toHaveClass('header-class');
    expect(screen.getByText('Name').closest('tr')).toHaveClass('row-class');
    expect(screen.getByText('Name')).toHaveClass('head-class');
    expect(screen.getByText('Ana Torres').closest('tbody')).toHaveClass('body-class');
    expect(screen.getByText('Ana Torres')).toHaveClass('cell-class');
    expect(screen.getByText('Total').closest('tfoot')).toHaveClass('footer-class');
  });

  it('preserves footer colSpan with semantic footer cells', () => {
    render(
      <Table>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2} data-testid="foot-cell">
              Total: 3
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>,
    );

    const footCell = screen.getByTestId('foot-cell');

    expect(footCell).toHaveAttribute('colSpan', '2');
    expect(footCell.parentElement?.tagName).toBe('TR');
    expect(footCell.parentElement?.parentElement?.tagName).toBe('TFOOT');
  });

  it('renders multiple semantic rows with standard cell content', () => {
    render(
      <Table aria-label="Users">
        <TableHeader>
          <TableRow>
            <TableHead scope="col">Name</TableHead>
            <TableHead scope="col">Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.name}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>,
    );

    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Role' })).toBeInTheDocument();
    expect(screen.getByText('Ana Torres')).toBeInTheDocument();
    expect(screen.getByText('Editor')).toBeInTheDocument();
  });

  it('supports semantic parts outside the Table wrapper when needed', () => {
    render(
      <table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{users[0].name}</TableCell>
            <TableCell>{users[0].role}</TableCell>
          </TableRow>
        </TableBody>
      </table>,
    );

    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument();
    expect(screen.getByText('Ana Torres')).toBeInTheDocument();
  });
});
