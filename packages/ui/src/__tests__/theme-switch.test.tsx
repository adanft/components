import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ThemeSwitch } from '../index';

describe('ThemeSwitch', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
    document.cookie = 'theme=; path=/; max-age=0; SameSite=Lax';
  });

  it('renders a switch input', () => {
    render(<ThemeSwitch initialDark={false} />);

    const input = screen.getByRole('switch');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'checkbox');
  });

  it('has accessible label text via sr-only span', () => {
    render(<ThemeSwitch initialDark={false} />);

    expect(screen.getByText('Toggle theme')).toBeInTheDocument();
  });

  it('initializes checked state from initialDark', () => {
    document.documentElement.classList.add('dark');

    render(<ThemeSwitch initialDark={false} />);

    const input = screen.getByRole('switch');

    expect(input).not.toBeChecked();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('uses initialDark without relying on the document theme class', () => {
    render(<ThemeSwitch initialDark={true} />);

    const input = screen.getByRole('switch');

    expect(input).toBeChecked();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('toggles checked state, storage, and document class on click', () => {
    render(<ThemeSwitch initialDark={false} />);

    const input = screen.getByRole('switch');

    expect(input).not.toBeChecked();

    fireEvent.click(input);

    expect(input).toBeChecked();
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.cookie).toContain('theme=dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('uses onCheckedChange without changing the document theme', () => {
    const onCheckedChange = vi.fn();

    render(<ThemeSwitch initialDark={false} onCheckedChange={onCheckedChange} />);

    const input = screen.getByRole('switch');

    fireEvent.click(input);

    expect(input).toBeChecked();
    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(localStorage.getItem('theme')).toBeNull();
    expect(document.cookie).not.toContain('theme=dark');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('merges custom className with base styles', () => {
    render(
      <ThemeSwitch initialDark={false} className="my-custom-class" data-testid="switch-label" />,
    );

    const label = screen.getByTestId('switch-label');

    expect(label).toHaveClass('relative', 'cursor-pointer', 'my-custom-class');
  });

  it('applies md size classes by default', () => {
    render(<ThemeSwitch initialDark={false} data-testid="switch-label" />);

    const label = screen.getByTestId('switch-label');

    expect(label).toHaveClass('w-12', 'h-6');
  });

  it('applies sm size classes', () => {
    render(<ThemeSwitch initialDark={false} size="sm" data-testid="switch-label" />);

    const label = screen.getByTestId('switch-label');

    expect(label).toHaveClass('w-10', 'h-5');
  });

  it('applies lg size classes', () => {
    render(<ThemeSwitch initialDark={false} size="lg" data-testid="switch-label" />);

    const label = screen.getByTestId('switch-label');

    expect(label).toHaveClass('w-14', 'h-7');
  });

  it('forwards extra props to the label element', () => {
    render(<ThemeSwitch initialDark={false} data-testid="switch-label" aria-describedby="help" />);

    const label = screen.getByTestId('switch-label');

    expect(label).toHaveAttribute('aria-describedby', 'help');
  });
});
