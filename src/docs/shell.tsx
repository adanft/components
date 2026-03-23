import { Fragment, type JSX, type ReactNode, useState } from "react";

import {
  Navbar,
  type NavbarProps,
  Sidebar,
  SidebarBody,
  SidebarGroup,
  SidebarHead,
  SidebarLink,
  SidebarList,
  SidebarSection,
} from "../lib";
import { docsBranding } from "./data/branding";
import { docsNavbarProps } from "./data/navbar";
import {
  type DocsSidebarNavigationNode,
  docsSidebarNavigation,
} from "./data/sidebar-navigation";

type DocsShellProps = {
  children: ReactNode;
  navbarProps?: NavbarProps;
  navigation?: DocsSidebarNavigationNode[];
};

function renderNavigationNode(
  node: DocsSidebarNavigationNode,
  expanded: boolean,
): JSX.Element {
  if (node.type === "heading") {
    return <SidebarSection text={node.text} state={expanded} />;
  }

  if (node.type === "group") {
    return (
      <SidebarGroup iconName={node.iconName} text={node.text}>
        <SidebarList>
          {node.children.map((child) => (
            <Fragment
              key={
                child.type === "heading" ? `heading-${child.text}` : child.text
              }
            >
              {renderNavigationNode(child, expanded)}
            </Fragment>
          ))}
        </SidebarList>
      </SidebarGroup>
    );
  }

  return (
    <SidebarLink
      href={node.href}
      nfIconName={node.nfIconName}
      text={node.text}
    />
  );
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
          <SidebarList>
            {navigation.map((node) => (
              <Fragment
                key={
                  node.type === "heading" ? `heading-${node.text}` : node.text
                }
              >
                {renderNavigationNode(node, sidebarState)}
              </Fragment>
            ))}
          </SidebarList>
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
