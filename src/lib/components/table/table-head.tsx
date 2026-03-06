import type { ComponentPropsWithoutRef } from 'react';

type TableHeadProps = ComponentPropsWithoutRef<'thead'>;

function TableHead({ className, ...props }: TableHeadProps) {
  const headClassName = ['border-b', 'ui-border-default', className].filter(Boolean).join(' ');

  return <thead {...props} className={headClassName} />;
}

export default TableHead;
export type { TableHeadProps };
