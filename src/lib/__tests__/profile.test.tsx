import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Profile } from '../index';
import type { ProfileProps } from '../index';

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

const validProfileImageFallbackProps: ProfileProps = {
  userKey: '@sam',
  fullName: 'Sam Li',
  btnAction: () => undefined,
  btnName: 'Log out',
  avatarType: 'image',
};
void validProfileImageFallbackProps;

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
    expect(avatar).toHaveClass('ui-bg-brand');
    expect(avatar).toHaveClass('ui-text-on-primary');

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

  it('uses safe fallbacks for image avatar when src or alt is missing', () => {
    render(
      <Profile
        userKey="@sam"
        fullName="Sam Li"
        btnAction={() => undefined}
        btnName="Log out"
        avatarType="image"
      />,
    );

    const avatar = screen.getByRole('img', { name: 'Profile avatar' });
    expect(avatar).toHaveAttribute('src', 'data:image/gif;base64,R0lGODlhAQABAAAAACw=');
  });
});
