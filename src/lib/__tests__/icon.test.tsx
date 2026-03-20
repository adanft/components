import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Icon } from '../index';

describe('Icon', () => {
  it('composes Nerd Font base, symbol, and user className', () => {
    render(
      <Icon
        symbol="nf-fa-user"
        className="text-2xl text-brand"
        role="img"
        aria-label="User"
        data-testid="icon"
      />,
    );

    const icon = screen.getByTestId('icon');

    expect(icon).toHaveClass('nf', 'nf-fa-user', 'text-2xl', 'text-brand');
    expect(icon).toHaveAttribute('role', 'img');
    expect(icon).toHaveAttribute('aria-label', 'User');
  });

  it('passes through native attributes from consumer', () => {
    render(
      <Icon
        symbol="nf-md-react"
        data-testid="icon"
        title="React icon"
        aria-hidden="true"
        data-state="decorative"
      />,
    );

    const icon = screen.getByTestId('icon');
    expect(icon).toHaveAttribute('title', 'React icon');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
    expect(icon).toHaveAttribute('data-state', 'decorative');
  });
});
