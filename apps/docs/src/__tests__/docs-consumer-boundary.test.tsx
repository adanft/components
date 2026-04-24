import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import App from '../app';
import { docsPath } from '../data/routes';
import DocsShell from '../shell';

describe('docs consumer boundary', () => {
  it('renders docs shell navigation using the router adapter', () => {
    const tooltipHref = docsPath('/components/tooltip');

    render(
      <MemoryRouter initialEntries={[tooltipHref]}>
        <DocsShell>
          <div>docs content</div>
        </DocsShell>
      </MemoryRouter>,
    );

    const tooltipLink = screen.getByRole('link', { name: /tooltip/i });

    expect(tooltipLink).toHaveClass('bg-brand');
  });

  it('does not render demo navigation entries without docs pages', () => {
    render(
      <MemoryRouter initialEntries={[docsPath('/components/button')]}>
        <DocsShell>
          <div>docs content</div>
        </DocsShell>
      </MemoryRouter>,
    );

    expect(screen.queryByRole('link', { name: /orders/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /reports/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /analytics/i })).not.toBeInTheDocument();
  });

  it('renders docs routes without importing docs-only pages from @adanft/ui', () => {
    render(
      <MemoryRouter initialEntries={[docsPath('/components/label')]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /label/i })).toBeInTheDocument();
  });
});
