import type { ComponentPropsWithoutRef } from 'react';

type TableFootProps = ComponentPropsWithoutRef<'tfoot'>;

function TableFoot({ className, ...props }: TableFootProps) {
  const footClassName = ['border-t', 'ui-border-default', className].filter(Boolean).join(' ');

  return <tfoot {...props} className={footClassName} />;
}

export default TableFoot;
export type { TableFootProps };
