import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../helpers/cn';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'outline';

type BadgeProps = ComponentPropsWithoutRef<'span'> & {
  variant?: BadgeVariant;
};

const variantStyles: Record<BadgeVariant, string> = {
  primary: 'border-transparent bg-brand/10 text-accent-brand',
  secondary: 'border-transparent bg-muted text-on-muted',
  success: 'border-transparent bg-success/10 text-accent-success',
  danger: 'border-transparent bg-danger/10 text-accent-danger',
  outline: 'border-border bg-background text-foreground',
};

function Badge({ children, className, variant = 'secondary', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'rounded-full border px-2 text-xs font-medium leading-4 whitespace-nowrap',
        variantStyles[variant],
        className,
      )}
      {...props}>
      {children}
    </span>
  );
}

export type { BadgeProps, BadgeVariant };
export default Badge;
