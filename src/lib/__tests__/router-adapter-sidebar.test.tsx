import { render, screen } from '@testing-library/react';
import { ShoppingCart, Users } from 'lucide-react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { docsPath } from '../../docs/data/routes';
import DocsShell from '../../docs/shell';

describe('router adapter sidebar behavior', () => {
  it('marks the matching docs link as active using adapter-driven inputs', () => {
    const ordersHref = docsPath('/orders');
    const usersHref = docsPath('/users');

    const navigation = [
      {
        type: 'link' as const,
        icon: ShoppingCart,
        text: 'Orders',
        href: ordersHref,
      },
      { type: 'link' as const, icon: Users, text: 'Users', href: usersHref },
    ];

    render(
      <MemoryRouter initialEntries={[ordersHref]}>
        <DocsShell navigation={navigation}>
          <div>docs content</div>
        </DocsShell>
      </MemoryRouter>,
    );

    const ordersLink = screen.getByRole('link', { name: /orders/i });
    const usersLink = screen.getByRole('link', { name: /users/i });

    expect(ordersLink).toHaveClass('bg-brand');
    expect(usersLink).not.toHaveClass('bg-brand');
  });
});
