import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Box } from '../index';

describe('Box', () => {
  it('applies the default visual contract', () => {
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

  it('supports semantic style switches without dropping the fixed border contract', () => {
    render(<Box data-testid="box" padding="none" shadow="none" surface="none" />);

    const box = screen.getByTestId('box');

    expect(box).toHaveClass('border', 'border-border', 'rounded-md');
    expect(box).not.toHaveClass('bg-surface', 'shadow-card', 'p-4');
  });

  it('merges custom className with base classes', () => {
    render(<Box className="custom-box" data-testid="box" />);

    const box = screen.getByTestId('box');

    expect(box).toHaveClass(
      'bg-surface',
      'border',
      'border-border',
      'shadow-card',
      'rounded-md',
      'p-4',
      'custom-box',
    );
  });
});
