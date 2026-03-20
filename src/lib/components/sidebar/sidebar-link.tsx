import type { ComponentType, ReactNode } from 'react';

type SidebarLinkComponentProps = {
  children: ReactNode;
  className: string;
  href: string;
};

type SidebarLinkComponent = ComponentType<SidebarLinkComponentProps>;

type SidebarLinkProps = {
  className?: string;
  href: string;
  nfIconName: string;
  text: string;
};

const defaultClassName = 'flex px-2 leading-none items-center text-foreground gap-4 rounded-md';

function SidebarLink({ className = defaultClassName, href, nfIconName, text }: SidebarLinkProps) {
  return (
    <a className={className} href={href}>
      <i className={`nf leading-none ${nfIconName} p-3.5 text-xl`} />
      <span className="font-medium">{text}</span>
    </a>
  );
}

export default SidebarLink;
export type { SidebarLinkComponent, SidebarLinkComponentProps, SidebarLinkProps };
