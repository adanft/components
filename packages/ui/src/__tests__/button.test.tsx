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

    expect(button).toHaveClass('bg-brand', 'text-white', 'rounded-full', 'w-full', 'custom-button');
  });

  it('calls click handler when pressed', () => {
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Run action</Button>);

    fireEvent.click(screen.getByRole('button', { name: 'Run action' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('applies secondary variant styles', () => {
    render(
      <Button variant="secondary" data-testid="button">
        Secondary
      </Button>,
    );

    const button = screen.getByTestId('button');

    expect(button).toHaveClass('bg-muted', 'text-white');
    expect(button).not.toHaveClass('bg-brand');
  });

  it('applies sm size styles', () => {
    render(
      <Button size="sm" data-testid="button">
        Small
      </Button>,
    );

    const button = screen.getByTestId('button');

    expect(button).toHaveClass('text-sm', 'h-8', 'px-4');
  });

  it('applies lg size styles', () => {
    render(
      <Button size="lg" data-testid="button">
        Large
      </Button>,
    );

    const button = screen.getByTestId('button');

    expect(button).toHaveClass('text-lg', 'h-12', 'px-8');
  });

  it('combines variant and size correctly', () => {
    render(
      <Button variant="secondary" size="sm" data-testid="button">
        Secondary Small
      </Button>,
    );

    const button = screen.getByTestId('button');

    expect(button).toHaveClass('bg-muted', 'text-white', 'text-sm', 'h-8', 'px-4');
  });

  it('allows className to override variant styles via tailwind-merge', () => {
    render(
      <Button variant="primary" className="bg-green-500" data-testid="button">
        Custom
      </Button>,
    );

    const button = screen.getByTestId('button');

    expect(button).toHaveClass('bg-green-500');
    expect(button).not.toHaveClass('bg-brand');
  });
});
