import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Skeleton } from '../index';

describe('Skeleton', () => {
  it('renders with default pulse animation and text shape', () => {
    render(<Skeleton data-testid="skeleton" className="h-4 w-24" />);

    const skeleton = screen.getByTestId('skeleton');

    expect(skeleton).toHaveAttribute('aria-hidden', 'true');
    expect(skeleton).toHaveClass('bg-muted');
    expect(skeleton).toHaveClass('rounded-md');
    expect(skeleton).toHaveClass('motion-safe:animate-pulse');
  });

  it('supports circle shape', () => {
    render(<Skeleton data-testid="skeleton" shape="circle" className="size-10" />);

    expect(screen.getByTestId('skeleton')).toHaveClass('rounded-full');
  });

  it('supports turning animation off', () => {
    render(<Skeleton data-testid="skeleton" animation="none" className="h-10 w-full" />);

    expect(screen.getByTestId('skeleton')).toHaveClass('animate-none');
  });
});
