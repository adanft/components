import { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import {
  Sidebar,
  SidebarBody,
  SidebarGroup,
  SidebarHead,
  SidebarLink,
  SidebarList,
  SidebarSection,
} from '../index';

function StatefulSidebar() {
  const [state, action] = useState(false);

  return (
    <Sidebar state={state} action={action} data-testid="sidebar" className="static">
      <SidebarHead href="/" logoSrc="/logo.png" title="Docs" state={state} action={action} />
    </Sidebar>
  );
}

describe('Sidebar', () => {
  it('renders children and applies state-based width classes', () => {
    render(
      <Sidebar state action={() => undefined} data-testid="sidebar" className="static">
        <div>content</div>
      </Sidebar>,
    );

    const sidebar = screen.getByTestId('sidebar');

    expect(sidebar).toHaveClass('w-[321px]');
    expect(sidebar).toHaveClass('static');
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('toggles width classes when header action button is clicked', () => {
    const { container } = render(<StatefulSidebar />);

    const sidebar = screen.getByTestId('sidebar');
    const toggle = container.querySelector('header button');

    expect(sidebar).toHaveClass('w-[65px]');
    expect(toggle).not.toBeNull();

    fireEvent.click(toggle as HTMLButtonElement);

    expect(sidebar).toHaveClass('w-[321px]');
  });

  it('supports composable sidebar body/list/group structure', () => {
    const [state, action] = [false, () => undefined];

    render(
      <Sidebar state={state} action={action} className="static">
        <SidebarHead href="/" logoSrc="/logo.png" title="Docs" state={state} action={action} />
        <SidebarBody>
          <SidebarList>
            <SidebarSection text="Main" state={state} />
            <SidebarLink href="/overview" nfIconName="nf-fa-home" text="Overview" />
            <SidebarGroup iconName="nf-fa-folder_open" text="Reports">
              <SidebarList>
                <SidebarLink href="/reports/monthly" nfIconName="nf-fa-calendar" text="Monthly" />
              </SidebarList>
            </SidebarGroup>
            <SidebarSection text="Secondary" state={state} />
          </SidebarList>
        </SidebarBody>
      </Sidebar>,
    );

    expect(screen.getByRole('link', { name: /overview/i })).toBeInTheDocument();
    expect(screen.getByText('Main')).toBeInTheDocument();
    expect(screen.getByText('Reports')).toBeInTheDocument();
    expect(screen.getAllByRole('list').length).toBeGreaterThanOrEqual(2);
    expect(screen.getByRole('button', { name: /reports/i })).toBeInTheDocument();
  });

  it('uses collapsible group behavior with open-state styling', () => {
    const { container } = render(
      <SidebarGroup iconName="nf-fa-folder_open" text="Reports">
        <SidebarList>
          <SidebarLink href="/reports/monthly" nfIconName="nf-fa-calendar" text="Monthly" />
        </SidebarList>
      </SidebarGroup>,
    );

    const groupButton = screen.getByRole('button', { name: /reports/i });
    const groupRoot = container.firstElementChild;
    const collapsible = groupRoot?.querySelector('div');
    const chevron = groupButton.querySelector('.nf-fa-angle_down');

    expect(groupButton).toHaveAttribute('aria-expanded', 'false');
    expect(groupRoot).not.toHaveClass('bg-indigo-500/5');
    expect(collapsible).toHaveClass('grid-rows-[0fr]');
    expect(chevron).not.toHaveClass('rotate-180');

    fireEvent.click(groupButton);

    expect(groupButton).toHaveAttribute('aria-expanded', 'true');
    expect(groupRoot).toHaveClass('bg-indigo-500/5');
    expect(collapsible).toHaveClass('grid-rows-[1fr]');
    expect(chevron).toHaveClass('rotate-180');
  });

  it('wraps each direct child in a list item preserving order', () => {
    render(
      <SidebarList>
        <SidebarSection text="General" state={false} />
        <SidebarLink href="/dashboard" nfIconName="nf-md-view_dashboard" text="Dashboard" />
      </SidebarList>,
    );

    const list = screen.getByRole('list');
    const listItems = list.querySelectorAll(':scope > li');

    expect(listItems).toHaveLength(2);
    expect(listItems[0]).toHaveTextContent('General');
    expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument();
  });

  it('renders link children without requiring li wrappers', () => {
    render(
      <SidebarList>
        <SidebarLink href="/orders" nfIconName="nf-fa-shopping_cart" text="Orders" />
      </SidebarList>,
    );

    const list = screen.getByRole('list');
    const listItems = list.querySelectorAll(':scope > li');

    expect(listItems).toHaveLength(1);
    expect(screen.queryByText('General')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /orders/i })).toBeInTheDocument();
  });
});
