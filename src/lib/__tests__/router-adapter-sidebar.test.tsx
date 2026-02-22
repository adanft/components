import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import DocsShell from '../../docs/shell';
import { docsPath } from '../../docs/data/routes';

describe('router adapter sidebar behavior', () => {
  it('marks the matching docs link as active using adapter-driven inputs', () => {
    const ordersHref = docsPath('/orders');
    const usersHref = docsPath('/users');

    const navigation = [
      {
        type: 'link' as const,
        nfIconName: 'nf-fa-shopping_cart',
        text: 'Orders',
        href: ordersHref,
      },
      { type: 'link' as const, nfIconName: 'nf-fa-users', text: 'Users', href: usersHref },
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

    expect(ordersLink).toHaveClass('ui-nav-active');
    expect(usersLink).not.toHaveClass('ui-nav-active');
  });
});
