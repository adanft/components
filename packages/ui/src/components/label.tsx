import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../helpers/cn';

type LabelProps = ComponentPropsWithoutRef<'label'>;

function Label({ className, ...props }: LabelProps) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: Label is a reusable primitive; consumers associate it with controls through native label props.
    <label className={cn('text-sm font-medium leading-none text-heading', className)} {...props} />
  );
}

export default Label;
export type { LabelProps };
