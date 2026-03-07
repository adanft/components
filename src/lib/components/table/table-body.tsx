import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../../helpers/cn';

type TableBodyProps = ComponentPropsWithoutRef<'tbody'>;

function TableBody({ className, ...props }: TableBodyProps) {
  const bodyClassName = cn(className);

  return <tbody {...props} className={bodyClassName} />;
}

export default TableBody;
export type { TableBodyProps };
