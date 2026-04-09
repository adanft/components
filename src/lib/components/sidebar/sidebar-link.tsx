import type { LucideIcon } from 'lucide-react';
import { NavLink } from 'react-router';

import { cn } from '../../helpers/cn';

type SidebarLinkProps = {
  className?: string;
  href: string;
  icon: LucideIcon;
  text: string;
};

function SidebarLink({ className, href, icon, text }: SidebarLinkProps) {
  const IconComponent = icon;

  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        cn(
          'flex leading-none items-center text-foreground gap-4 rounded-md',
          isActive ? 'bg-brand text-white mx-2' : 'px-2',
          className,
        )
      }>
      <span className="flex shrink-0 items-center justify-center p-3.5">
        <IconComponent aria-hidden="true" className="size-5 stroke-2" />
      </span>
      <span className="font-medium">{text}</span>
    </NavLink>
  );
}

export default SidebarLink;
export type { SidebarLinkProps };
