import { type ComponentPropsWithoutRef, useId } from 'react';

import { cn } from '../helpers/cn';
import { CheckIcon } from '../icons';

type CheckboxProps = Omit<ComponentPropsWithoutRef<'input'>, 'type'> & {
  label?: string;
  labelPosition?: 'left' | 'right' | 'top' | 'bottom';
};

function Checkbox({
  className,
  disabled,
  id,
  label,
  labelPosition = 'right',
  ...props
}: CheckboxProps) {
  const autoId = useId();
  const resolvedId = id ?? autoId;

  const wrapperClassName = cn(
    'inline-flex gap-2',
    labelPosition === 'right' && 'flex-row items-center',
    labelPosition === 'left' && 'flex-row-reverse items-center',
    labelPosition === 'top' && 'flex-col-reverse items-start',
    labelPosition === 'bottom' && 'flex-col items-start',
    disabled && 'opacity-50 cursor-not-allowed',
  );

  const inputClassName = cn(
    'peer relative h-4 w-4 shrink-0 appearance-none rounded-sm border border-muted bg-background',
    'checked:bg-brand checked:border-brand',
    className,
  );

  const indicator = (
    <span className="relative inline-flex items-center justify-center">
      <input
        {...props}
        id={resolvedId}
        type="checkbox"
        disabled={disabled}
        className={inputClassName}
      />
      <CheckIcon
        aria-hidden="true"
        className="pointer-events-none absolute hidden h-3 w-3 text-white peer-checked:block"
        strokeWidth={3}
      />
    </span>
  );

  if (label) {
    return (
      <label htmlFor={resolvedId} className={wrapperClassName}>
        {indicator}
        <span className="text-sm font-medium text-foreground">{label}</span>
      </label>
    );
  }

  return <span className={wrapperClassName}>{indicator}</span>;
}

export type { CheckboxProps };
export default Checkbox;
