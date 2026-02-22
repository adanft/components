import { useState, type JSX, type RefObject } from 'react';
import useOutsideHandler from '../../hooks/use-outside-handler';

type ProfileProps = {
  avatarAlt?: string;
  avatarSrc?: string;
  displayName?: string;
  handle?: string;
  onSignOut?: () => void;
  signOutLabel?: string;
};

function Profile({
  avatarAlt = 'profile avatar',
  avatarSrc,
  displayName = 'Guest User',
  handle = '@user',
  onSignOut,
  signOutLabel = 'Sign out',
}: ProfileProps): JSX.Element {
  const [show, setShow] = useState(false);

  const profileRef = useOutsideHandler(() => {
    setShow(false);
  });

  return (
    <div ref={profileRef as RefObject<HTMLDivElement | null>} className="">
      <div
        className="flex justify-center cursor-pointer"
        onClick={() => {
          setShow(!show);
        }}>
        {avatarSrc ? (
          <img
            className="rounded-full bg-primary-color"
            src={avatarSrc}
            alt={avatarAlt}
            width="64"
            height="64"
          />
        ) : (
          <div className="rounded-full bg-primary-color w-16 h-16 flex items-center justify-center">
            <i className="nf nf-fa-user text-primary-color text-xl" />
          </div>
        )}
      </div>
      {show && (
        <div className="w-72 top-[calc(100%+1rem)] right-4 absolute box">
          <div className="flex items-center gap-2">
            {avatarSrc ? (
              <img
                className="rounded-full bg-primary-color"
                src={avatarSrc}
                alt={avatarAlt}
                width="64"
                height="64"
              />
            ) : (
              <div className="rounded-full bg-primary-color w-16 h-16 flex items-center justify-center">
                <i className="nf nf-fa-user text-primary-color text-xl" />
              </div>
            )}
            <div className="flex flex-col gap-2 text-color bold">
              <span>{handle}</span>
              <span>{displayName}</span>
            </div>
          </div>
          <div className="flex flex-col justify-center mt-4">
            <button
              className="rounded-full text-white font-medium bg-main-color py-2"
              onClick={() => {
                onSignOut?.();
              }}>
              {signOutLabel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export type { ProfileProps };
export default Profile;
