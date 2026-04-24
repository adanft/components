import { cn } from '../../helpers/cn';
import type { TableCaptionProps } from './types';

function TableCaption({ className, ...props }: TableCaptionProps) {
  return <caption className={cn('mt-4 text-sm text-muted', className)} {...props} />;
}

export default TableCaption;
export type { TableCaptionProps } from './types';
