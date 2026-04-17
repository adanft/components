import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../helpers/cn';

type BadgeVariant = 'neutral' | 'success' | 'danger' | 'outline';
type BadgeSize = 'sm' | 'md';

type BadgeProps = ComponentPropsWithoutRef<'span'> & {
  size?: BadgeSize;
  variant?: BadgeVariant;
};

const variantStyles: Record<BadgeVariant, string> = {
  neutral: 'border-transparent bg-muted text-foreground',
  success: 'border-transparent bg-success/15 text-success',
  danger: 'border-transparent bg-danger/15 text-danger',
  outline: 'border-border bg-background text-foreground',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
};

function Badge({ children, className, size = 'md', variant = 'neutral', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium leading-none whitespace-nowrap',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}>
      {children}
    </span>
  );
}

export type { BadgeProps, BadgeSize, BadgeVariant };
export default Badge;
