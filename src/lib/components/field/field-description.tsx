import type { ComponentPropsWithoutRef } from 'react';
import { useEffect } from 'react';

import { cn } from '../../helpers/cn';
import { useFieldContext } from './context';

type FieldDescriptionProps = ComponentPropsWithoutRef<'div'>;

function FieldDescription({ children, className, ...props }: FieldDescriptionProps) {
  const { descriptionId, setHasDescription } = useFieldContext('Description');

  useEffect(() => {
    if (!children) {
      return;
    }

    setHasDescription(true);

    return () => {
      setHasDescription(false);
    };
  }, [children, setHasDescription]);

  if (!children) {
    return null;
  }

  return (
    <div id={descriptionId} className={cn('text-sm text-muted', className)} {...props}>
      {children}
    </div>
  );
}

export type { FieldDescriptionProps };
export default FieldDescription;
