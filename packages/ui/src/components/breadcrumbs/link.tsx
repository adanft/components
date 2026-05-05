import { type ComponentPropsWithoutRef, cloneElement, isValidElement } from 'react';

import { cn } from '../../helpers/cn';

type BreadcrumbsLinkProps = ComponentPropsWithoutRef<'a'> & {
  asChild?: boolean;
};

function BreadcrumbsLink({ asChild, children, className, ...props }: BreadcrumbsLinkProps) {
  const classes = cn('text-foreground hover:text-brand', className);

  if (asChild && isValidElement<{ className?: string }>(children)) {
    return cloneElement(children, {
      ...props,
      className: cn(classes, children.props.className),
    });
  }

  return (
    <a {...props} className={classes}>
      {children}
    </a>
  );
}

export default BreadcrumbsLink;
export type { BreadcrumbsLinkProps };
