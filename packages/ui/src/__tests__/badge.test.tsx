import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Badge } from '../index';

describe('Badge', () => {
  it('renders as an inline span with default styling', () => {
    render(<Badge>Beta</Badge>);

    const badge = screen.getByText('Beta');

    expect(badge.tagName).toBe('SPAN');
    expect(badge).toHaveClass('bg-muted', 'text-white');
    expect(badge).toHaveClass('px-2', 'text-xs', 'leading-4');
  });

  it('supports variant styles', () => {
    render(<Badge variant="success">Active</Badge>);

    expect(screen.getByText('Active')).toHaveClass('bg-success/10');
  });

  it('supports primary variant styles', () => {
    render(<Badge variant="primary">New</Badge>);

    expect(screen.getByText('New')).toHaveClass('bg-brand/10', 'text-brand');
  });
});
