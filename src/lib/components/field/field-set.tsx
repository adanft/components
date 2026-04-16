import type { ComponentPropsWithoutRef } from 'react';
import { useId, useMemo, useState } from 'react';

import { cn } from '../../helpers/cn';
import { FieldContext } from './context';

type FieldSetProps = ComponentPropsWithoutRef<'fieldset'> & {
  invalid?: boolean;
  required?: boolean;
};

function FieldSet({
  children,
  className,
  invalid = false,
  required = false,
  ...props
}: FieldSetProps) {
  const autoId = useId();
  const descriptionId = `${autoId}-description`;
  const errorId = `${autoId}-error`;
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
        controlId: autoId,
        descriptionId,
        describedBy,
        errorId,
        hasError: invalid,
        hasDescription,
        hasErrorMessage,
        isFieldSet: true,
        required,
        setHasDescription,
        setHasErrorMessage,
      }}>
      <fieldset
        data-invalid={invalid ? '' : undefined}
        data-required={required ? '' : undefined}
        aria-describedby={describedBy || undefined}
        className={cn('flex flex-col gap-1.5', className)}
        {...props}>
        {children}
      </fieldset>
    </FieldContext.Provider>
  );
}

export type { FieldSetProps };
export default FieldSet;
