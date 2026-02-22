import type { ComponentType, ReactNode } from 'react';

type LinkComponentProps = {
  children: ReactNode;
  className: string;
  href: string;
};

type Props = {
  nfIconName: string;
  text: string;
  href: string;
  isActive?: boolean;
  LinkComponent?: ComponentType<LinkComponentProps>;
};

export type { LinkComponentProps as SidebarLinkComponentProps };

function SidebarLink({ text, nfIconName, href, isActive = false, LinkComponent }: Props) {
  const className = isActive
    ? 'ui-nav-active flex mx-2 leading-none items-center ui-text-body gap-4 rounded-md'
    : 'flex px-2 leading-none items-center ui-text-body gap-4 rounded-md';

  if (LinkComponent) {
    return (
      <LinkComponent className={className} href={href}>
        <i className={`nf leading-none ${nfIconName} p-3.5 text-xl`} />
        <span className="font-medium">{text}</span>
      </LinkComponent>
    );
  }

  return (
    <a className={className} href={href}>
      <i className={`nf leading-none ${nfIconName} p-3.5 text-xl`} />
      <span className="font-medium">{text}</span>
    </a>
  );
}

export default SidebarLink;
