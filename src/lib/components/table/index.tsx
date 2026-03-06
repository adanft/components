import type { ComponentPropsWithoutRef } from 'react';

type TableProps = ComponentPropsWithoutRef<'table'>;

function Table({ className, ...props }: TableProps) {
  const tableClassName = ['w-full', 'border-collapse', 'text-left', 'ui-text-body', className]
    .filter(Boolean)
    .join(' ');

  return <table {...props} className={tableClassName} />;
}

export default Table;
export type { TableProps };
