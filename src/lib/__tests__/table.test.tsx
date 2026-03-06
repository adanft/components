import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFoot,
  TableHead,
  TableHeadCell,
  TableRow,
} from '../index';

describe('Table primitives', () => {
  it('renders semantic table sections and cells', () => {
    render(
      <Table data-testid="table">
        <TableCaption>Monthly revenue</TableCaption>
        <TableHead data-testid="head">
          <TableRow>
            <TableHeadCell>Owner</TableHeadCell>
            <TableHeadCell>Revenue</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Ana</TableCell>
            <TableCell>$42,300</TableCell>
          </TableRow>
        </TableBody>
        <TableFoot data-testid="foot">
          <TableRow>
            <TableHeadCell scope="row">Total</TableHeadCell>
            <TableCell>$42,300</TableCell>
          </TableRow>
        </TableFoot>
      </Table>,
    );

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('Monthly revenue')).toBeInTheDocument();
    expect(screen.getByTestId('head').tagName).toBe('THEAD');
    expect(screen.getByTestId('foot').tagName).toBe('TFOOT');
    expect(screen.getByRole('columnheader', { name: 'Owner' })).toHaveAttribute('scope', 'col');
    expect(screen.getByRole('rowheader', { name: 'Total' })).toHaveAttribute('scope', 'row');
  });

  it('merges custom classes while keeping defaults', () => {
    render(
      <Table className="custom-table" data-testid="table">
        <TableHead className="custom-head">
          <TableRow className="custom-row">
            <TableHeadCell className="custom-head-cell">Owner</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell className="custom-cell">Ana</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(screen.getByTestId('table')).toHaveClass('w-full', 'border-collapse', 'custom-table');
    const [headRowGroup] = screen.getAllByRole('rowgroup');

    expect(headRowGroup).toHaveClass('border-b', 'custom-head');
    const [headRow] = screen.getAllByRole('row');

    expect(headRow).toHaveClass('border-b', 'custom-row');
    expect(screen.getByRole('columnheader')).toHaveClass('ui-text-brand', 'custom-head-cell');
    expect(screen.getByRole('cell')).toHaveClass('align-middle', 'custom-cell');
  });
});
