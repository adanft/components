import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Avatar } from '../index';

describe('Avatar', () => {
  it('renders text avatars with md size by default', () => {
    render(<Avatar type="text" text="AF" />);

    const avatar = screen.getByText('AF');

    expect(avatar).toHaveClass('size-14', 'text-lg', 'bg-brand', 'rounded-full');
  });

  it('renders image avatars with the selected size', () => {
    render(<Avatar type="image" size="lg" src="https://example.com/avatar.png" alt="Avatar" />);

    const avatar = screen.getByRole('img', { name: 'Avatar' });

    expect(avatar).toHaveClass('size-16', 'rounded-full', 'object-cover');
    expect(avatar).toHaveAttribute('width', '64');
    expect(avatar).toHaveAttribute('height', '64');
  });

  it('maps image dimensions from the requested size', () => {
    render(
      <Avatar type="image" size="sm" src="https://example.com/avatar-sm.png" alt="Small avatar" />,
    );

    const avatar = screen.getByRole('img', { name: 'Small avatar' });

    expect(avatar).toHaveClass('size-10');
    expect(avatar).toHaveAttribute('width', '40');
    expect(avatar).toHaveAttribute('height', '40');
  });

  it('applies small text sizing when requested', () => {
    render(<Avatar type="text" size="sm" text="TB" />);

    const avatar = screen.getByText('TB');

    expect(avatar).toHaveClass('size-10', 'text-sm');
    expect(avatar).not.toHaveClass('size-14', 'text-lg');
  });

  it('merges className with the base contract', () => {
    render(<Avatar type="text" text="AF" className="ring-2 ring-brand" />);

    const avatar = screen.getByText('AF');

    expect(avatar).toHaveClass('size-14', 'text-lg', 'ring-2', 'ring-brand');
  });
});
