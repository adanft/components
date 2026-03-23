import type { ProfileProps } from '../../lib/components/profile';
import Profile from '../../lib/components/profile';
import ToggleTheme from '../toggle-theme';

type NavbarProps = {
  profileProps?: ProfileProps;
  searchPlaceholder?: string;
};

function Navbar({ profileProps, searchPlaceholder = 'Search' }: NavbarProps) {
  return (
    <div className="fixed left-[65px] top-0 right-0 h-[97px] bg-surface border-border border-b shadow-card px-8 flex justify-between items-center z-10">
      <div></div>
      <div className="flex gap-4 border border-brand px-4 py-2 rounded-full bg-background">
        <i className="nf nf-fa-search text-brand text-xl mt-0.5"></i>
        <input
          className="w-full bg-background focus-visible:outline-none text-foreground font-medium"
          type="text"
          placeholder={searchPlaceholder}
        />
      </div>
      <div className="flex gap-4 items-center">
        <ToggleTheme />
        <button className="p-2 bg-background rounded-full leading-none border border-brand">
          <i className="nf nf-oct-bell text-xl text-brand leading-none"></i>
        </button>
        {profileProps ? <Profile {...profileProps} /> : null}
      </div>
    </div>
  );
}

export default Navbar;
export type { NavbarProps };
