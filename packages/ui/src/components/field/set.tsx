import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../../helpers/cn';

type FieldSetProps = ComponentPropsWithoutRef<'fieldset'> & {
  invalid?: boolean;
  required?: boolean;
};

function FieldSet({
  children,
  className,
  invalid = false,
  required = false,
  ...props
}: FieldSetProps) {
  return (
    <fieldset
      data-invalid={invalid ? '' : undefined}
      data-required={required ? '' : undefined}
      className={cn('flex flex-col gap-1.5', className)}
      {...props}>
      {children}
    </fieldset>
  );
}

export type { FieldSetProps };
export default FieldSet;
