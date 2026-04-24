import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../../helpers/cn';

type FieldProps = ComponentPropsWithoutRef<'div'> & {
  invalid?: boolean;
  required?: boolean;
};

function Field({ children, className, invalid = false, required = false, ...props }: FieldProps) {
  return (
    <div
      data-invalid={invalid ? '' : undefined}
      data-required={required ? '' : undefined}
      className={cn('flex flex-col gap-1.5', className)}
      {...props}>
      {children}
    </div>
  );
}

export type { FieldProps };
export default Field;
