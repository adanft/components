import { fireEvent, render, screen } from '@testing-library/react';
import { Calendar, FolderOpen, Home, LayoutDashboard, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import {
  Sidebar,
  SidebarBody,
  SidebarGroup,
  SidebarHead,
  SidebarLink,
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

    expect(sidebar).toHaveClass('w-80.25');
    expect(sidebar).toHaveClass('static');
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('toggles width classes when header action button is clicked', () => {
    const { container } = render(<StatefulSidebar />);

    const sidebar = screen.getByTestId('sidebar');
    const toggle = container.querySelector('header button');

    expect(sidebar).toHaveClass('w-16.25');
    expect(toggle).not.toBeNull();

    fireEvent.click(toggle as HTMLButtonElement);

    expect(sidebar).toHaveClass('w-80.25');
  });

  it('supports composable sidebar body/list/group structure', () => {
    const [state, action] = [false, () => undefined];

    render(
      <MemoryRouter>
        <Sidebar state={state} action={action} className="static">
          <SidebarHead href="/" logoSrc="/logo.png" title="Docs" state={state} action={action} />
          <SidebarBody>
            <ul className="flex flex-col gap-2">
              <li>
                <SidebarSection text="Main" />
              </li>
              <li>
                <SidebarLink href="/overview" icon={Home} text="Overview" />
              </li>
              <li>
                <SidebarGroup icon={FolderOpen} text="Reports">
                  <ul className="flex flex-col gap-2">
                    <li>
                      <SidebarLink href="/reports/monthly" icon={Calendar} text="Monthly" />
                    </li>
                  </ul>
                </SidebarGroup>
              </li>
              <li>
                <SidebarSection text="Secondary" />
              </li>
            </ul>
          </SidebarBody>
        </Sidebar>
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: /overview/i })).toBeInTheDocument();
    expect(screen.getByText('Main')).toBeInTheDocument();
    expect(screen.getByText('Reports')).toBeInTheDocument();
    expect(screen.getAllByRole('list').length).toBeGreaterThanOrEqual(2);
    expect(screen.getByRole('button', { name: /reports/i })).toBeInTheDocument();
  });

  it('uses collapsible group behavior with open-state styling', () => {
    const { container } = render(
      <MemoryRouter>
        <SidebarGroup icon={FolderOpen} text="Reports">
          <ul className="flex flex-col gap-2">
            <li>
              <SidebarLink href="/reports/monthly" icon={Calendar} text="Monthly" />
            </li>
          </ul>
        </SidebarGroup>
      </MemoryRouter>,
    );

    const groupButton = screen.getByRole('button', { name: /reports/i });
    const groupRoot = container.firstElementChild;
    const collapsible = groupRoot?.querySelector('div');
    const chevrons = groupButton.querySelectorAll('svg');
    const chevron = chevrons.item(chevrons.length - 1);

    expect(groupButton).toHaveAttribute('aria-expanded', 'false');
    expect(groupRoot).not.toHaveClass('bg-brand/5');
    expect(collapsible).toHaveClass('grid-rows-[0fr]');
    expect(chevron).not.toHaveClass('rotate-180');

    fireEvent.click(groupButton);

    expect(groupButton).toHaveAttribute('aria-expanded', 'true');
    expect(groupRoot).toHaveClass('bg-brand/5');
    expect(collapsible).toHaveClass('grid-rows-[1fr]');
    expect(chevron).toHaveClass('rotate-180');
  });

  it('renders list items in order using ul/li structure', () => {
    render(
      <MemoryRouter>
        <ul className="flex flex-col gap-2">
          <li>
            <SidebarSection text="General" />
          </li>
          <li>
            <SidebarLink href="/dashboard" icon={LayoutDashboard} text="Dashboard" />
          </li>
        </ul>
      </MemoryRouter>,
    );

    const list = screen.getByRole('list');
    const listItems = list.querySelectorAll(':scope > li');

    expect(listItems).toHaveLength(2);
    expect(listItems[0]).toHaveTextContent('General');
    expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument();
  });

  it('renders link children inside li wrappers', () => {
    render(
      <MemoryRouter>
        <ul className="flex flex-col gap-2">
          <li>
            <SidebarLink href="/orders" icon={ShoppingCart} text="Orders" />
          </li>
        </ul>
      </MemoryRouter>,
    );

    const list = screen.getByRole('list');
    const listItems = list.querySelectorAll(':scope > li');

    expect(listItems).toHaveLength(1);
    expect(screen.queryByText('General')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /orders/i })).toBeInTheDocument();
  });
});
