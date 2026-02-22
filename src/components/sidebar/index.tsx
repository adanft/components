import { useState, type ComponentType, type JSX } from 'react';

import useOutsideHandler from '../../hooks/use-outside-handler';
import SidebarHeader from '../sidebar-header';
import SidebarLink from '../sidebar-link';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import SidebarLinkList from '../sidebar-link-list';
import type { SidebarHeaderHomeLinkComponentProps } from '../sidebar-header';
import type { SidebarLinkComponentProps } from '../sidebar-link';

type SidebarNavigationLink = {
  href: string;
  nfIconName: string;
  text: string;
  type: 'link';
};

type SidebarNavigationGroup = {
  children: SidebarNavigationNode[];
  iconName: string;
  text: string;
  type: 'group';
};

type SidebarNavigationHeading = {
  text: string;
  type: 'heading';
};

type SidebarNavigationNode =
  | SidebarNavigationGroup
  | SidebarNavigationHeading
  | SidebarNavigationLink;

type SidebarProps = {
  brandHref?: string;
  brandLogoAlt?: string;
  brandLogoSrc?: string;
  brandTitle?: string;
  getIsActive?: (href: string) => boolean;
  HomeLinkComponent?: ComponentType<SidebarHeaderHomeLinkComponentProps>;
  LinkComponent?: ComponentType<SidebarLinkComponentProps>;
  homeHref?: string;
  logoSrc?: string;
  navigation?: SidebarNavigationNode[];
  title?: string;
};

function renderNavigationNode(
  node: SidebarNavigationNode,
  getIsActive: SidebarProps['getIsActive'],
  LinkComponent: SidebarProps['LinkComponent'],
  headingClassName: string,
): JSX.Element {
  if (node.type === 'heading') {
    return (
      <h5 className={headingClassName}>
        <i className="nf nf-fa-minus"></i>
        <span className="ml-6">{node.text}</span>
      </h5>
    );
  }

  if (node.type === 'group') {
    return (
      <SidebarLinkList iconName={node.iconName} text={node.text}>
        <ul className="flex flex-col gap-2">
          {node.children.map((child) => (
            <li key={child.type === 'heading' ? `heading-${child.text}` : child.text}>
              {renderNavigationNode(child, getIsActive, LinkComponent, headingClassName)}
            </li>
          ))}
        </ul>
      </SidebarLinkList>
    );
  }

  return (
    <SidebarLink
      nfIconName={node.nfIconName}
      text={node.text}
      href={node.href}
      isActive={getIsActive?.(node.href)}
      LinkComponent={LinkComponent}
    />
  );
}

function Sidebar({
  brandHref,
  brandLogoAlt,
  brandLogoSrc,
  brandTitle,
  getIsActive,
  HomeLinkComponent,
  LinkComponent,
  homeHref,
  logoSrc,
  navigation,
  title,
}: SidebarProps): JSX.Element {
  const [onActive, setOnActive] = useState(false);
  const asideRef = useOutsideHandler(() => {
    setOnActive(false);
  });

  const resolvedNavigation = navigation ?? [];
  const headingClassName = `ui-text-muted py-4 ${onActive ? 'px-2' : 'px-6'} text-lg font-semibold whitespace-nowrap`;

  return (
    <aside
      ref={asideRef}
      className={`transition-all duration-300 fixed min-h-screen z-20 top-0 left-0 back border-r ui-border-default ui-shadow-sm ui-bg-surface-raised
        ${onActive ? 'w-80.25' : 'w-16.25'}`}>
      <SidebarHeader
        action={setOnActive}
        state={onActive}
        LinkComponent={LinkComponent}
        HomeLinkComponent={HomeLinkComponent}
        brandHref={brandHref}
        brandLogoAlt={brandLogoAlt}
        brandLogoSrc={brandLogoSrc}
        brandTitle={brandTitle}
        homeHref={homeHref}
        logoSrc={logoSrc}
        title={title}
      />
      <SimpleBar className="max-h-[calc(100vh-96px)] overflow-x-hidden">
        <nav className="flex flex-col gap-2">
          <ul className="flex flex-col gap-2">
            {resolvedNavigation.map((node) => (
              <li key={node.type === 'heading' ? `heading-${node.text}` : node.text}>
                {renderNavigationNode(node, getIsActive, LinkComponent, headingClassName)}
              </li>
            ))}
          </ul>
        </nav>
      </SimpleBar>
    </aside>
  );
}

export default Sidebar;
export type {
  SidebarNavigationGroup,
  SidebarNavigationHeading,
  SidebarNavigationLink,
  SidebarNavigationNode,
};
