import { cn } from '../../helpers/cn';
import type { TableHeadProps } from './types';

function TableHead<THeader>({
  className,
  headers,
  renderHeader,
  getHeaderKey,
  ...props
}: TableHeadProps<THeader>) {
  return (
    <thead className={cn('bg-surface border-b border-border', className)} {...props}>
      <tr>
        {headers.map((header, index) => (
          <th
            key={getHeaderKey?.(header, index) ?? index}
            scope="col"
            className="px-4 py-3 text-left text-sm font-semibold text-foreground">
            {renderHeader(header, index)}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHead;
export type { TableHeadProps } from './types';
