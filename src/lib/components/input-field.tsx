import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../helpers/cn';

type InputFieldProps = Omit<ComponentPropsWithoutRef<'input'>, 'id' | 'className'> & {
  id: string;
  label: string;
  className?: string;
  error?: boolean | string;
};

function InputField({ className, error, id, label, type = 'text', ...props }: InputFieldProps) {
  const hasError = Boolean(error);
  const errorId = `${id}-error`;

  const containerClasses = cn('group flex flex-col', className);
  const labelClasses = cn(
    'mb-1 text-sm font-medium text-foreground transition-colors duration-150',
    hasError ? 'text-danger group-focus-within:text-danger' : 'group-focus-within:text-brand',
  );
  const inputClasses = cn(
    'w-full rounded-md px-2.5 py-2 border border-border bg-background text-foreground placeholder:text-sm transition-colors duration-150',
    hasError
      ? 'border-danger focus-visible:border-danger focus-visible:outline-danger'
      : 'focus-visible:border-brand',
  );

  return (
    <div className={containerClasses}>
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
      <input
        {...props}
        id={id}
        type={type}
        className={inputClasses}
        aria-invalid={hasError}
        aria-describedby={typeof error === 'string' && error ? errorId : undefined}
      />
      {typeof error === 'string' && error && (
        <p id={errorId} role="alert" className="mt-1 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export type { InputFieldProps };
export default InputField;
