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
