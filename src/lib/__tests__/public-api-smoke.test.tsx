import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import {
  Box,
  Home,
  Icon,
  InputField,
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
      <Box key="box" />,
      <Home key="home" />,
      <Icon key="icon" symbol="nf-fa-user" className="text-lg ui-text-brand" />,
      <InputField key="input-field" label="Email" id="email" placeholder="name@example.com" />,
      <Navbar key="navbar" searchPlaceholder="Search docs" />,
      <NotFound key="not-found" />,
      <Profile
        key="profile"
        userKey="@taylor"
        fullName="Taylor Brown"
        btnAction={() => undefined}
        btnName="Log out"
        avatarType="image"
        avatarSrc="https://example.com/avatar.png"
        avatarAlt="Taylor avatar"
      />,
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
