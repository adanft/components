import type { ComponentPropsWithoutRef } from 'react';
import { useId, useMemo, useState } from 'react';

import { cn } from '../../helpers/cn';
import { FieldContext } from './context';

type FieldProps = ComponentPropsWithoutRef<'div'> & {
  id?: string;
  invalid?: boolean;
  required?: boolean;
};

function Field({
  children,
  className,
  id,
  invalid = false,
  required = false,
  ...props
}: FieldProps) {
  const autoId = useId();
  const controlId = id ?? autoId;
  const descriptionId = `${controlId}-description`;
  const errorId = `${controlId}-error`;
  const [hasDescription, setHasDescription] = useState(false);
  const [hasErrorMessage, setHasErrorMessage] = useState(false);
  const describedBy = useMemo(
    () =>
      [hasDescription ? descriptionId : undefined, invalid && hasErrorMessage ? errorId : undefined]
        .filter(Boolean)
        .join(' '),
    [descriptionId, errorId, hasDescription, hasErrorMessage, invalid],
  );

  return (
    <FieldContext.Provider
      value={{
        controlId,
        descriptionId,
        describedBy,
        errorId,
        hasError: invalid,
        hasDescription,
        hasErrorMessage,
        required,
        setHasDescription,
        setHasErrorMessage,
      }}>
      <div
        data-invalid={invalid ? '' : undefined}
        data-required={required ? '' : undefined}
        className={cn('flex flex-col gap-1.5', className)}
        {...props}>
        {children}
      </div>
    </FieldContext.Provider>
  );
}

export type { FieldProps };
export default Field;
