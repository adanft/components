import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Button } from '../index';

describe('Button', () => {
  it('renders children content', () => {
    render(<Button>Save changes</Button>);

    expect(screen.getByRole('button', { name: 'Save changes' })).toBeInTheDocument();
  });

  it('uses button as default type', () => {
    render(<Button>Submit</Button>);

    expect(screen.getByRole('button', { name: 'Submit' })).toHaveAttribute('type', 'button');
  });

  it('merges custom className with base styles', () => {
    render(
      <Button className="w-full custom-button" data-testid="button">
        Continue
      </Button>,
    );

    const button = screen.getByTestId('button');

    expect(button).toHaveClass(
      'bg-brand',
      'text-white',
      'rounded-full',
      'w-full',
      'custom-button',
    );
  });

  it('calls click handler when pressed', () => {
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Run action</Button>);

    fireEvent.click(screen.getByRole('button', { name: 'Run action' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
