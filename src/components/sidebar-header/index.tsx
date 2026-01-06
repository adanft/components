import { Link } from 'react-router';

type Props = {
  action: (prop: boolean) => void;
  state: boolean;
};

function SidebarHeader({ action, state }: Props) {
  return (
    <header className="relative flex items-center h-24 p-2">
      <Link to="/" className="flex items-center gap-2 overflow-hidden">
        <img src="/logo.png" alt="logo" width={48} height={48} />
        <span className="font-semibold text-2xl whitespace-nowrap text-primary-color">Sidebar</span>
      </Link>
      <button
        className={`text-primary-color leading-none transition-all duration-300 absolute top-2/4 -translate-y-1/2 ${
          state ? 'left-68.5' : 'left-18.25'
        } border-2 border-primary-color p-2 rounded-md`}
        onClick={() => action(!state)}>
        <i
          className={`nf ${
            state ? 'nf-md-format_align_left' : 'nf-md-format_align_right'
          } text-lg leading-none`}></i>
      </button>
    </header>
  );
}

export default SidebarHeader;
