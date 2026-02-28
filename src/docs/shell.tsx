import { Fragment, useState, type JSX, type ReactNode } from 'react';

import {
  Navbar,
  Sidebar,
  SidebarBody,
  SidebarGroup,
  SidebarHead,
  SidebarList,
  SidebarSection,
  type NavbarProps,
} from '../lib';
import { docsBranding } from './data/branding';
import { docsNavbarProps } from './data/navbar';
import { docsSidebarNavigation, type DocsSidebarNavigationNode } from './data/sidebar-navigation';
import { RouterLinkAdapter } from './router-adapters';
import useRouteActiveMatcher from './use-route-active-matcher';

type DocsShellProps = {
  children: ReactNode;
  navbarProps?: NavbarProps;
  navigation?: DocsSidebarNavigationNode[];
};

function renderNavigationNode(
  node: DocsSidebarNavigationNode,
  expanded: boolean,
  getIsActive: (href: string) => boolean,
): JSX.Element {
  if (node.type === 'heading') {
    return <SidebarSection text={node.text} state={expanded} />;
  }

  if (node.type === 'group') {
    return (
      <SidebarGroup iconName={node.iconName} text={node.text}>
        <SidebarList>
          {node.children.map((child) => (
            <Fragment key={child.type === 'heading' ? `heading-${child.text}` : child.text}>
              {renderNavigationNode(child, expanded, getIsActive)}
            </Fragment>
          ))}
        </SidebarList>
      </SidebarGroup>
    );
  }

  const className = getIsActive(node.href)
    ? 'ui-nav-active flex mx-2 leading-none items-center ui-text-body gap-4 rounded-md'
    : 'flex px-2 leading-none items-center ui-text-body gap-4 rounded-md';

  return (
    <RouterLinkAdapter className={className} href={node.href}>
      <i className={`nf leading-none ${node.nfIconName} p-3.5 text-xl`} />
      <span className="font-medium">{node.text}</span>
    </RouterLinkAdapter>
  );
}

function DocsShell({
  children,
  navbarProps = docsNavbarProps,
  navigation = docsSidebarNavigation,
}: DocsShellProps) {
  const [sidebarState, setSidebarState] = useState(false);
  const getIsActive = useRouteActiveMatcher();

  return (
    <>
      <Sidebar state={sidebarState} action={setSidebarState}>
        <SidebarHead
          href={docsBranding.href}
          logoSrc={docsBranding.logoSrc}
          title={docsBranding.title}
          state={sidebarState}
          action={setSidebarState}
        />
        <SidebarBody>
          <SidebarList>
            {navigation.map((node) => (
              <Fragment key={node.type === 'heading' ? `heading-${node.text}` : node.text}>
                {renderNavigationNode(node, sidebarState, getIsActive)}
              </Fragment>
            ))}
          </SidebarList>
        </SidebarBody>
      </Sidebar>
      <main className="absolute left-[65px] ui-text-body w-[calc(100%-65px)] p-4 min-h-[calc(100vh-97px)] ui-bg-surface-page top-[97px]">
        <div className="container mx-auto">
          <Navbar {...navbarProps} />
          {children}
        </div>
      </main>
    </>
  );
}

export default DocsShell;
