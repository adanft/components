import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../../helpers/cn';

type FieldLegendProps = ComponentPropsWithoutRef<'legend'>;

function FieldLegend({ className, ...props }: FieldLegendProps) {
  return <legend className={cn('text-sm font-medium text-heading', className)} {...props} />;
}

export type { FieldLegendProps };
export default FieldLegend;
