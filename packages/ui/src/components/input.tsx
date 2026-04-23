import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../helpers/cn';

type InputProps = ComponentPropsWithoutRef<'input'>;

function Input({ className, type = 'text', ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        'w-full rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted disabled:cursor-not-allowed disabled:bg-muted/20 disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export default Input;
export type { InputProps };
