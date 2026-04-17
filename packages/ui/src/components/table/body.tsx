import { cn } from '../../helpers/cn';
import type { TableBodyProps } from './types';

function TableBody<TRow, TCell>({
  className,
  rows,
  getRowKey,
  getRowCells,
  renderCell,
  getCellKey,
  striped,
  ...props
}: TableBodyProps<TRow, TCell>) {
  const rowClassName = cn(
    'border-t border-border hover:bg-subtle transition-colors',
    striped && 'even:bg-subtle/50',
  );

  return (
    <tbody className={className} {...props}>
      {rows.map((row, rowIndex) => (
        <tr key={getRowKey(row, rowIndex)} className={rowClassName}>
          {getRowCells(row, rowIndex).map((cell, cellIndex) => (
            <td
              key={getCellKey?.(cell, row, rowIndex, cellIndex) ?? cellIndex}
              className="px-4 py-3 text-sm text-foreground">
              {renderCell(cell, row, rowIndex, cellIndex)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
export type { TableBodyProps } from './types';
