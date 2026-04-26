import { render, screen } from '@testing-library/react';
import type { SVGProps } from 'react';
import { describe, expect, it } from 'vitest';

import { Alert } from '../index';

function AlertCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

describe('Alert', () => {
  it('renders root, title and description', () => {
    render(
      <Alert>
        <Alert.Title>Warning</Alert.Title>
        <Alert.Description>Review your changes before publishing.</Alert.Description>
      </Alert>,
    );

    expect(screen.getByText('Warning')).toHaveClass('font-semibold');
    expect(screen.getByText('Review your changes before publishing.')).toHaveClass('text-sm');
  });

  it('uses the default info variant and base container styles', () => {
    const { container } = render(<Alert>Heads up</Alert>);

    expect(container.firstChild).toHaveClass(
      'flex',
      'gap-3',
      'rounded-md',
      'border',
      'p-4',
      'text-foreground',
      'border-info/30',
      'bg-info/10',
    );
  });

  it('supports variants', () => {
    const { container } = render(<Alert variant="danger">Error state</Alert>);

    expect(container.firstChild).toHaveClass('bg-danger/10');
  });

  it('merges className with the base alert contract', () => {
    const { container } = render(<Alert className="shadow-sm">Heads up</Alert>);

    expect(container.firstChild).toHaveClass('rounded-md', 'shadow-sm');
  });

  it('renders an optional icon', () => {
    render(
      <Alert icon={<AlertCircleIcon data-testid="alert-icon" width={18} height={18} />}>
        Connection issue
      </Alert>,
    );

    expect(screen.getByTestId('alert-icon')).toBeInTheDocument();
  });

  it('merges custom className in compound subcomponents', () => {
    render(
      <Alert>
        <Alert.Title className="tracking-tight">Warning</Alert.Title>
        <Alert.Description className="leading-6">
          Review your changes before publishing.
        </Alert.Description>
      </Alert>,
    );

    expect(screen.getByText('Warning')).toHaveClass('font-semibold', 'tracking-tight');
    expect(screen.getByText('Review your changes before publishing.')).toHaveClass(
      'text-sm',
      'leading-6',
    );
  });
});
