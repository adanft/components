import { render, screen } from '@testing-library/react';
import { Circle, List, ShoppingCart, User } from 'lucide-react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import * as components from '../index';

import {
  Box,
  Button,
  Checkbox,
  Home,
  InputField,
  Modal,
  Navbar,
  NotFound,
  Profile,
  Sidebar,
  SidebarBody,
  SidebarGroup,
  SidebarHead,
  SidebarLink,
  SidebarSection,
  Table,
  ThemeSwitch,
} from '../index';

describe('public API smoke', () => {
  it('renders exported components from src/lib without deep imports', () => {
    const onHeaderAction = () => undefined;

    const cases = [
      <Button key="button">Click me</Button>,
      <Box key="box" />,
      <Checkbox key="checkbox" aria-label="Smoke checkbox" onChange={() => {}} />,
      <Home key="home" />,
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
      <Sidebar key="sidebar" state={false} action={() => undefined} />,
      <SidebarHead
        key="sidebar-head"
        action={onHeaderAction}
        state={false}
        title="Docs"
        logoSrc="/logo.png"
      />,
      <MemoryRouter key="sidebar-body">
        <SidebarBody>
          <ul className="flex flex-col gap-2">
            <li>
              <SidebarSection text="Section" />
            </li>
            <li>
              <SidebarLink href="/overview" icon={User} text="Overview" />
            </li>
            <li>
              <SidebarGroup icon={List} text="Group">
                <ul className="flex flex-col gap-2">
                  <li>
                    <SidebarLink href="/group/child" icon={Circle} text="Child" />
                  </li>
                </ul>
              </SidebarGroup>
            </li>
          </ul>
        </SidebarBody>
      </MemoryRouter>,
      <MemoryRouter key="sidebar-link">
        <SidebarLink href="/orders" icon={ShoppingCart} text="Orders" />
      </MemoryRouter>,
      <ThemeSwitch key="theme-switch" />,
      <Table key="table" aria-label="Smoke table">
        <Table.Head
          headers={[{ id: 'name', label: 'Name' }]}
          getHeaderKey={(header) => header.id}
          renderHeader={(header) => header.label}
        />
        <Table.Body
          rows={[{ id: 1, name: 'Test' }]}
          getRowKey={(row) => row.id}
          getRowCells={(row) => [row.name]}
          renderCell={(cell) => cell}
        />
      </Table>,
    ];

    for (const component of cases) {
      const { container, unmount } = render(component);
      expect(container.firstChild).not.toBeNull();
      unmount();
    }
  });

  it('renders Modal compound component via portal', () => {
    const onClose = vi.fn();

    const { unmount } = render(
      <Modal open={true} onClose={onClose}>
        <Modal.Backdrop />
        <Modal.Panel data-testid="smoke-modal-panel">
          <Modal.Title>Smoke test</Modal.Title>
          <p>Modal content</p>
        </Modal.Panel>
      </Modal>,
    );

    expect(screen.getByTestId('smoke-modal-panel')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();

    unmount();
  });

  it('does not expose legacy table runtime exports', () => {
    expect(components.Table).toBe(Table);
    expect('Column' in components).toBe(false);
  });
});
