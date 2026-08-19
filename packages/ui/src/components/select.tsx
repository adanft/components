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
  multiple,
  placeholder,
  value,
  ...props
}: SelectProps) {
  const hasPlaceholder = Boolean(placeholder) && !multiple;
  const uncontrolledDefaultValue = defaultValue ?? (hasPlaceholder ? '' : undefined);
  const controlledProps =
    value !== undefined ? { value } : { defaultValue: uncontrolledDefaultValue };

  return (
    <div className="relative w-full">
      <select
        {...props}
        data-ui-select-placeholder={hasPlaceholder ? '' : undefined}
        disabled={disabled}
        multiple={multiple}
        {...controlledProps}
        className={cn(
          'w-full rounded-md border border-border bg-background px-3 py-2 text-foreground',
          !multiple && 'appearance-none pr-10',
          'aria-invalid:border-danger aria-invalid:focus-visible:outline-outline-danger',
          'disabled:cursor-not-allowed disabled:bg-muted/20 disabled:opacity-50',
          className,
        )}>
        {hasPlaceholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {children}
      </select>
      {multiple ? null : (
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted"
        />
      )}
    </div>
  );
}

export type { SelectProps };
export default Select;
