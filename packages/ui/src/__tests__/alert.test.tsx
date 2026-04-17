import { render, screen } from '@testing-library/react';
import { AlertCircle } from 'lucide-react';
import { describe, expect, it } from 'vitest';

import { Alert } from '../index';

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

  it('supports variants', () => {
    const { container } = render(<Alert variant="danger">Error state</Alert>);

    expect(container.firstChild).toHaveClass('bg-danger/10');
  });

  it('renders an optional icon', () => {
    render(
      <Alert icon={<AlertCircle data-testid="alert-icon" size={18} />}>Connection issue</Alert>,
    );

    expect(screen.getByTestId('alert-icon')).toBeInTheDocument();
  });
});
