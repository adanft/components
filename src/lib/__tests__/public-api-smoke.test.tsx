import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import {
  Home,
  Navbar,
  NotFound,
  Profile,
  Sidebar,
  SidebarHeader,
  SidebarLink,
  SidebarLinkList,
  ToggleTheme,
} from '../index';

describe('public API smoke', () => {
  it('renders exported components from src/lib without deep imports', () => {
    const onHeaderAction = () => undefined;

    const cases = [
      <Home key="home" />,
      <Navbar key="navbar" searchPlaceholder="Search docs" />,
      <NotFound key="not-found" />,
      <Profile key="profile" />,
      <Sidebar key="sidebar" title="Docs" navigation={[]} />,
      <SidebarHeader key="sidebar-header" action={onHeaderAction} state={false} title="Docs" />,
      <SidebarLink
        key="sidebar-link"
        href="/orders"
        nfIconName="nf-fa-shopping_cart"
        text="Orders"
      />,
      <SidebarLinkList key="sidebar-link-list" iconName="nf-fa-list" text="Group">
        <ul>
          <li>Child</li>
        </ul>
      </SidebarLinkList>,
      <ToggleTheme key="toggle-theme" />,
    ];

    for (const component of cases) {
      const { container, unmount } = render(component);
      expect(container.firstChild).not.toBeNull();
      unmount();
    }
  });
});
