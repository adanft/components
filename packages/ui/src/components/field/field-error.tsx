import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../../helpers/cn';

type FieldErrorItem = {
  message?: string;
};

type FieldErrorProps = ComponentPropsWithoutRef<'div'> & {
  errors?: Array<FieldErrorItem | undefined>;
};

function FieldError({ children, className, errors, role = 'alert', ...props }: FieldErrorProps) {
  const uniqueErrors = errors
    ? [...new Map(errors.map((error) => [error?.message, error])).values()]
    : [];
  const messages = uniqueErrors
    .map((error) => error?.message)
    .filter((message): message is string => Boolean(message));
  const content = children || messages[0];

  if (!content && messages.length === 0) {
    return null;
  }

  return (
    <div role={role} className={cn('text-sm text-danger', className)} {...props}>
      {children || messages.length <= 1 ? (
        content
      ) : (
        <ul className="ml-4 flex list-disc flex-col gap-1">
          {messages.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export type { FieldErrorProps };
export default FieldError;
