import { NavLink } from 'react-router';

type Props = {
  nfIconName: string;
  text: string;
  href: string;
};

function SidebarLink({ text, nfIconName, href }: Props) {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive
          ? 'active flex mx-2 leading-none items-center text-color gap-4 rounded-md'
          : 'flex px-2 leading-none items-center text-color gap-4 rounded-md'
      }
      to={href}>
      <i className={`nf leading-none ${nfIconName} p-3.5 text-xl`} />
      <span className="font-medium">{text}</span>
    </NavLink>
  );
}

export default SidebarLink;
