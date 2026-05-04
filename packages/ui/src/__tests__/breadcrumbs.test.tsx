import { render, screen, within } from '@testing-library/react';
import type { ComponentPropsWithoutRef } from 'react';
import { describe, expect, it } from 'vitest';

import { Breadcrumbs } from '../index';

type RouterLinkProps = ComponentPropsWithoutRef<'a'> & {
  to: string;
};

function RouterLink({ to, ...props }: RouterLinkProps) {
  return <a href={to} {...props} />;
}

describe('Breadcrumbs', () => {
  it('renders a breadcrumb landmark with an ordered list', () => {
    render(
      <Breadcrumbs>
        <Breadcrumbs.List>
          <Breadcrumbs.Item>
            <Breadcrumbs.Link href="/docs">Docs</Breadcrumbs.Link>
          </Breadcrumbs.Item>
          <Breadcrumbs.Separator />
          <Breadcrumbs.Item>
            <Breadcrumbs.Page>Components</Breadcrumbs.Page>
          </Breadcrumbs.Item>
        </Breadcrumbs.List>
      </Breadcrumbs>,
    );

    const nav = screen.getByRole('navigation', { name: 'Breadcrumb' });
    const list = within(nav).getByRole('list');

    expect(within(list).getAllByRole('listitem')).toHaveLength(2);
    expect(within(list).getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/docs');
    expect(screen.getByText('Components')).toHaveAttribute('aria-current', 'page');
  });

  it('renders link anchors with basic classes', () => {
    render(<Breadcrumbs.Link href="/docs">Docs</Breadcrumbs.Link>);

    const link = screen.getByRole('link', { name: 'Docs' });

    expect(link).toHaveAttribute('href', '/docs');
    expect(link).toHaveClass('text-foreground');
  });

  it('uses the default aria-label and supports custom labels', () => {
    render(
      <div>
        <Breadcrumbs>
          <Breadcrumbs.List>
            <Breadcrumbs.Item>Default</Breadcrumbs.Item>
          </Breadcrumbs.List>
        </Breadcrumbs>
        <Breadcrumbs aria-label="Documentation breadcrumb">
          <Breadcrumbs.List>
            <Breadcrumbs.Item>Custom</Breadcrumbs.Item>
          </Breadcrumbs.List>
        </Breadcrumbs>
      </div>,
    );

    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    expect(
      screen.getByRole('navigation', { name: 'Documentation breadcrumb' }),
    ).toBeInTheDocument();
  });

  it('marks the explicit current page', () => {
    render(
      <Breadcrumbs>
        <Breadcrumbs.List>
          <Breadcrumbs.Item>
            <Breadcrumbs.Link href="/docs">Docs</Breadcrumbs.Link>
          </Breadcrumbs.Item>
          <Breadcrumbs.Separator />
          <Breadcrumbs.Item>
            <Breadcrumbs.Page>Components</Breadcrumbs.Page>
          </Breadcrumbs.Item>
        </Breadcrumbs.List>
      </Breadcrumbs>,
    );

    expect(screen.getByText('Components')).toHaveAttribute('aria-current', 'page');
  });

  it('renders default and custom separators as decorative content', () => {
    const { container } = render(
      <div>
        <Breadcrumbs.Separator />
        <Breadcrumbs.Separator aria-hidden="false">›</Breadcrumbs.Separator>
      </div>,
    );

    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByText('›')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByText('›')).toHaveAttribute('role', 'presentation');
  });

  it('composes router-like links with asChild while preserving props and classes', () => {
    render(
      <Breadcrumbs>
        <Breadcrumbs.List>
          <Breadcrumbs.Item data-track="docs-breadcrumb">
            <Breadcrumbs.Link asChild className="ui-class">
              <RouterLink to="/docs" className="router-class" data-link="router">
                Docs
              </RouterLink>
            </Breadcrumbs.Link>
          </Breadcrumbs.Item>
          <Breadcrumbs.Separator />
          <Breadcrumbs.Item>
            <Breadcrumbs.Page>Current</Breadcrumbs.Page>
          </Breadcrumbs.Item>
        </Breadcrumbs.List>
      </Breadcrumbs>,
    );

    const link = screen.getByRole('link', { name: 'Docs' });

    expect(link).toHaveAttribute('href', '/docs');
    expect(link).toHaveClass('router-class');
    expect(link).toHaveClass('ui-class');
    expect(link).toHaveAttribute('data-link', 'router');
    expect(screen.getAllByRole('listitem')[0]).toHaveAttribute('data-track', 'docs-breadcrumb');
    expect(screen.getByText('Current')).toHaveAttribute('aria-current', 'page');
  });

  it('exposes the final compound parts', () => {
    expect('List' in Breadcrumbs).toBe(true);
    expect('Item' in Breadcrumbs).toBe(true);
    expect('Link' in Breadcrumbs).toBe(true);
    expect('Page' in Breadcrumbs).toBe(true);
    expect('Separator' in Breadcrumbs).toBe(true);
    expect('Ellipsis' in Breadcrumbs).toBe(false);
  });
});
