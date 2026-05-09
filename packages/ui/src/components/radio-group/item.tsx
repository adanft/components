import type { ComponentPropsWithoutRef } from 'react';
import { useId } from 'react';

import { cn } from '../../helpers/cn';
import { CircleIcon } from '../../icons';
import { useRadioGroupContext } from './context';

type RadioGroupItemProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'checked' | 'defaultChecked' | 'name' | 'onChange' | 'type'
> & {
  label?: string;
  value: string;
};

function RadioGroupItem({ className, disabled, id, label, value, ...props }: RadioGroupItemProps) {
  const autoId = useId();
  const resolvedId = id ?? autoId;
  const context = useRadioGroupContext('Item');
  const isChecked = context.value === value;
  const isDisabled = context.disabled || disabled;

  const wrapperClassName = cn(
    'inline-flex gap-2 text-heading has-aria-invalid:text-danger',
    context.labelPosition === 'right' && 'flex-row items-center',
    context.labelPosition === 'left' && 'flex-row-reverse items-center',
    context.labelPosition === 'top' && 'flex-col-reverse items-center',
    context.labelPosition === 'bottom' && 'flex-col items-center',
    isDisabled && 'cursor-not-allowed opacity-50',
  );

  return (
    <label htmlFor={resolvedId} className={wrapperClassName}>
      <span
        className={cn(
          'relative inline-flex items-center justify-center',
          !isDisabled && 'cursor-pointer',
        )}>
        <input
          {...props}
          id={resolvedId}
          checked={isChecked}
          disabled={isDisabled}
          name={context.name}
          type="radio"
          className="peer sr-only"
          onChange={() => {
            context.onValueChange(value);
          }}
        />
        <span
          aria-hidden="true"
          className={cn(
            'inline-flex h-4 w-4 rounded-full border border-muted bg-background',
            'peer-checked:border-brand peer-focus-visible:outline-2 peer-focus-visible:outline-brand peer-focus-visible:outline-offset-2',
            'peer-aria-invalid:border-danger peer-aria-invalid:peer-focus-visible:outline-danger',
            className,
          )}
        />
        <CircleIcon
          aria-hidden="true"
          className="pointer-events-none absolute hidden h-2.5 w-2.5 fill-brand text-brand peer-checked:block"
          strokeWidth={0}
        />
      </span>
      {label ? (
        <span className={cn('select-none text-sm font-medium', !isDisabled && 'cursor-pointer')}>
          {label}
        </span>
      ) : null}
    </label>
  );
}

export type { RadioGroupItemProps };
export default RadioGroupItem;
