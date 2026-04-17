import { SidebarLink } from '@adanft/ui';
import { render, screen } from '@testing-library/react';
import { ShoppingCart } from 'lucide-react';
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
  });

  it('applies active styling through explicit props', () => {
    render(<SidebarLink href="/orders" icon={ShoppingCart} text="Orders" active={true} />);

    expect(screen.getByRole('link', { name: /orders/i })).toHaveClass('bg-brand');
  });

  it('composes presentation onto a caller-provided link element', () => {
    render(
      <SidebarLink asChild href="/orders" icon={ShoppingCart} text="Orders" active={true}>
        <CustomLink href="/orders" data-testid="custom-link" />
      </SidebarLink>,
    );

    expect(screen.getByTestId('custom-link')).toHaveClass('bg-brand');
    expect(screen.getByRole('link', { name: /orders/i })).toHaveAttribute('href', '/orders');
  });
});
