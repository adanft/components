import { Profile, type ProfileProps, ThemeSwitch } from '@adanft/ui';
import { Bell, Search } from 'lucide-react';

type NavbarProps = {
  profileProps?: ProfileProps;
  searchPlaceholder?: string;
};

function Navbar({ profileProps, searchPlaceholder = 'Search' }: NavbarProps) {
  return (
    <div className="fixed left-[65px] top-0 right-0 h-[97px] bg-surface border-separator border-b shadow-card px-8 flex justify-between items-center z-10">
      <div></div>
      <div className="flex gap-4 border border-brand px-4 py-2 rounded-full bg-background">
        <Search aria-hidden="true" className="text-brand size-5 mt-0.5 stroke-2" />
        <input
          className="w-full bg-background focus-visible:outline-none text-foreground font-medium"
          type="text"
          placeholder={searchPlaceholder}
        />
      </div>
      <div className="flex gap-4 items-center">
        <ThemeSwitch />
        <button
          type="button"
          className="p-2 bg-background rounded-full leading-none border border-brand">
          <Bell aria-hidden="true" className="text-brand size-5 stroke-2" />
        </button>
        {profileProps ? <Profile {...profileProps} /> : null}
      </div>
    </div>
  );
}

export default Navbar;
export type { NavbarProps };
