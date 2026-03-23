import { useState } from 'react';

import useOutsideHandler from '../../hooks/use-outside-handler';
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
  const [show, setShow] = useState(false);

  const profileRef = useOutsideHandler<HTMLDivElement>(() => {
    setShow(false);
  });

  return (
    <div ref={profileRef} className="">
      <button
        type="button"
        className="flex justify-center cursor-pointer"
        onClick={() => setShow((s) => !s)}
        aria-expanded={show}
        aria-haspopup="menu">
        <Avatar type={avatarType} src={avatarSrc} alt={avatarAlt} text={avatarText} />
      </button>
      {show ? (
        <Box className="w-72 top-[calc(100%+1rem)] right-4 absolute">
          <div className="flex items-center gap-2">
            <Avatar type={avatarType} src={avatarSrc} alt={avatarAlt} text={avatarText} />
            <div className="flex flex-col gap-2 text-foreground">
              <span>{fullName}</span>
              <span className="text-sm font-semibold">{userKey}</span>
            </div>
          </div>
          <div className="flex flex-col justify-center mt-4">
            <Button onClick={btnAction}>{btnName}</Button>
          </div>
        </Box>
      ) : null}
    </div>
  );
}

export type { ProfileProps };
export default Profile;
