import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../../helpers/cn';

type FieldDescriptionProps = ComponentPropsWithoutRef<'p'>;

function FieldDescription({ className, ...props }: FieldDescriptionProps) {
  return <p className={cn('text-sm text-muted', className)} {...props} />;
}

export type { FieldDescriptionProps };
export default FieldDescription;
