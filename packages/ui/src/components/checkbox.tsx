import { Check } from 'lucide-react';
import { type ComponentPropsWithoutRef, useId } from 'react';

import { cn } from '../helpers/cn';

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
    labelPosition === 'top' && 'flex-col-reverse items-center',
    labelPosition === 'bottom' && 'flex-col items-center',
    disabled && 'opacity-50 cursor-not-allowed',
  );

  const inputClassName = cn(
    'peer relative h-4 w-4 shrink-0 appearance-none rounded-sm border border-muted bg-background',
    'transition-colors duration-150 cursor-pointer',
    'checked:bg-brand checked:border-brand',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
    'disabled:pointer-events-none',
    !disabled && 'group-hover:bg-brand/10',
    className,
  );

  return (
    <span className={wrapperClassName}>
      <span className="relative inline-flex items-center justify-center">
        <input
          {...props}
          id={resolvedId}
          type="checkbox"
          disabled={disabled}
          className={inputClassName}
        />
        <Check
          aria-hidden="true"
          className="pointer-events-none absolute hidden h-3 w-3 text-white peer-checked:block"
          strokeWidth={3}
        />
      </span>
      {label && (
        <label
          htmlFor={resolvedId}
          className={cn(
            'text-sm font-medium text-foreground select-none',
            !disabled && 'cursor-pointer',
          )}>
          {label}
        </label>
      )}
    </span>
  );
}

export type { CheckboxProps };
export default Checkbox;
