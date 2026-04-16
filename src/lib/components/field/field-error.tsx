import type { ComponentPropsWithoutRef } from 'react';
import { useEffect } from 'react';

import { cn } from '../../helpers/cn';
import { useFieldContext } from './context';

type FieldErrorProps = ComponentPropsWithoutRef<'div'>;

function FieldError({ children, className, ...props }: FieldErrorProps) {
  const { errorId, setHasErrorMessage } = useFieldContext('Error');

  useEffect(() => {
    if (!children) {
      return;
    }

    setHasErrorMessage(true);

    return () => {
      setHasErrorMessage(false);
    };
  }, [children, setHasErrorMessage]);

  if (!children) {
    return null;
  }

  return (
    <div id={errorId} className={cn('text-sm text-danger', className)} {...props}>
      {children}
    </div>
  );
}

export type { FieldErrorProps };
export default FieldError;
