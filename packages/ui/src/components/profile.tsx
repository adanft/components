import { useState } from 'react';
import Popover from '../primitives/popover';
import type { AvatarSize } from './avatar';
import Avatar from './avatar';
import Box from './box';
import Button from './button';

type ProfileBaseProps = {
  actionLabel: string;
  avatarSize?: AvatarSize;
  name: string;
  onAction: () => void;
  panelAvatarSize?: AvatarSize;
  username: string;
};

type ProfileImageProps = ProfileBaseProps & {
  avatarAlt: string;
  avatarSrc: string;
  avatarType: 'image';
};

type ProfileTextProps = ProfileBaseProps & {
  avatarText: string;
  avatarType: 'text';
};

type ProfileProps = ProfileImageProps | ProfileTextProps;

function Profile({
  actionLabel,
  avatarSize = 'md',
  name,
  onAction,
  panelAvatarSize,
  username,
  avatarType,
  ...avatarProps
}: ProfileProps) {
  const [open, setOpen] = useState(false);

  const renderAvatar = (size?: AvatarSize) =>
    avatarType === 'image' ? (
      <Avatar
        type="image"
        size={size}
        src={(avatarProps as ProfileImageProps).avatarSrc}
        alt={(avatarProps as ProfileImageProps).avatarAlt}
      />
    ) : (
      <Avatar type="text" size={size} text={(avatarProps as ProfileTextProps).avatarText} />
    );

  return (
    <Popover open={open} onOpenChange={setOpen} position="bottom-end">
      <Popover.Trigger>
        <button type="button" className="inline-flex cursor-pointer rounded-full">
          {renderAvatar(avatarSize)}
        </button>
      </Popover.Trigger>
      <Popover.Content className="z-50">
        <Box className="w-72">
          <div className="flex items-center gap-2">
            {renderAvatar(panelAvatarSize)}
            <div className="flex flex-col gap-1 text-foreground">
              <span>{name}</span>
              <span className="text-sm font-semibold">{username}</span>
            </div>
          </div>
          <div className="mt-4">
            <Button className="w-full" onClick={onAction}>
              {actionLabel}
            </Button>
          </div>
        </Box>
      </Popover.Content>
    </Popover>
  );
}

export type { ProfileProps };
export default Profile;
