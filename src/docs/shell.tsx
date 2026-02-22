import type { ReactNode } from 'react';

import { Navbar, Sidebar, type NavbarProps, type SidebarNavigationNode } from '../lib';
import { docsBranding } from './data/branding';
import { docsNavbarProps } from './data/navbar';
import { docsSidebarNavigation } from './data/sidebar-navigation';
import { RouterLinkAdapter } from './router-adapters';
import useRouteActiveMatcher from './use-route-active-matcher';

type DocsShellProps = {
  children: ReactNode;
  navbarProps?: NavbarProps;
  navigation?: SidebarNavigationNode[];
};

function DocsShell({
  children,
  navbarProps = docsNavbarProps,
  navigation = docsSidebarNavigation,
}: DocsShellProps) {
  const getIsActive = useRouteActiveMatcher();

  return (
    <>
      <Sidebar
        LinkComponent={RouterLinkAdapter}
        getIsActive={getIsActive}
        brandHref={docsBranding.href}
        brandLogoSrc={docsBranding.logoSrc}
        brandTitle={docsBranding.title}
        navigation={navigation}
      />
      <main className="absolute left-16.25 text-color w-[calc(100%-65px)] p-4 min-h-[calc(100vh-97px)] bg-primary-color top-24.25">
        <div className="container mx-auto">
          <Navbar {...navbarProps} />
          {children}
        </div>
      </main>
    </>
  );
}

export default DocsShell;
