import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../../helpers/cn';
import Label from '../label';

type FieldLabelProps = ComponentPropsWithoutRef<'label'>;

function FieldLabel({ className, ...props }: FieldLabelProps) {
  return <Label className={cn('text-heading data-invalid:text-danger', className)} {...props} />;
}

export type { FieldLabelProps };
export default FieldLabel;
