import type { ReactNode } from 'react';
import { Link } from 'react-router';

type LinkAdapterProps = {
  children: ReactNode;
  className: string;
  href: string;
};

function RouterLinkAdapter({ children, className, href }: LinkAdapterProps) {
  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  );
}

export { RouterLinkAdapter };
