import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ThemeSwitch } from '../index';

describe('ThemeSwitch', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('renders a switch input', () => {
    render(<ThemeSwitch />);

    const input = screen.getByRole('switch');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'checkbox');
  });

  it('has accessible label text via sr-only span', () => {
    render(<ThemeSwitch />);

    expect(screen.getByText('Toggle theme')).toBeInTheDocument();
  });

  it('toggles checked state on click', () => {
    render(<ThemeSwitch />);

    const input = screen.getByRole('switch');

    expect(input).not.toBeChecked();

    fireEvent.click(input);

    expect(input).toBeChecked();
  });

  it('calls onChange callback with the new theme', () => {
    const onChange = vi.fn();

    render(<ThemeSwitch onChange={onChange} />);

    fireEvent.click(screen.getByRole('switch'));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('dark');
  });

  it('merges custom className with base styles', () => {
    render(<ThemeSwitch className="my-custom-class" data-testid="switch-label" />);

    const label = screen.getByTestId('switch-label');

    expect(label).toHaveClass('relative', 'cursor-pointer', 'my-custom-class');
  });

  it('applies md size classes by default', () => {
    render(<ThemeSwitch data-testid="switch-label" />);

    const label = screen.getByTestId('switch-label');

    expect(label).toHaveClass('w-12', 'h-6');
  });

  it('applies sm size classes', () => {
    render(<ThemeSwitch size="sm" data-testid="switch-label" />);

    const label = screen.getByTestId('switch-label');

    expect(label).toHaveClass('w-10', 'h-5');
  });

  it('applies lg size classes', () => {
    render(<ThemeSwitch size="lg" data-testid="switch-label" />);

    const label = screen.getByTestId('switch-label');

    expect(label).toHaveClass('w-14', 'h-7');
  });

  it('forwards extra props to the label element', () => {
    render(<ThemeSwitch data-testid="switch-label" aria-describedby="help" />);

    const label = screen.getByTestId('switch-label');

    expect(label).toHaveAttribute('aria-describedby', 'help');
  });
});
