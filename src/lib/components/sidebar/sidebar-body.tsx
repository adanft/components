import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { cn } from '../../helpers/cn';

type SidebarBodyProps = ComponentPropsWithoutRef<'div'> & {
  children: ReactNode;
};

function SidebarBody({ children, className }: SidebarBodyProps) {
  const componentClass = cn('h-full overflow-x-hidden', className);
  return (
    <SimpleBar className={componentClass}>
      <nav className="flex flex-col gap-2">{children}</nav>
    </SimpleBar>
  );
}

export default SidebarBody;
export type { SidebarBodyProps };
