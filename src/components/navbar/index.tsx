import type { ProfileProps } from '../profile';
import Profile from '../profile';
import ToggleTheme from '../toggle-theme';

type NavbarProps = {
  profileProps?: ProfileProps;
  searchPlaceholder?: string;
};

function Navbar({ profileProps, searchPlaceholder = 'Search' }: NavbarProps) {
  return (
    <div className="fixed left-[65px] top-0 right-0 h-[97px] ui-bg-surface-raised ui-border-default border-b ui-shadow-sm px-8 flex justify-between items-center z-10">
      <div></div>
      <div className="flex gap-4 border ui-border-brand px-4 py-2 rounded-full ui-bg-surface-page">
        <i className="nf nf-fa-search ui-text-brand text-xl mt-0.5"></i>
        <input
          className="w-full ui-bg-surface-page focus-visible:outline-none ui-text-body font-medium"
          type="text"
          placeholder={searchPlaceholder}
        />
      </div>
      <div className="flex gap-4 items-center">
        <ToggleTheme />
        <button className="p-2 ui-bg-surface-page rounded-full leading-none border ui-border-brand">
          <i className="nf nf-oct-bell text-xl ui-text-brand leading-none"></i>
        </button>
        {profileProps ? <Profile {...profileProps} /> : null}
      </div>
    </div>
  );
}

export default Navbar;
export type { NavbarProps };
