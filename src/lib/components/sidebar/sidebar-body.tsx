import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

type SidebarBodyProps = ComponentPropsWithoutRef<'div'> & {
  children: ReactNode;
};

function SidebarBody({ children, className }: SidebarBodyProps) {
  const componentClass = ['max-h-[calc(100vh-96px)]', 'overflow-x-hidden', className].join(' ');
  return (
    <SimpleBar className={componentClass}>
      <nav className="flex flex-col gap-2">{children}</nav>
    </SimpleBar>
  );
}

export default SidebarBody;
export type { SidebarBodyProps };
