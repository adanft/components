import type { ComponentPropsWithRef } from 'react';

import { cn } from '../helpers/cn';

type BoxSurface = 'none' | 'default';
type BoxPadding = 'none' | 'default';
type BoxShadow = 'none' | 'default';

interface BoxProps extends ComponentPropsWithRef<'div'> {
  surface?: BoxSurface;
  padding?: BoxPadding;
  shadow?: BoxShadow;
}

const surfaceClassNames: Record<BoxSurface, string> = {
  none: '',
  default: 'bg-surface',
};

const paddingClassNames: Record<BoxPadding, string> = {
  none: '',
  default: 'p-4',
};

const shadowClassNames: Record<BoxShadow, string> = {
  none: '',
  default: 'shadow-card',
};

function Box({
  className,
  padding = 'default',
  shadow = 'default',
  surface = 'default',
  ...props
}: BoxProps) {
  const boxClassName = cn(
    'border border-border rounded-md',
    surfaceClassNames[surface],
    paddingClassNames[padding],
    shadowClassNames[shadow],
    className,
  );

  return <div {...props} className={boxClassName} />;
}

export type { BoxProps };
export default Box;
