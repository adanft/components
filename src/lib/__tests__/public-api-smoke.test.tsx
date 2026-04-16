import { render, screen } from '@testing-library/react';
import { Circle, List, ShoppingCart, User } from 'lucide-react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import * as components from '../index';

import {
  Accordion,
  Alert,
  Badge,
  Box,
  Button,
  Checkbox,
  DropdownMenu,
  Field,
  Home,
  Modal,
  Navbar,
  NotFound,
  Popover,
  Profile,
  RadioGroup,
  Select,
  Sidebar,
  SidebarBody,
  SidebarGroup,
  SidebarHead,
  SidebarLink,
  SidebarSection,
  Skeleton,
  Switch,
  Table,
  Tabs,
  ThemeSwitch,
  Tooltip,
} from '../index';

describe('public API smoke', () => {
  it('renders exported components from src/lib without deep imports', () => {
    const onHeaderAction = () => undefined;

    const cases = [
      <Accordion key="accordion" value="overview" onValueChange={() => undefined}>
        <Accordion.Item value="overview">
          <Accordion.Header>
            <Accordion.Trigger>Overview</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>Overview content</Accordion.Content>
        </Accordion.Item>
      </Accordion>,
      <Alert key="alert">
        <Alert.Title>Heads up</Alert.Title>
        <Alert.Description>Review the latest changes before continuing.</Alert.Description>
      </Alert>,
      <Badge key="badge">Beta</Badge>,
      <Button key="button">Click me</Button>,
      <Box key="box" />,
      <Checkbox key="checkbox" aria-label="Smoke checkbox" onChange={() => {}} />,
      <DropdownMenu key="dropdown-menu" open={false} onOpenChange={() => undefined}>
        <DropdownMenu.Trigger>
          <button type="button">Actions</button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>Account</DropdownMenu.Label>
          <DropdownMenu.Item>Profile</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item disabled>Delete</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>,
      <Field key="field" id="email">
        <Field.Label>Email</Field.Label>
        <Field.Control asChild>
          <input type="email" />
        </Field.Control>
        <Field.Description>We never share your email.</Field.Description>
      </Field>,
      <Home key="home" />,
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
      <Popover key="popover" open={false} onOpenChange={() => undefined}>
        <Popover.Trigger>
          <button type="button">Open popover</button>
        </Popover.Trigger>
        <Popover.Content>Popover content</Popover.Content>
      </Popover>,
      <RadioGroup key="radio-group" value="starter" onValueChange={() => undefined}>
        <RadioGroup.Item value="starter" label="Starter" />
        <RadioGroup.Item value="pro" label="Pro" />
      </RadioGroup>,
      <Select
        key="select"
        aria-label="Select plan"
        defaultValue="starter"
        placeholder="Choose plan">
        <option value="starter">Starter</option>
        <option value="pro">Pro</option>
      </Select>,
      <Skeleton key="skeleton" className="h-4 w-24" />,
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
      <Switch
        key="switch"
        checked={false}
        aria-label="Airplane mode"
        onCheckedChange={() => undefined}
      />,
      <Tabs key="tabs" value="overview" onValueChange={() => undefined}>
        <Tabs.List>
          <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
          <Tabs.Trigger value="details">Details</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="overview">Overview panel</Tabs.Content>
        <Tabs.Content value="details">Details panel</Tabs.Content>
      </Tabs>,
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
      <Tooltip key="tooltip" open={false} onOpenChange={() => undefined}>
        <Tooltip.Trigger>
          <button type="button">Show tooltip</button>
        </Tooltip.Trigger>
        <Tooltip.Content>Tooltip content</Tooltip.Content>
      </Tooltip>,
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
