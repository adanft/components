import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../../helpers/cn';

type AlertTitleProps = ComponentPropsWithoutRef<'div'>;

function AlertTitle({ className, ...props }: AlertTitleProps) {
  return <div className={cn('font-semibold text-heading', className)} {...props} />;
}

export type { AlertTitleProps };
export default AlertTitle;
