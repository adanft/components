import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { ProfileProps } from '../index';
import { Profile } from '../index';

const validProfileProps: ProfileProps = {
  username: '@taylor',
  name: 'Taylor Brown',
  onAction: () => undefined,
  actionLabel: 'Log out',
  avatarType: 'image',
  avatarSrc: 'https://example.com/avatar.png',
  avatarAlt: 'Taylor avatar',
};
void validProfileProps;

const validProfileTextAvatarProps: ProfileProps = {
  username: '@adan',
  name: 'Adan Franco',
  onAction: () => undefined,
  actionLabel: 'Log out',
  avatarType: 'text',
  avatarText: 'AF',
};
void validProfileTextAvatarProps;

describe('Profile', () => {
  it('renders provided props and opens menu content on click', () => {
    render(
      <Profile
        username="@taylor"
        name="Taylor Brown"
        onAction={() => undefined}
        actionLabel="Log out"
        avatarType="image"
        avatarSrc="https://example.com/avatar.png"
        avatarAlt="Taylor avatar"
      />,
    );

    const triggerImage = screen.getByRole('img', { name: 'Taylor avatar' });
    expect(triggerImage).toHaveAttribute('src', 'https://example.com/avatar.png');
    expect(screen.queryByRole('button', { name: 'Log out' })).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: /taylor avatar/i }));

    expect(screen.getByText('@taylor')).toBeInTheDocument();
    expect(screen.getByText('Taylor Brown')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log out' })).toBeInTheDocument();
  });

  it('renders text avatar and triggers action callback', () => {
    const onAction = vi.fn();
    render(
      <Profile
        username="@adan"
        name="Adan Franco"
        onAction={onAction}
        actionLabel="Log out"
        avatarType="text"
        avatarText="AF"
      />,
    );

    expect(screen.queryByRole('img', { name: 'Taylor avatar' })).toBeNull();
    const avatarText = screen.getByText('AF');
    expect(avatarText).toBeInTheDocument();

    const avatar = avatarText.closest('div');
    if (!avatar) {
      throw new Error('Missing text avatar container');
    }
    expect(avatar).toHaveClass('bg-brand');
    expect(avatar).toHaveClass('text-white');

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText('@adan')).toBeInTheDocument();
    expect(screen.getByText('Adan Franco')).toBeInTheDocument();
    expect(screen.getAllByText('AF')).toHaveLength(2);

    fireEvent.click(screen.getByRole('button', { name: 'Log out' }));
    expect(onAction).toHaveBeenCalledTimes(1);
  });
});
