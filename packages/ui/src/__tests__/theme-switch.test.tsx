import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ThemeSwitch } from '../index';

describe('ThemeSwitch', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
    // biome-ignore lint/suspicious/noDocumentCookie: tests need to reset the SSR-readable theme cookie.
    document.cookie = 'theme=; path=/; max-age=0; SameSite=Lax';
  });

  it('renders a switch input', () => {
    render(<ThemeSwitch checked={false} onCheckedChange={() => undefined} />);

    const input = screen.getByRole('switch');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'checkbox');
  });

  it('has accessible label text via sr-only span', () => {
    render(<ThemeSwitch checked={false} onCheckedChange={() => undefined} />);

    expect(screen.getByText('Toggle theme')).toBeInTheDocument();
  });

  it('reflects the controlled checked state', () => {
    const { rerender } = render(<ThemeSwitch checked={false} onCheckedChange={() => undefined} />);

    expect(screen.getByRole('switch')).not.toBeChecked();

    rerender(<ThemeSwitch checked onCheckedChange={() => undefined} />);

    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('requests the next checked state without changing global theme state', () => {
    const onCheckedChange = vi.fn();

    render(<ThemeSwitch checked={false} onCheckedChange={onCheckedChange} />);

    fireEvent.click(screen.getByRole('switch'));

    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole('switch')).not.toBeChecked();
    expect(localStorage.getItem('theme')).toBeNull();
    expect(document.cookie).not.toContain('theme=dark');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('requests false when the controlled state is checked', () => {
    const onCheckedChange = vi.fn();

    render(<ThemeSwitch checked onCheckedChange={onCheckedChange} />);

    fireEvent.click(screen.getByRole('switch'));

    expect(onCheckedChange).toHaveBeenCalledWith(false);
  });

  it('merges custom className with base styles', () => {
    render(
      <ThemeSwitch
        checked={false}
        onCheckedChange={() => undefined}
        className="my-custom-class"
        data-testid="switch-label"
      />,
    );

    const label = screen.getByTestId('switch-label');

    expect(label).toHaveClass('relative', 'cursor-pointer', 'my-custom-class');
  });

  it('applies md size classes by default', () => {
    render(
      <ThemeSwitch checked={false} onCheckedChange={() => undefined} data-testid="switch-label" />,
    );

    expect(screen.getByTestId('switch-label')).toHaveClass('w-12', 'h-6');
  });

  it('applies sm size classes', () => {
    render(
      <ThemeSwitch
        checked={false}
        onCheckedChange={() => undefined}
        size="sm"
        data-testid="switch-label"
      />,
    );

    expect(screen.getByTestId('switch-label')).toHaveClass('w-10', 'h-5');
  });

  it('applies lg size classes', () => {
    render(
      <ThemeSwitch
        checked={false}
        onCheckedChange={() => undefined}
        size="lg"
        data-testid="switch-label"
      />,
    );

    expect(screen.getByTestId('switch-label')).toHaveClass('w-14', 'h-7');
  });

  it('forwards extra props to the label element', () => {
    render(
      <ThemeSwitch
        checked={false}
        onCheckedChange={() => undefined}
        data-testid="switch-label"
        aria-describedby="help"
      />,
    );

    expect(screen.getByTestId('switch-label')).toHaveAttribute('aria-describedby', 'help');
  });
});
