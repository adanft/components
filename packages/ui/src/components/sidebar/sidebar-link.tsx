import type { LucideIcon } from 'lucide-react';
import {
  type AnchorHTMLAttributes,
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react';

import { cn } from '../../helpers/cn';

type SidebarLinkBaseProps = {
  active?: boolean;
  className?: string;
  href: string;
  icon: LucideIcon;
  text: string;
};

type SidebarLinkAnchorProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> &
  SidebarLinkBaseProps & {
    asChild?: false;
  };

type SidebarLinkChildProps = SidebarLinkBaseProps & {
  asChild: true;
  children: ReactElement;
};

type SidebarLinkProps = SidebarLinkAnchorProps | SidebarLinkChildProps;
type SidebarLinkChildElementProps = {
  children?: ReactNode;
  className?: string;
};

function SidebarLink({ active = false, className, href, icon, text, ...props }: SidebarLinkProps) {
  const IconComponent = icon;
  const linkClassName = cn(
    'flex leading-none items-center text-foreground gap-4 rounded-md',
    active ? 'bg-brand text-white mx-2' : 'px-2',
    className,
  );
  const content = (
    <>
      <span className="flex shrink-0 items-center justify-center p-3.5">
        <IconComponent aria-hidden="true" className="size-5 stroke-2" />
      </span>
      <span className="font-medium">{text}</span>
    </>
  );

  if ('asChild' in props && props.asChild) {
    const child = Children.only(props.children);

    if (!isValidElement(child)) {
      throw new Error(
        '<SidebarLink> expects a single valid React element child when `asChild` is true.',
      );
    }

    const childElement = child as ReactElement<SidebarLinkChildElementProps>;
    const childProps = childElement.props;

    return cloneElement(childElement, {
      ...childProps,
      className: cn(linkClassName, childProps.className),
      children: content,
    });
  }

  return (
    <a {...props} href={href} className={linkClassName}>
      {content}
    </a>
  );
}

export default SidebarLink;
export type { SidebarLinkProps };
