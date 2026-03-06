import type { ComponentPropsWithoutRef } from 'react';

type TableBodyProps = ComponentPropsWithoutRef<'tbody'>;

function TableBody({ className, ...props }: TableBodyProps) {
  const bodyClassName = [className].filter(Boolean).join(' ');

  return <tbody {...props} className={bodyClassName} />;
}

export default TableBody;
export type { TableBodyProps };
