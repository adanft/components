import { Link } from 'react-router';

type SidebarLinkProps = {
  className?: string;
  href: string;
  nfIconName: string;
  text: string;
};

const defaultClassName = 'flex px-2 leading-none items-center text-foreground gap-4 rounded-md';

function SidebarLink({ className = defaultClassName, href, nfIconName, text }: SidebarLinkProps) {
  return (
    <Link className={className} to={href}>
      <i className={`nf leading-none ${nfIconName} p-3.5 text-xl`} />
      <span className="font-medium">{text}</span>
    </Link>
  );
}

export default SidebarLink;
export type { SidebarLinkProps };
