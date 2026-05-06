import { fireEvent, render, screen } from '@testing-library/react';
import type { ComponentPropsWithoutRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Button } from '../index';

type RouterLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & {
  to: string;
};

function RouterLink({ to, ...props }: RouterLinkProps) {
  return <a href={to} {...props} />;
}

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

  it.each([
    ['danger', 'bg-danger', 'text-white'],
    ['info', 'bg-info', 'text-white'],
    ['success', 'bg-success', 'text-white'],
  ] as const)('applies %s variant styles', (variant, backgroundClass, textClass) => {
    render(
      <Button variant={variant} data-testid="button">
        {variant}
      </Button>,
    );

    const button = screen.getByTestId('button');

    expect(button).toHaveClass(backgroundClass, textClass);
    expect(button).not.toHaveClass('bg-brand');
  });

  it.each([
    ['primary', 'border-brand', 'text-brand'],
    ['secondary', 'border-muted', 'text-muted'],
    ['danger', 'border-danger', 'text-danger'],
    ['info', 'border-info', 'text-info'],
    ['success', 'border-success', 'text-success'],
    ['theme', 'border-heading', 'text-heading'],
  ] as const)('applies %s outline variant styles', (variant, borderClass, textClass) => {
    render(
      <Button outline variant={variant} data-testid="button">
        {variant}
      </Button>,
    );

    const button = screen.getByTestId('button');

    expect(button).toHaveClass('border', 'bg-transparent', borderClass, textClass);
    expect(button).not.toHaveClass('bg-brand', 'text-white');
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

  it('composes router-like links with asChild while preserving variant and size styles', () => {
    render(
      <Button asChild variant="secondary" size="sm">
        <RouterLink to="/docs">Open docs</RouterLink>
      </Button>,
    );

    const link = screen.getByRole('link', { name: 'Open docs' });

    expect(link).toHaveAttribute('href', '/docs');
    expect(link).toHaveClass('bg-muted', 'text-white', 'text-sm', 'h-8', 'px-4');
    expect(link).not.toHaveAttribute('type');
  });

  it('composes outline styles with asChild links', () => {
    render(
      <Button asChild outline variant="danger">
        <RouterLink to="/docs">Delete docs</RouterLink>
      </Button>,
    );

    const link = screen.getByRole('link', { name: 'Delete docs' });

    expect(link).toHaveAttribute('href', '/docs');
    expect(link).toHaveClass('border', 'border-danger', 'text-danger', 'bg-transparent');
  });

  it('merges child className with Button className when asChild is enabled', () => {
    render(
      <Button asChild className="ui-class">
        <RouterLink to="/account" className="router-class">
          Account
        </RouterLink>
      </Button>,
    );

    const link = screen.getByRole('link', { name: 'Account' });

    expect(link).toHaveClass('ui-class', 'router-class', 'rounded-full');
  });
});
