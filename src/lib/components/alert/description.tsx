import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../../helpers/cn';

type AlertDescriptionProps = ComponentPropsWithoutRef<'div'>;

function AlertDescription({ className, ...props }: AlertDescriptionProps) {
  return <div className={cn('text-sm text-foreground', className)} {...props} />;
}

export type { AlertDescriptionProps };
export default AlertDescription;
