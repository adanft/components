import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import App from '../app';
import { docsPath } from '../data/routes';
import DocsShell from '../shell';

describe('docs consumer boundary', () => {
  it('renders docs shell navigation using the router adapter', () => {
    const ordersHref = docsPath('/orders');

    render(
      <MemoryRouter initialEntries={[ordersHref]}>
        <DocsShell>
          <div>docs content</div>
        </DocsShell>
      </MemoryRouter>,
    );

    const ordersLink = screen.getByRole('link', { name: /orders/i });

    expect(ordersLink).toHaveClass('bg-brand');
  });

  it('marks a sidebar group trigger active when one of its children matches the route', () => {
    const reportHref = docsPath('/financial-report');

    render(
      <MemoryRouter initialEntries={[reportHref]}>
        <DocsShell>
          <div>docs content</div>
        </DocsShell>
      </MemoryRouter>,
    );

    const reportsButton = screen.getByRole('button', { name: /reports/i });

    expect(reportsButton).toHaveClass('text-brand');

    fireEvent.click(reportsButton);

    const financialReportLink = screen.getByRole('link', { name: /financial report/i });

    expect(financialReportLink).toHaveClass('bg-brand');
  });

  it('renders docs routes without importing docs-only pages from @adanft/ui', () => {
    render(
      <MemoryRouter initialEntries={[docsPath('/components/button')]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /button/i })).toBeInTheDocument();
  });
});
