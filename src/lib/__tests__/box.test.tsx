import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Box } from '../index';

describe('Box', () => {
  it('always applies fixed container styles', () => {
    render(<Box data-testid="box" />);

    const box = screen.getByTestId('box');

    expect(box).toHaveClass(
      'bg-surface',
      'border',
      'border-border',
      'shadow-card',
      'rounded-md',
      'p-4',
    );
  });

  it('merges custom className with base classes', () => {
    render(<Box className="rounded-lg custom-box" data-testid="box" />);

    const box = screen.getByTestId('box');

    expect(box).toHaveClass(
      'bg-surface',
      'border',
      'border-border',
      'shadow-card',
      'p-4',
      'rounded-lg',
      'custom-box',
    );
    expect(box).not.toHaveClass('rounded-md');
  });
});
