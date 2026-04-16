import { Children, cloneElement, isValidElement, type ReactElement } from 'react';

import { useFieldContext } from './context';

type FieldControlProps = {
  asChild: true;
  children: ReactElement;
};

function mergeDescribedBy(existing: unknown, describedBy?: string) {
  const values = [typeof existing === 'string' ? existing : undefined, describedBy]
    .filter(Boolean)
    .join(' ')
    .trim();

  return values || undefined;
}

function FieldControl({ children }: FieldControlProps) {
  const { controlId, describedBy, errorId, hasError, isFieldSet, required } =
    useFieldContext('Control');

  if (isFieldSet) {
    throw new Error('<Field.Control> should not be used within <FieldSet>.');
  }

  const child = Children.only(children);

  if (!isValidElement(child)) {
    throw new Error('<Field.Control> expects a single valid React element child.');
  }

  const childProps = child.props as Record<string, unknown>;

  return cloneElement<Record<string, unknown>>(child as ReactElement<Record<string, unknown>>, {
    ...childProps,
    id: childProps.id ?? controlId,
    'aria-describedby': mergeDescribedBy(childProps['aria-describedby'], describedBy || undefined),
    'aria-errormessage': hasError ? errorId : childProps['aria-errormessage'],
    'aria-invalid': hasError ? true : childProps['aria-invalid'],
    required: childProps.required ?? required,
  });
}

export type { FieldControlProps };
export default FieldControl;
