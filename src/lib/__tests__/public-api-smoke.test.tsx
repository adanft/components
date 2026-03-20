import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import {
  Button,
  Box,
  Home,
  Icon,
  InputField,
  Navbar,
  Modal,
  NotFound,
  Profile,
  Sidebar,
  SidebarBody,
  SidebarGroup,
  SidebarHead,
  SidebarList,
  SidebarSection,
  SidebarHeader,
  SidebarLink,
  SidebarLinkList,
  ToggleTheme,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFoot,
  TableHead,
  TableHeadCell,
  TableRow,
} from '../index';

describe('public API smoke', () => {
  it('renders exported components from src/lib without deep imports', () => {
    const onHeaderAction = () => undefined;

    const cases = [
      <Button key="button">Click me</Button>,
      <Box key="box" />,
      <Home key="home" />,
      <Icon key="icon" symbol="nf-fa-user" className="text-lg text-brand" />,
      <InputField key="input-field" label="Email" id="email" placeholder="name@example.com" />,
      <Navbar key="navbar" searchPlaceholder="Search docs" />,
      <Modal.Root key="modal">
        <Modal.Trigger>
          <button type="button">Open modal</button>
        </Modal.Trigger>
        <Modal.Body closeIcon="x" aria-label="Smoke test modal">
          <p>Modal content</p>
          <Modal.Close>
            <button type="button">Close</button>
          </Modal.Close>
        </Modal.Body>
      </Modal.Root>,
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
      <Sidebar key="sidebar" state={false} action={() => undefined} />,
      <SidebarHead
        key="sidebar-head"
        action={onHeaderAction}
        state={false}
        title="Docs"
        logoSrc="/logo.png"
      />,
      <SidebarBody key="sidebar-body">
        <SidebarList>
          <SidebarSection text="Section" state={false} />
          <SidebarLink href="/overview" nfIconName="nf-fa-home" text="Overview" />
          <SidebarGroup iconName="nf-fa-list" text="Group">
            <SidebarList>
              <SidebarLink href="/group/child" nfIconName="nf-fa-circle" text="Child" />
            </SidebarList>
          </SidebarGroup>
        </SidebarList>
      </SidebarBody>,
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
      <Table key="table">
        <TableCaption>Smoke test table</TableCaption>
        <TableHead>
          <TableRow>
            <TableHeadCell>Column</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableBody>
        <TableFoot>
          <TableRow>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableFoot>
      </Table>,
    ];

    for (const component of cases) {
      const { container, unmount } = render(component);
      expect(container.firstChild).not.toBeNull();
      unmount();
    }
  });
});
