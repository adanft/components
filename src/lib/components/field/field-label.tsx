import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../../helpers/cn';
import { useFieldContext } from './context';

type FieldLabelProps = ComponentPropsWithoutRef<'label'>;

function FieldLabel({ className, children, ...props }: FieldLabelProps) {
  const { controlId, hasError, isFieldSet, required } = useFieldContext('Label');

  if (isFieldSet) {
    throw new Error(
      '<Field.Label> should not be used within <FieldSet>; use <Field.Legend> instead.',
    );
  }

  return (
    <label
      htmlFor={controlId}
      className={cn('text-sm font-medium text-foreground', hasError && 'text-danger', className)}
      {...props}>
      {children}
      {required ? <span aria-hidden="true"> *</span> : null}
    </label>
  );
}

export type { FieldLabelProps };
export default FieldLabel;
