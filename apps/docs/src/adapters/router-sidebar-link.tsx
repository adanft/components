import { SidebarLink } from '@adanft/ui';
import type { LucideIcon } from 'lucide-react';
import { Link, useMatch, useResolvedPath } from 'react-router';

type RouterSidebarLinkProps = {
  active?: boolean;
  className?: string;
  href: string;
  icon: LucideIcon;
  text: string;
};

function RouterSidebarLink({ active, className, href, icon, text }: RouterSidebarLinkProps) {
  const resolvedPath = useResolvedPath(href);
  const match = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <SidebarLink
      asChild
      active={active ?? Boolean(match)}
      className={className}
      icon={icon}
      text={text}>
      <Link to={href} />
    </SidebarLink>
  );
}

export default RouterSidebarLink;
