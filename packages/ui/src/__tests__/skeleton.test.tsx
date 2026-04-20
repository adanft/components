import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Skeleton } from '../index';

describe('Skeleton', () => {
  it('renders with default pulse animation', () => {
    render(<Skeleton data-testid="skeleton" className="h-4 w-24 rounded-sm" />);

    const skeleton = screen.getByTestId('skeleton');

    expect(skeleton).toHaveAttribute('aria-hidden', 'true');
    expect(skeleton).toHaveClass('bg-muted');
    expect(skeleton).toHaveClass('rounded-sm');
    expect(skeleton).toHaveClass('motion-safe:animate-pulse');
  });

  it('supports consumer-defined shapes through className', () => {
    render(<Skeleton data-testid="skeleton" className="size-10 rounded-full" />);

    expect(screen.getByTestId('skeleton')).toHaveClass('rounded-full');
  });

  it('supports turning animation off', () => {
    render(<Skeleton data-testid="skeleton" animation="none" className="h-10 w-full" />);

    expect(screen.getByTestId('skeleton')).toHaveClass('animate-none');
  });
});
