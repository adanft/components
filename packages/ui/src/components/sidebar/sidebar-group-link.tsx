import {
  type AnchorHTMLAttributes,
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react';

import { cn } from '../../helpers/cn';

type SidebarGroupLinkBaseProps = {
  active?: boolean;
  className?: string;
  text: string;
};

type SidebarGroupLinkAnchorProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> &
  SidebarGroupLinkBaseProps & {
    asChild?: false;
    href: string;
  };

type SidebarGroupLinkChildProps = SidebarGroupLinkBaseProps & {
  asChild: true;
  children: ReactElement;
  href?: string;
};

type SidebarGroupLinkProps = SidebarGroupLinkAnchorProps | SidebarGroupLinkChildProps;
type SidebarGroupLinkChildElementProps = {
  'aria-current'?: AnchorHTMLAttributes<HTMLAnchorElement>['aria-current'];
  children?: ReactNode;
  className?: string;
};

function SidebarGroupLink({
  active = false,
  className,
  href,
  text,
  ...props
}: SidebarGroupLinkProps) {
  const linkClassName = cn(
    'flex items-center gap-3 rounded-md p-3 font-medium text-foreground',
    active && 'bg-brand text-white',
    className,
  );
  const content = (
    <>
      <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-current" />
      <span className="truncate">{text}</span>
    </>
  );
  const ariaCurrent = active ? 'page' : undefined;

  if ('asChild' in props && props.asChild) {
    const child = Children.only(props.children);

    if (!isValidElement(child)) {
      throw new Error(
        '<SidebarGroupLink> expects a single valid React element child when `asChild` is true.',
      );
    }

    const childElement = child as ReactElement<SidebarGroupLinkChildElementProps>;
    const childProps = childElement.props;

    return cloneElement(childElement, {
      ...childProps,
      'aria-current': ariaCurrent,
      className: cn(linkClassName, childProps.className),
      children: content,
    });
  }

  return (
    <a {...props} aria-current={ariaCurrent} href={href} className={linkClassName}>
      {content}
    </a>
  );
}

Object.assign(SidebarGroupLink, {
  displayName: 'SidebarGroupLink',
  __sidebarGroupLink: true,
});

export default SidebarGroupLink;
export type { SidebarGroupLinkProps };
