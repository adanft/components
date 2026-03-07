import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../helpers/cn';

type IconProps = ComponentPropsWithoutRef<'i'> & {
  symbol: string;
};

function Icon({ className, symbol, ...props }: IconProps) {
  const iconClassName = cn('nf', symbol, className);

  return <i {...props} className={iconClassName} />;
}

export type { IconProps };
export default Icon;
