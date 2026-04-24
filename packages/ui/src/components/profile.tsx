import {
  autoUpdate,
  FloatingFocusManager,
  FloatingPortal,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { useState } from 'react';

import Avatar from './avatar';
import Box from './box';
import Button from './button';

type ProfileBaseProps = {
  actionLabel: string;
  name: string;
  onAction: () => void;
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
  name,
  onAction,
  username,
  avatarType,
  ...avatarProps
}: ProfileProps) {
  const [open, setOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: 'bottom-end',
    middleware: [offset(16), flip(), shift({ padding: 16 })],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'dialog' });

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  const avatarNode =
    avatarType === 'image' ? (
      <Avatar
        type="image"
        src={(avatarProps as ProfileImageProps).avatarSrc}
        alt={(avatarProps as ProfileImageProps).avatarAlt}
      />
    ) : (
      <Avatar type="text" text={(avatarProps as ProfileTextProps).avatarText} />
    );

  return (
    <>
      <button
        ref={refs.setReference}
        type="button"
        className="inline-flex cursor-pointer rounded-full"
        aria-expanded={open}
        aria-haspopup="dialog"
        {...getReferenceProps()}>
        {avatarNode}
      </button>
      {open ? (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <Box
              ref={refs.setFloating}
              style={floatingStyles}
              className="w-72 z-50"
              {...getFloatingProps()}>
              <div className="flex items-center gap-2">
                {avatarNode}
                <div className="flex flex-col gap-2 text-foreground">
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
          </FloatingFocusManager>
        </FloatingPortal>
      ) : null}
    </>
  );
}

export type { ProfileProps };
export default Profile;
