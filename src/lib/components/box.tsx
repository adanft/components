import type { ComponentPropsWithoutRef } from 'react';

type BoxProps = ComponentPropsWithoutRef<'div'>;

function Box({ className, ...props }: BoxProps) {
  const boxClassName = [
    'ui-bg-surface-raised',
    'border',
    'ui-border-default',
    'ui-shadow-sm',
    'rounded-md',
    'p-4',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div {...props} className={boxClassName} />;
}

export type { BoxProps };
export default Box;
