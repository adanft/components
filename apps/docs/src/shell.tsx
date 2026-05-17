import {
  Sidebar,
  SidebarBody,
  SidebarGroup,
  SidebarGroupLink,
  SidebarHead,
  SidebarSection,
} from '@adanft/ui';
import { type JSX, type ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router';
import RouterSidebarLink from './adapters/router-sidebar-link';
import Navbar, { type NavbarProps } from './components/navbar';
import { docsBranding } from './data/branding';
import { docsNavbarProps } from './data/navbar';
import { type DocsSidebarNavigationNode, docsSidebarNavigation } from './data/sidebar-navigation';

type DocsShellProps = {
  children: ReactNode;
  navbarProps?: NavbarProps;
  navigation?: DocsSidebarNavigationNode[];
};

function renderNavigationNode(
  node: DocsSidebarNavigationNode,
  pathname: string,
  key: string,
): JSX.Element {
  if (node.type === 'heading') {
    return <SidebarSection key={key} text={node.text} />;
  }

  if (node.type === 'group') {
    const active = node.items.some((item) => item.href === pathname);

    return (
      <SidebarGroup key={key} active={active} icon={node.icon} text={node.text}>
        {node.items.map(({ href, text }) => (
          <SidebarGroupLink key={href} asChild active={href === pathname} text={text}>
            <Link to={href} />
          </SidebarGroupLink>
        ))}
      </SidebarGroup>
    );
  }

  return <RouterSidebarLink key={key} href={node.href} icon={node.icon} text={node.text} />;
}

function DocsShell({
  children,
  navbarProps = docsNavbarProps,
  navigation = docsSidebarNavigation,
}: DocsShellProps) {
  const [sidebarState, setSidebarState] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      <Sidebar state={sidebarState} action={setSidebarState}>
        <SidebarHead
          asChild
          logoSrc={docsBranding.logoSrc}
          title={docsBranding.title}
          className="h-24">
          <Link to={docsBranding.href} />
        </SidebarHead>
        <SidebarBody>
          {navigation.map((node) =>
            renderNavigationNode(
              node,
              pathname,
              node.type === 'heading' ? `heading-${node.text}` : node.text,
            ),
          )}
        </SidebarBody>
      </Sidebar>
      <main className="absolute left-[65px] top-[97px] min-h-[calc(100vh-97px)] w-[calc(100%-65px)] overflow-x-hidden bg-background p-4 text-foreground">
        <div className="container mx-auto min-w-0">
          <Navbar {...navbarProps} />
          {children}
        </div>
      </main>
    </>
  );
}

export default DocsShell;
