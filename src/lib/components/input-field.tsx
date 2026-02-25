import { type ComponentPropsWithoutRef } from 'react';

type InputFieldProps = Omit<ComponentPropsWithoutRef<'input'>, 'id' | 'className'> & {
  id: string;
  label: string;
  className?: string;
};

function InputField({ className, id, label, type = 'text', ...props }: InputFieldProps) {
  const containerClasses = className
    ? `group flex grow flex-col ${className}`
    : 'group flex grow flex-col';
  const labelClasses =
    'mb-1 text-sm font-medium ui-text-body transition-colors duration-150 ui-group-focus-text-brand';
  const inputClasses =
    'w-full border ui-border-default ui-radius-sm px-[0.6rem] py-2 ui-bg-surface-page ui-text-body ui-placeholder-muted placeholder:text-[14px] placeholder:opacity-60 placeholder:font-normal focus-visible:outline focus-visible:outline-1 ui-focus-visible-brand transition-colors duration-150';

  return (
    <div className={containerClasses}>
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
      <input {...props} id={id} type={type} className={inputClasses} />
    </div>
  );
}

export type { InputFieldProps };
export default InputField;
