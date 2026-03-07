import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../helpers/cn';

type ButtonProps = ComponentPropsWithoutRef<'button'>;

function Button({ children, className, type = 'button', ...props }: ButtonProps) {
  const buttonClassName = cn(
    'inline-flex',
    'leading-10',
    'rounded-full',
    'px-4',
    'font-semibold',
    'ui-bg-brand',
    'text-white',
    'cursor-pointer',
    className,
  );

  return (
    <button {...props} type={type} className={buttonClassName}>
      {children}
    </button>
  );
}

export type { ButtonProps };
export default Button;
