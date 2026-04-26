import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../helpers/cn';
import { ChevronDownIcon } from '../icons';

type SelectProps = Omit<ComponentPropsWithoutRef<'select'>, 'size'> & {
  placeholder?: string;
};

function Select({
  children,
  className,
  defaultValue,
  disabled,
  placeholder,
  value,
  ...props
}: SelectProps) {
  const controlledProps =
    value !== undefined ? { value } : defaultValue !== undefined ? { defaultValue } : {};
  const isPlaceholderSelected = value === '' || (value === undefined && defaultValue === '');

  return (
    <div className="relative w-full">
      <select
        {...props}
        disabled={disabled}
        {...controlledProps}
        data-placeholder={isPlaceholderSelected ? '' : undefined}
        className={cn(
          'w-full appearance-none rounded-md border border-border bg-background px-3 py-2 pr-10 text-foreground',
          'data-placeholder:text-muted',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}>
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {children}
      </select>
      <ChevronDownIcon
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted"
      />
    </div>
  );
}

export type { SelectProps };
export default Select;
