import { useState } from 'react';

import useOutsideHandler from '../../hooks/use-outside-handler';
import Box from './box';

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

  const renderedAvatar =
    avatarType === 'image' ? (
      <img
        className="w-16 h-16 rounded-full bg-background object-cover"
        src={avatarSrc}
        alt={avatarAlt}
      />
    ) : (
      <div className="w-14 h-14 rounded-full bg-brand text-white flex items-center justify-center font-semibold uppercase text-lg leading-none tracking-wide">
        {avatarText ?? ''}
      </div>
    );

  return (
    <div ref={profileRef} className="">
      <button
        type="button"
        className="flex justify-center cursor-pointer"
        onClick={() => setShow((s) => !s)}
        aria-expanded={show}
        aria-haspopup="true">
        {renderedAvatar}
      </button>
      {show ? (
        <Box className="w-72 top-[calc(100%+1rem)] right-4 absolute">
          <div className="flex items-center gap-2">
            {renderedAvatar}
            <div className="flex flex-col gap-2 text-foreground">
              <span>{fullName}</span>
              <span className="text-sm font-semibold">{userKey}</span>
            </div>
          </div>
          <div className="flex flex-col justify-center mt-4">
            <button
              type="button"
              className="rounded-full text-white font-medium bg-brand py-2 cursor-pointer"
              onClick={btnAction}>
              {btnName}
            </button>
          </div>
        </Box>
      ) : null}
    </div>
  );
}

export type { ProfileProps };
export default Profile;
