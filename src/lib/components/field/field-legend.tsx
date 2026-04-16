import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../../helpers/cn';
import { useFieldContext } from './context';

type FieldLegendProps = ComponentPropsWithoutRef<'legend'>;

function FieldLegend({ children, className, ...props }: FieldLegendProps) {
  const { hasError, isFieldSet, required } = useFieldContext('Legend');

  if (!isFieldSet) {
    throw new Error('<Field.Legend> must be used within <FieldSet>.');
  }

  return (
    <legend
      className={cn('text-sm font-medium text-foreground', hasError && 'text-danger', className)}
      {...props}>
      {children}
      {required ? <span aria-hidden="true"> *</span> : null}
    </legend>
  );
}

export type { FieldLegendProps };
export default FieldLegend;
