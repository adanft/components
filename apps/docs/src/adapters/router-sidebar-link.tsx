import type { LucideIcon } from 'lucide-react';
import { Link, useMatch, useResolvedPath } from 'react-router';

import { SidebarLink } from '@adanft/ui';

type RouterSidebarLinkProps = {
  className?: string;
  href: string;
  icon: LucideIcon;
  text: string;
};

function RouterSidebarLink({ className, href, icon, text }: RouterSidebarLinkProps) {
  const resolvedPath = useResolvedPath(href);
  const match = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <SidebarLink
      asChild
      active={Boolean(match)}
      className={className}
      href={href}
      icon={icon}
      text={text}>
      <Link to={href} />
    </SidebarLink>
  );
}

export default RouterSidebarLink;
