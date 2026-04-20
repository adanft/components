import { Sidebar, SidebarBody, SidebarGroup, SidebarHead, SidebarSection } from '@adanft/ui';
import { type JSX, type ReactNode, useState } from 'react';
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

function renderNavigationNode(node: DocsSidebarNavigationNode, expanded: boolean): JSX.Element {
  if (node.type === 'heading') {
    return <SidebarSection text={node.text} className={expanded ? 'px-2' : 'px-6'} />;
  }

  if (node.type === 'group') {
    return (
      <SidebarGroup icon={node.icon} text={node.text}>
        <ul className="flex flex-col gap-2">
          {node.children.map((child) => (
            <li key={child.type === 'heading' ? `heading-${child.text}` : child.text}>
              {renderNavigationNode(child, expanded)}
            </li>
          ))}
        </ul>
      </SidebarGroup>
    );
  }

  return <RouterSidebarLink href={node.href} icon={node.icon} text={node.text} />;
}

function DocsShell({
  children,
  navbarProps = docsNavbarProps,
  navigation = docsSidebarNavigation,
}: DocsShellProps) {
  const [sidebarState, setSidebarState] = useState(false);

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
          <ul className="flex flex-col gap-2">
            {navigation.map((node) => (
              <li key={node.type === 'heading' ? `heading-${node.text}` : node.text}>
                {renderNavigationNode(node, sidebarState)}
              </li>
            ))}
          </ul>
        </SidebarBody>
      </Sidebar>
      <main className="absolute left-[65px] text-foreground w-[calc(100%-65px)] p-4 min-h-[calc(100vh-97px)] bg-background top-[97px]">
        <div className="container mx-auto">
          <Navbar {...navbarProps} />
          {children}
        </div>
      </main>
    </>
  );
}

export default DocsShell;
