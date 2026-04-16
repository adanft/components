import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Badge } from '../index';

describe('Badge', () => {
  it('renders as an inline span with default styling', () => {
    render(<Badge>Beta</Badge>);

    const badge = screen.getByText('Beta');

    expect(badge.tagName).toBe('SPAN');
    expect(badge).toHaveClass('inline-flex');
    expect(badge).toHaveClass('bg-muted');
    expect(badge).toHaveClass('text-sm');
  });

  it('supports variant styles', () => {
    render(<Badge variant="success">Active</Badge>);

    expect(screen.getByText('Active')).toHaveClass('bg-success/15');
  });

  it('supports size styles', () => {
    render(<Badge size="sm">Draft</Badge>);

    expect(screen.getByText('Draft')).toHaveClass('text-xs');
  });
});
