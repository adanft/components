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

type ProfileProps = {
  userKey: string;
  fullName: string;
  btnAction: () => void;
  btnName: string;
  avatarType: 'image' | 'text';
  avatarSrc?: string;
  avatarAlt?: string;
  avatarText?: string;
};

function Profile({
  userKey,
  fullName,
  btnAction,
  btnName,
  avatarType,
  avatarSrc,
  avatarAlt,
  avatarText,
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

  return (
    <>
      <button
        ref={refs.setReference}
        type="button"
        className="inline-flex cursor-pointer"
        aria-expanded={open}
        aria-haspopup="dialog"
        {...getReferenceProps()}>
        <Avatar type={avatarType} src={avatarSrc} alt={avatarAlt} text={avatarText} />
      </button>
      <FloatingPortal>
        {open ? (
          <FloatingFocusManager context={context} modal={false}>
            <Box
              ref={refs.setFloating}
              style={floatingStyles}
              className="w-72 z-50"
              {...getFloatingProps()}>
              <div className="flex items-center gap-2">
                <Avatar type={avatarType} src={avatarSrc} alt={avatarAlt} text={avatarText} />
                <div className="flex flex-col gap-2 text-foreground">
                  <span>{fullName}</span>
                  <span className="text-sm font-semibold">{userKey}</span>
                </div>
              </div>
              <div className="mt-4">
                <Button className="w-full" onClick={btnAction}>
                  {btnName}
                </Button>
              </div>
            </Box>
          </FloatingFocusManager>
        ) : null}
      </FloatingPortal>
    </>
  );
}

export type { ProfileProps };
export default Profile;
