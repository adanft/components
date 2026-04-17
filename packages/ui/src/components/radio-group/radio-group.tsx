import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { useId } from 'react';

import { cn } from '../../helpers/cn';
import { RadioGroupContext } from './context';

type RadioGroupProps = Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> & {
  disabled?: boolean;
  labelPosition?: 'left' | 'right' | 'top' | 'bottom';
  onValueChange: (value: string) => void;
  value: string;
  children: ReactNode;
  name?: string;
};

function RadioGroup({
  children,
  className,
  disabled,
  labelPosition = 'right',
  name,
  onValueChange,
  value,
  ...props
}: RadioGroupProps) {
  const autoName = useId();
  const resolvedName = name ?? autoName;

  return (
    <RadioGroupContext.Provider
      value={{
        disabled,
        labelPosition,
        name: resolvedName,
        onValueChange,
        value,
      }}>
      <div role="radiogroup" className={cn('flex gap-4', className)} {...props}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

export type { RadioGroupProps };
export default RadioGroup;
