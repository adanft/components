import { useState, type JSX, type RefObject } from 'react';

import useOutsideHandler from '../../hooks/use-outside-handler';
import Box from './box';

type BaseProfileProps = {
  userKey: string;
  fullName: string;
  btnAction: () => void;
  btnName: string;
  avatarType: 'image' | 'text';
  avatarSrc?: string;
  avatarAlt?: string;
  avatarText?: string;
};

type ProfileProps = BaseProfileProps;

function Profile({
  userKey,
  fullName,
  btnAction,
  btnName,
  avatarType,
  avatarSrc,
  avatarAlt,
  avatarText,
}: ProfileProps): JSX.Element {
  const [show, setShow] = useState(false);

  const profileRef = useOutsideHandler(() => {
    setShow(false);
  });

  const renderedAvatar =
    avatarType === 'image' ? (
      <img
        className="w-16 h-16 rounded-full ui-bg-surface-page object-cover"
        src={avatarSrc}
        alt={avatarAlt}
      />
    ) : (
      <div className="w-14 h-14 rounded-full ui-bg-brand ui-text-on-primary flex items-center justify-center font-semibold uppercase text-lg leading-none tracking-wide">
        {avatarText ?? ''}
      </div>
    );

  return (
    <div ref={profileRef as RefObject<HTMLDivElement | null>} className="">
      <div
        className="flex justify-center cursor-pointer"
        onClick={() => {
          setShow(!show);
        }}>
        {renderedAvatar}
      </div>
      {show && (
        <Box className="w-72 top-[calc(100%+1rem)] right-4 absolute">
          <div className="flex items-center gap-2">
            {renderedAvatar}
            <div className="flex flex-col gap-2 ui-text-body">
              <span>{fullName}</span>
              <span className="text-sm font-semibold">{userKey}</span>
            </div>
          </div>
          <div className="flex flex-col justify-center mt-4">
            <button
              className="rounded-full text-white font-medium ui-bg-brand py-2 cursor-pointer"
              onClick={() => {
                btnAction();
              }}>
              {btnName}
            </button>
          </div>
        </Box>
      )}
    </div>
  );
}

export type { ProfileProps };
export default Profile;
