import { useState, type JSX, type RefObject } from 'react';
import useOutsideHandler from '../../hooks/use-outside-handler';

function Profile(): JSX.Element {
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
        <img
          className="rounded-full bg-primary-color"
          src={'/profile.png'}
          alt="profile-img"
          width="64"
          height="64"
        />
      </div>
      {show && (
        <div className="w-72 top-[calc(100%+1rem)] right-4 absolute box">
          <div className="flex items-center gap-2">
            <img
              className="rounded-full bg-primary-color"
              src={'/profile.png'}
              alt="profile-img"
              width="64"
              height="64"
            />
            <div className="flex flex-col gap-2 text-color bold">
              <span>adanft</span>
              <span>Adan Franco T.</span>
            </div>
          </div>
          <div className="flex flex-col justify-center mt-4">
            <button
              className="rounded-full text-white font-medium bg-main-color py-2"
              onClick={() => {}}>
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
