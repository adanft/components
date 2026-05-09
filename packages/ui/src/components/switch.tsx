import type { ComponentPropsWithoutRef } from 'react';
import { useId } from 'react';

import { cn } from '../helpers/cn';

type SwitchProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'checked' | 'defaultChecked' | 'onChange' | 'type'
> & {
  checked: boolean;
  label?: string;
  labelPosition?: 'left' | 'right' | 'top' | 'bottom';
  onCheckedChange: (checked: boolean) => void;
};

function Switch({
  checked,
  className,
  disabled,
  id,
  label,
  labelPosition = 'right',
  onCheckedChange,
  ...props
}: SwitchProps) {
  const autoId = useId();
  const resolvedId = id ?? autoId;

  const wrapperClassName = cn(
    'inline-flex gap-2',
    labelPosition === 'right' && 'flex-row items-center',
    labelPosition === 'left' && 'flex-row-reverse items-center',
    labelPosition === 'top' && 'flex-col-reverse items-start',
    labelPosition === 'bottom' && 'flex-col items-start',
    disabled && 'cursor-not-allowed opacity-50',
  );

  return (
    <label htmlFor={resolvedId} className={wrapperClassName}>
      <span className={cn('relative inline-flex items-center', !disabled && 'cursor-pointer')}>
        <input
          {...props}
          id={resolvedId}
          checked={checked}
          disabled={disabled}
          aria-checked={checked}
          role="switch"
          type="checkbox"
          className="peer sr-only"
          onChange={(event) => {
            onCheckedChange(event.target.checked);
          }}
        />
        <span
          aria-hidden="true"
          className={cn(
            'inline-flex h-6 w-11 rounded-full border border-border bg-muted',
            'peer-checked:bg-brand peer-focus-visible:outline-2 peer-focus-visible:outline-brand peer-focus-visible:outline-offset-2',
            'peer-aria-invalid:border-danger peer-aria-invalid:peer-focus-visible:outline-danger',
            className,
          )}
        />
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-150',
            'peer-checked:translate-x-5',
          )}
        />
      </span>
      {label ? (
        <span
          className={cn(
            'select-none text-sm font-medium text-foreground',
            !disabled && 'cursor-pointer',
          )}>
          {label}
        </span>
      ) : null}
    </label>
  );
}

export type { SwitchProps };
export default Switch;
