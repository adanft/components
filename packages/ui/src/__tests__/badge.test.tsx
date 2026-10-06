import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Badge } from '../index';

describe('Badge', () => {
  it('renders as an inline span with default styling', () => {
    render(<Badge>Beta</Badge>);

    const badge = screen.getByText('Beta');

    expect(badge.tagName).toBe('SPAN');
    expect(badge).toHaveClass('bg-muted', 'text-on-muted');
    expect(badge).toHaveClass('px-2', 'text-xs', 'leading-4');
  });

  it('supports variant styles', () => {
    render(<Badge variant="success">Active</Badge>);

    expect(screen.getByText('Active')).toHaveClass('bg-success/10', 'text-accent-success');
  });

  it.each([
    ['danger', 'bg-danger/10', 'text-accent-danger'],
    ['outline', 'bg-background', 'text-foreground'],
  ] as const)('supports %s variant styles', (variant, background, text) => {
    render(<Badge variant={variant}>{variant}</Badge>);
    expect(screen.getByText(variant)).toHaveClass(background, text);
  });

  it('supports primary variant styles', () => {
    render(<Badge variant="primary">New</Badge>);

    expect(screen.getByText('New')).toHaveClass('bg-brand/10', 'text-accent-brand');
  });
});
