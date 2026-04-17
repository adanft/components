import type { ComponentPropsWithRef } from 'react';

import { cn } from '../helpers/cn';

type BoxProps = ComponentPropsWithRef<'div'>;

function Box({ className, ...props }: BoxProps) {
  const boxClassName = cn('bg-surface border border-border shadow-card rounded-md p-4', className);

  return <div {...props} className={boxClassName} />;
}

export type { BoxProps };
export default Box;
