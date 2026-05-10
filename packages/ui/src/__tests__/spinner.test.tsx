import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { SpinnerProps } from '../index';
import { Spinner } from '../index';

const spinnerPath =
  'M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z';

describe('Spinner', () => {
  it('renders an accessible status with a default label', () => {
    render(<Spinner />);

    const spinner = screen.getByRole('status', { name: /loading/i });

    expect(spinner.tagName).toBe('svg');
    expect(spinner).toHaveClass(
      'text-brand',
      'motion-safe:animate-[spin_0.9s_linear_infinite]',
      'motion-reduce:animate-none',
    );
    expect(spinner).not.toHaveAttribute('fill');
    expect(spinner).toHaveAttribute('viewBox', '0 0 24 24');
  });

  it('renders the provided SVG path in default one-color mode without a gradient', () => {
    render(<Spinner data-testid="spinner" />);

    const spinner = screen.getByTestId('spinner');
    const path = spinner.querySelector('path');

    expect(spinner).toHaveAttribute('viewBox', '0 0 24 24');
    expect(spinner.querySelector('defs')).not.toBeInTheDocument();
    expect(spinner.querySelector('linearGradient')).not.toBeInTheDocument();
    expect(spinner.querySelector('radialGradient')).not.toBeInTheDocument();
    expect(spinner.querySelector('stop')).not.toBeInTheDocument();
    expect(path).toHaveAttribute('d', spinnerPath);
    expect(path).toHaveAttribute('fill', 'currentColor');
  });

  it('changes color through className while keeping the path fill currentColor', () => {
    render(<Spinner className="text-info" data-testid="spinner" />);

    const spinner = screen.getByTestId('spinner');
    const path = spinner.querySelector('path');

    expect(spinner).toHaveClass('text-info');
    expect(spinner).not.toHaveClass('text-brand');
    expect(spinner.querySelector('linearGradient')).not.toBeInTheDocument();
    expect(spinner.querySelector('radialGradient')).not.toBeInTheDocument();
    expect(spinner.querySelector('stop')).not.toBeInTheDocument();
    expect(path).toHaveAttribute('fill', 'currentColor');
  });

  it('does not expose a colors prop', () => {
    // @ts-expect-error Spinner color is controlled through currentColor/className, not a colors prop.
    const unsupportedProps: SpinnerProps = { colors: ['red'] };

    expect(unsupportedProps).toEqual({ colors: ['red'] });
  });

  it('does not expose a size prop', () => {
    // @ts-expect-error Spinner size is controlled through className, not a size prop.
    const unsupportedProps: SpinnerProps = { size: 'lg' };

    expect(unsupportedProps).toEqual({ size: 'lg' });
  });

  it('renders only the spinner path without a background track', () => {
    render(<Spinner data-testid="spinner" />);

    const spinner = screen.getByTestId('spinner');
    const paths = spinner.querySelectorAll('path');

    expect(spinner.querySelector('rect')).not.toBeInTheDocument();
    expect(spinner.querySelector('circle')).not.toBeInTheDocument();
    expect(paths).toHaveLength(1);
    expect(paths[0]).toHaveAttribute('d', spinnerPath);
  });

  it('uses a reasonable default size class', () => {
    render(<Spinner data-testid="spinner" />);

    expect(screen.getByTestId('spinner')).toHaveClass('size-5');
  });

  it('changes size and color through className', () => {
    render(<Spinner className="size-14 text-info" data-testid="spinner" />);

    const spinner = screen.getByTestId('spinner');

    expect(spinner).toHaveClass('size-14', 'text-info');
    expect(spinner).not.toHaveClass('size-5', 'text-brand');
  });

  it('supports subtle animation speeds', () => {
    const { rerender } = render(<Spinner data-testid="spinner" speed="slow" />);

    expect(screen.getByTestId('spinner')).toHaveClass(
      'motion-safe:animate-[spin_1.1s_linear_infinite]',
      'motion-reduce:animate-none',
    );

    rerender(<Spinner data-testid="spinner" speed="normal" />);
    expect(screen.getByTestId('spinner')).toHaveClass(
      'motion-safe:animate-[spin_0.9s_linear_infinite]',
      'motion-reduce:animate-none',
    );

    rerender(<Spinner data-testid="spinner" speed="fast" />);
    expect(screen.getByTestId('spinner')).toHaveClass(
      'motion-safe:animate-[spin_0.7s_linear_infinite]',
      'motion-reduce:animate-none',
    );
  });

  it('forwards className and native svg props', () => {
    render(
      <Spinner
        aria-label="Saving"
        className="text-brand"
        data-testid="saving-spinner"
        id="saving-spinner"
      />,
    );

    const spinner = screen.getByRole('status', { name: /saving/i });

    expect(spinner).toHaveAttribute('id', 'saving-spinner');
    expect(spinner).toHaveClass('text-brand', 'size-5');
  });

  it('can be marked decorative with aria-hidden', () => {
    render(<Spinner aria-hidden="true" data-testid="spinner" />);

    const spinner = screen.getByTestId('spinner');

    expect(spinner).toHaveAttribute('aria-hidden', 'true');
    expect(spinner).toHaveAttribute('role', 'presentation');
    expect(spinner).not.toHaveAttribute('aria-label');
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
