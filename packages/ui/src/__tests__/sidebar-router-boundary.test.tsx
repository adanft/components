import { Sidebar, SidebarGroup, SidebarGroupLink, SidebarLink } from '@adanft/ui';
import { render, screen } from '@testing-library/react';
import { FolderOpen, ShoppingCart } from 'lucide-react';
import type { ComponentPropsWithoutRef } from 'react';
import { describe, expect, it } from 'vitest';

function CustomLink(props: ComponentPropsWithoutRef<'a'>) {
  return <a {...props} />;
}

describe('SidebarLink router boundary', () => {
  it('renders a plain anchor element without router context', () => {
    render(<SidebarLink href="/orders" icon={ShoppingCart} text="Orders" />);

    const link = screen.getByRole('link', { name: /orders/i });

    expect(link).toHaveAttribute('href', '/orders');
    expect(link).not.toHaveAttribute('aria-current');
  });

  it('exposes current-page semantics through explicit props', () => {
    render(<SidebarLink href="/orders" icon={ShoppingCart} text="Orders" active={true} />);

    expect(screen.getByRole('link', { name: /orders/i })).toHaveAttribute('aria-current', 'page');
  });

  it('reuses a caller-provided link element through asChild', () => {
    render(
      <SidebarLink asChild icon={ShoppingCart} text="Orders" active={true}>
        <CustomLink href="/orders" data-testid="custom-link" />
      </SidebarLink>,
    );

    const link = screen.getByRole('link', { name: /orders/i });

    expect(screen.getByTestId('custom-link')).toBe(link);
    expect(link).toHaveAttribute('href', '/orders');
    expect(link).toHaveAttribute('aria-current', 'page');
  });

  it('reuses a caller-provided group link element through asChild', () => {
    render(
      <SidebarGroupLink asChild text="Order history" active={true}>
        <CustomLink href="/orders/history" data-testid="custom-group-link" />
      </SidebarGroupLink>,
    );

    const link = screen.getByRole('link', { name: /order history/i });

    expect(screen.getByTestId('custom-group-link')).toBe(link);
    expect(link).toHaveAttribute('href', '/orders/history');
    expect(link).toHaveAttribute('aria-current', 'page');
  });

  it('allows direct SidebarGroupLink asChild children inside SidebarGroup', () => {
    render(
      <Sidebar state action={() => undefined} className="static">
        <SidebarGroup icon={FolderOpen} text="Orders">
          <SidebarGroupLink asChild text="Order history" active={true}>
            <CustomLink href="/orders/history" data-testid="group-child-link" />
          </SidebarGroupLink>
        </SidebarGroup>
      </Sidebar>,
    );

    screen.getByRole('button', { name: /orders/i }).click();

    const link = screen.getByRole('link', { name: /order history/i });

    expect(screen.getByTestId('group-child-link')).toBe(link);
    expect(link).toHaveAttribute('href', '/orders/history');
    expect(link).toHaveAttribute('aria-current', 'page');
  });
});
