import { NavLink } from "react-router";

import { cn } from "../../helpers/cn";

type SidebarLinkProps = {
  className?: string;
  href: string;
  nfIconName: string;
  text: string;
};

function SidebarLink({ className, href, nfIconName, text }: SidebarLinkProps) {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        cn(
          "flex leading-none items-center text-foreground gap-4 rounded-md",
          isActive ? "bg-brand text-white mx-2" : "px-2",
          className,
        )
      }
    >
      <i className={`nf leading-none ${nfIconName} p-3.5 text-xl`} />
      <span className="font-medium">{text}</span>
    </NavLink>
  );
}

export default SidebarLink;
export type { SidebarLinkProps };
