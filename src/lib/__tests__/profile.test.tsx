import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { ProfileProps } from '../index';
import { Profile } from '../index';

const validProfileProps: ProfileProps = {
  userKey: '@taylor',
  fullName: 'Taylor Brown',
  btnAction: () => undefined,
  btnName: 'Log out',
  avatarType: 'image',
  avatarSrc: 'https://example.com/avatar.png',
  avatarAlt: 'Taylor avatar',
};
void validProfileProps;

const validProfileTextAvatarProps: ProfileProps = {
  userKey: '@adan',
  fullName: 'Adan Franco',
  btnAction: () => undefined,
  btnName: 'Log out',
  avatarType: 'text',
  avatarText: 'AF',
};
void validProfileTextAvatarProps;

describe('Profile', () => {
  it('renders provided props and opens menu content on click', () => {
    const { container } = render(
      <Profile
        userKey="@taylor"
        fullName="Taylor Brown"
        btnAction={() => undefined}
        btnName="Log out"
        avatarType="image"
        avatarSrc="https://example.com/avatar.png"
        avatarAlt="Taylor avatar"
      />,
    );

    const triggerImage = screen.getByRole('img', { name: 'Taylor avatar' });
    expect(triggerImage).toHaveAttribute('src', 'https://example.com/avatar.png');
    expect(screen.queryByRole('button', { name: 'Log out' })).toBeNull();

    const trigger = container.querySelector('.cursor-pointer');
    if (!trigger) {
      throw new Error('Missing profile trigger element');
    }

    fireEvent.click(trigger);

    expect(screen.getByText('@taylor')).toBeInTheDocument();
    expect(screen.getByText('Taylor Brown')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log out' })).toBeInTheDocument();
  });

  it('renders text avatar and triggers action callback', () => {
    const btnAction = vi.fn();
    const { container } = render(
      <Profile
        userKey="@adan"
        fullName="Adan Franco"
        btnAction={btnAction}
        btnName="Log out"
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

    const trigger = container.querySelector('.cursor-pointer');
    if (!trigger) {
      throw new Error('Missing profile trigger element');
    }
    fireEvent.click(trigger);

    expect(screen.getByText('@adan')).toBeInTheDocument();
    expect(screen.getByText('Adan Franco')).toBeInTheDocument();
    expect(screen.getAllByText('AF')).toHaveLength(2);

    fireEvent.click(screen.getByRole('button', { name: 'Log out' }));
    expect(btnAction).toHaveBeenCalledTimes(1);
  });
});
