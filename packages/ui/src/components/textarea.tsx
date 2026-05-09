import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../helpers/cn';

type TextareaProps = ComponentPropsWithoutRef<'textarea'>;

function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        'w-full min-h-24 resize-y rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted aria-invalid:border-danger aria-invalid:focus-visible:outline-danger disabled:cursor-not-allowed disabled:bg-muted/20 disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export default Textarea;
export type { TextareaProps };
