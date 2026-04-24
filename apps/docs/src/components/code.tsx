import type { ComponentPropsWithoutRef } from 'react';

function Code({ children, className, ...props }: ComponentPropsWithoutRef<'code'>) {
  const baseClassName = 'rounded-md bg-brand/20 inline-flex px-1.5 font-mono text-brand';

  return (
    <code {...props} className={className ? `${baseClassName} ${className}` : baseClassName}>
      {children}
    </code>
  );
}

export { Code };
