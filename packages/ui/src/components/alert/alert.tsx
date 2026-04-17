import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { cn } from '../../helpers/cn';

type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

type AlertProps = ComponentPropsWithoutRef<'div'> & {
  icon?: ReactNode;
  variant?: AlertVariant;
};

const variantStyles: Record<AlertVariant, string> = {
  info: 'border-info/30 bg-info/10',
  success: 'border-success/30 bg-success/10',
  warning: 'border-accent/30 bg-accent/10',
  danger: 'border-danger/30 bg-danger/10',
};

const iconStyles: Record<AlertVariant, string> = {
  info: 'text-info',
  success: 'text-success',
  warning: 'text-accent',
  danger: 'text-danger',
};

function Alert({ children, className, icon, variant = 'info', ...props }: AlertProps) {
  return (
    <div
      className={cn(
        'flex gap-3 rounded-xl border p-4 text-foreground',
        variantStyles[variant],
        className,
      )}
      {...props}>
      {icon ? <div className={cn('shrink-0', iconStyles[variant])}>{icon}</div> : null}
      <div className="flex min-w-0 flex-col gap-1">{children}</div>
    </div>
  );
}

export type { AlertProps, AlertVariant };
export default Alert;
