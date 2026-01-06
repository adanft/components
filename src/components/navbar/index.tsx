import Profile from '../profile';
import ToggleTheme from '../toggle-theme';

function Navbar() {
  return (
    <div className="fixed left-16.25 top-0 right-0 h-24.25 bg-secondary-color border-color border-b shadow-personal px-8 flex justify-between items-center z-10">
      <div></div>
      <div className="flex gap-4 border border-primary-color px-4 py-2 rounded-full bg-primary-color">
        <i className="nf nf-fa-search text-primary-color text-xl mt-0.5"></i>
        <input
          className="w-full bg-primary-color focus-visible:outline-none text-color font-medium"
          type="text"
          placeholder="Search"
        />
      </div>
      <div className="flex gap-4 items-center">
        <ToggleTheme />
        <button className="p-2 bg-primary-color rounded-full leading-none border border-primary-color">
          <i className="nf nf-oct-bell text-xl text-primary-color leading-none"></i>
        </button>
        <Profile />
      </div>
    </div>
  );
}

export default Navbar;
