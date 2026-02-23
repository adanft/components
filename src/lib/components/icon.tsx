import type { ComponentPropsWithoutRef } from 'react';

type IconProps = ComponentPropsWithoutRef<'i'> & {
  symbol: string;
};

function Icon({ className, symbol, ...props }: IconProps) {
  const iconClassName = ['nf', symbol, className].join(' ');

  return <i {...props} className={iconClassName} />;
}

export type { IconProps };
export default Icon;
