import { fireEvent, render, screen } from '@testing-library/react';
import { FolderOpen, Home, LayoutDashboard, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';

import {
  Sidebar,
  SidebarBody,
  SidebarGroup,
  SidebarGroupLink,
  SidebarHead,
  SidebarLink,
  SidebarSection,
} from '../index';

function StatefulSidebar() {
  const [state, action] = useState(false);

  return (
    <Sidebar state={state} action={action} data-testid="sidebar" className="static">
      <SidebarHead href="/" logoSrc="/logo.png" title="Docs" />
    </Sidebar>
  );
}

describe('Sidebar', () => {
  it('renders children and forwards custom class names', () => {
    render(
      <Sidebar state action={() => undefined} data-testid="sidebar" className="static">
        <div>content</div>
      </Sidebar>,
    );

    const sidebar = screen.getByTestId('sidebar');

    expect(sidebar).toHaveClass('static');
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('toggles the header action through its accessible label', () => {
    render(<StatefulSidebar />);

    const toggle = screen.getByRole('button', { name: /expand sidebar/i });

    fireEvent.click(toggle);

    expect(screen.getByRole('button', { name: /collapse sidebar/i })).toBeInTheDocument();
  });

  it('forwards custom header props through SidebarHead', () => {
    render(
      <Sidebar state action={() => undefined} className="static">
        <SidebarHead
          href="/"
          logoSrc="/logo.png"
          title="Docs"
          className="bg-brand"
          data-testid="sidebar-head"
        />
      </Sidebar>,
    );

    expect(screen.getByTestId('sidebar-head')).toHaveClass('bg-brand');
  });

  it('supports direct composition inside SidebarBody', () => {
    const [state, action] = [true, () => undefined];

    render(
      <Sidebar state={state} action={action} className="static">
        <SidebarHead href="/" logoSrc="/logo.png" title="Docs" />
        <SidebarBody>
          <SidebarSection text="Main" />
          <SidebarLink href="/overview" icon={Home} text="Overview" />
          <SidebarGroup icon={FolderOpen} text="Reports">
            <SidebarGroupLink href="/reports/monthly" text="Monthly" />
          </SidebarGroup>
          <SidebarSection text="Secondary" />
        </SidebarBody>
      </Sidebar>,
    );

    expect(screen.getByRole('link', { name: /overview/i })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: /sidebar/i })).toBeInTheDocument();
    expect(screen.getByText('Main')).toBeInTheDocument();
    expect(screen.getByText('Reports')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reports/i })).toBeInTheDocument();
  });

  it('applies section spacing from sidebar state', () => {
    const { rerender } = render(
      <Sidebar state action={() => undefined} className="static">
        <SidebarSection text="Main" />
      </Sidebar>,
    );

    expect(screen.getByText('Main').closest('h5')).toHaveClass('px-2');

    rerender(
      <Sidebar state={false} action={() => undefined} className="static">
        <SidebarSection text="Main" />
      </Sidebar>,
    );

    expect(screen.getByText('Main').closest('h5')).toHaveClass('px-6');
  });

  it('exposes expanded-state semantics for inline groups', () => {
    render(
      <Sidebar state action={() => undefined} className="static">
        <SidebarGroup icon={FolderOpen} text="Reports">
          <SidebarGroupLink href="/reports/monthly" text="Monthly" />
        </SidebarGroup>
      </Sidebar>,
    );

    const groupButton = screen.getByRole('button', { name: /reports/i });
    const collapsibleId = groupButton.getAttribute('aria-controls');

    expect(groupButton).toHaveAttribute('aria-expanded', 'false');
    expect(collapsibleId).toBeTruthy();
    expect(document.getElementById(collapsibleId as string)).not.toBeNull();

    fireEvent.click(groupButton);

    expect(groupButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('link', { name: /monthly/i })).toBeInTheDocument();
  });

  it('starts inline groups open when a nested link is active', () => {
    render(
      <Sidebar state action={() => undefined} className="static">
        <SidebarGroup icon={FolderOpen} text="Reports">
          <SidebarGroupLink href="/reports/monthly" text="Monthly" />
          <SidebarGroupLink active href="/reports/weekly" text="Weekly" />
        </SidebarGroup>
      </Sidebar>,
    );

    const groupButton = screen.getByRole('button', { name: /reports/i });

    expect(groupButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('link', { name: /monthly/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /weekly/i })).toHaveAttribute('aria-current', 'page');
  });

  it('allows manually closing a group that started open from an active nested link', () => {
    render(
      <Sidebar state action={() => undefined} className="static">
        <SidebarGroup icon={FolderOpen} text="Reports">
          <SidebarGroupLink href="/reports/monthly" text="Monthly" />
          <SidebarGroupLink active href="/reports/weekly" text="Weekly" />
        </SidebarGroup>
      </Sidebar>,
    );

    const groupButton = screen.getByRole('button', { name: /reports/i });

    expect(groupButton).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(groupButton);

    expect(groupButton).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByRole('link', { name: /weekly/i })).toHaveAttribute('aria-current', 'page');
  });

  it('derives inline group expansion from active nested links after mount', () => {
    const { rerender } = render(
      <Sidebar state action={() => undefined} className="static">
        <SidebarGroup icon={FolderOpen} text="Reports">
          <SidebarGroupLink href="/reports/monthly" text="Monthly" />
          <SidebarGroupLink href="/reports/weekly" text="Weekly" />
        </SidebarGroup>
      </Sidebar>,
    );

    expect(screen.getByRole('button', { name: /reports/i })).toHaveAttribute(
      'aria-expanded',
      'false',
    );

    rerender(
      <Sidebar state action={() => undefined} className="static">
        <SidebarGroup icon={FolderOpen} text="Reports">
          <SidebarGroupLink active href="/reports/monthly" text="Monthly" />
          <SidebarGroupLink href="/reports/weekly" text="Weekly" />
        </SidebarGroup>
      </Sidebar>,
    );

    expect(screen.getByRole('button', { name: /reports/i })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(screen.getByRole('link', { name: /monthly/i })).toHaveAttribute('aria-current', 'page');

    rerender(
      <Sidebar state action={() => undefined} className="static">
        <SidebarGroup icon={FolderOpen} text="Reports">
          <SidebarGroupLink href="/reports/monthly" text="Monthly" />
          <SidebarGroupLink active href="/reports/weekly" text="Weekly" />
        </SidebarGroup>
      </Sidebar>,
    );

    expect(screen.getByRole('button', { name: /reports/i })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(screen.getByRole('link', { name: /weekly/i })).toHaveAttribute('aria-current', 'page');
  });

  it('reopens a manually closed group when the active nested link changes', () => {
    const { rerender } = render(
      <Sidebar state action={() => undefined} className="static">
        <SidebarGroup icon={FolderOpen} text="Reports">
          <SidebarGroupLink active href="/reports/monthly" text="Monthly" />
          <SidebarGroupLink href="/reports/weekly" text="Weekly" />
        </SidebarGroup>
      </Sidebar>,
    );

    const groupButton = screen.getByRole('button', { name: /reports/i });

    expect(groupButton).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(groupButton);

    expect(groupButton).toHaveAttribute('aria-expanded', 'false');

    rerender(
      <Sidebar state action={() => undefined} className="static">
        <SidebarGroup icon={FolderOpen} text="Reports">
          <SidebarGroupLink href="/reports/monthly" text="Monthly" />
          <SidebarGroupLink active href="/reports/weekly" text="Weekly" />
        </SidebarGroup>
      </Sidebar>,
    );

    expect(screen.getByRole('button', { name: /reports/i })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(screen.getByRole('link', { name: /weekly/i })).toHaveAttribute('aria-current', 'page');
  });

  it('opens collapsed groups without exposing inline disclosure wiring', () => {
    render(
      <Sidebar state={false} action={() => undefined} className="static">
        <SidebarGroup icon={FolderOpen} text="Reports">
          <SidebarGroupLink href="/reports/monthly" text="Monthly" />
        </SidebarGroup>
      </Sidebar>,
    );

    const groupButton = screen.getByRole('button', { name: /reports/i });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(groupButton).toHaveAttribute('aria-expanded', 'false');
    expect(groupButton).not.toHaveAttribute('aria-haspopup');
    expect(groupButton).not.toHaveAttribute('aria-controls');

    fireEvent.click(groupButton);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(groupButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('link', { name: /monthly/i })).toBeInTheDocument();
  });

  it('renders nested links from explicit SidebarGroupLink children', () => {
    render(
      <Sidebar state action={() => undefined} className="static">
        <SidebarGroup icon={FolderOpen} text="Reports">
          <SidebarGroupLink href="/reports/monthly" text="Monthly" />
          <SidebarGroupLink href="/reports/weekly" text="Weekly" />
        </SidebarGroup>
      </Sidebar>,
    );

    fireEvent.click(screen.getByRole('button', { name: /reports/i }));

    expect(screen.getByRole('link', { name: /monthly/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /weekly/i })).toBeInTheDocument();
  });

  it('rejects non-SidebarGroupLink children', () => {
    expect(() =>
      render(
        <Sidebar state action={() => undefined} className="static">
          <SidebarGroup icon={FolderOpen} text="Reports">
            <SidebarLink href="/reports/monthly" icon={Home} text="Monthly" />
          </SidebarGroup>
        </Sidebar>,
      ),
    ).toThrow('<SidebarGroup> only accepts <SidebarGroupLink> children.');
  });

  it('renders top-level items in order without list wrappers', () => {
    render(
      <SidebarBody>
        <SidebarSection text="General" />
        <SidebarLink href="/dashboard" icon={LayoutDashboard} text="Dashboard" />
      </SidebarBody>,
    );

    const navigation = screen.getByRole('navigation', { name: /sidebar/i });
    const children = Array.from(navigation.children);

    expect(children).toHaveLength(2);
    expect(children[0]).toHaveTextContent('General');
    expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument();
  });

  it('renders links directly inside SidebarBody', () => {
    render(
      <SidebarBody>
        <SidebarLink href="/orders" icon={ShoppingCart} text="Orders" />
      </SidebarBody>,
    );

    const navigation = screen.getByRole('navigation', { name: /sidebar/i });

    expect(navigation.children).toHaveLength(1);
    expect(screen.queryByText('General')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /orders/i })).toBeInTheDocument();
  });
});
