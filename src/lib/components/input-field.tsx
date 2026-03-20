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
    'mb-1 text-sm font-medium text-foreground transition-colors duration-150 group-focus-within:text-brand';
  const inputClasses =
    'w-full border border-border rounded-md px-[0.6rem] py-2 bg-background text-foreground placeholder:text-muted placeholder:text-[14px] placeholder:opacity-60 placeholder:font-normal focus-visible:outline focus-visible:outline-1 focus-visible:border-brand focus-visible:outline-brand transition-colors duration-150';

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
