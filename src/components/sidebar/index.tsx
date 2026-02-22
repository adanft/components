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

const DEFAULT_NAVIGATION: SidebarNavigationNode[] = [
  { type: 'link', nfIconName: 'nf-fa-shopping_cart', text: 'Orders', href: '/components/orders' },
  { type: 'link', nfIconName: 'nf-md-shopping', text: 'Products', href: '/components/products' },
  { type: 'link', nfIconName: 'nf-fa-history', text: 'History', href: '/components/history' },
  { type: 'link', nfIconName: 'nf-fa-users', text: 'Users', href: '/components/users' },
  { type: 'link', nfIconName: 'nf-oct-star', text: 'Favorites', href: '/components/favorite' },
  { type: 'heading', text: 'CONTENT MANAGEMENT' },
  {
    type: 'group',
    iconName: 'nf-md-file_document',
    text: 'Reports',
    children: [
      {
        type: 'link',
        nfIconName: 'nf-fa-money_check',
        text: 'Financial Report',
        href: '/components/financial-report',
      },
      {
        type: 'group',
        iconName: 'nf-fa-chalkboard_user',
        text: 'User Reports',
        children: [
          {
            type: 'link',
            nfIconName: 'nf-fa-hospital_user',
            text: 'User Activity',
            href: '/components/user-activity',
          },
          {
            type: 'link',
            nfIconName: 'nf-fa-user_tie',
            text: 'User Growth',
            href: '/components/user-growth',
          },
        ],
      },
      {
        type: 'link',
        nfIconName: 'nf-md-view_compact',
        text: 'System Reports',
        href: '/components/system-reports',
      },
    ],
  },
  {
    type: 'link',
    nfIconName: 'nf-md-integrated_circuit_chip',
    text: 'Integrations',
    href: '/components/integrations',
  },
  {
    type: 'link',
    nfIconName: 'nf-fa-bell',
    text: 'Notifications',
    href: '/components/notifications',
  },
  {
    type: 'link',
    nfIconName: 'nf-md-google_analytics',
    text: 'Analytics',
    href: '/components/analytics',
  },
  { type: 'heading', text: 'BACKUP & RESTORE' },
  {
    type: 'link',
    nfIconName: 'nf-md-folder_lock_open_outline',
    text: 'Backup',
    href: '/components/backup',
  },
  {
    type: 'link',
    nfIconName: 'nf-md-folder_refresh_outline',
    text: 'Restore',
    href: '/components/restore',
  },
  {
    type: 'link',
    nfIconName: 'nf-fa-camera_retro',
    text: 'Snapshots',
    href: '/components/snapshots',
  },
  {
    type: 'link',
    nfIconName: 'nf-md-calendar',
    text: 'Schedule',
    href: '/components/schedule',
  },
  {
    type: 'link',
    nfIconName: 'nf-cod-settings_gear',
    text: 'Settings',
    href: '/components/settings',
  },
];

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

  const resolvedNavigation = navigation ?? DEFAULT_NAVIGATION;
  const headingClassName = `text-muted py-4 ${onActive ? 'px-2' : 'px-6'} text-lg font-semibold whitespace-nowrap`;

  return (
    <aside
      ref={asideRef}
      className={`transition-all duration-300 fixed min-h-screen z-20 top-0 left-0 back border-r border-color shadow-personal bg-secondary-color
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
