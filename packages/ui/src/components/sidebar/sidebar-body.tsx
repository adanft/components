import type { ComponentPropsWithoutRef } from 'react';

import SimpleBar from 'simplebar-react';
import { cn } from '../../helpers/cn';

type SidebarBodyProps = ComponentPropsWithoutRef<'div'>;

function SidebarBody({ children, className, ...props }: SidebarBodyProps) {
  return (
    <SimpleBar {...props} className={cn('h-full overflow-x-hidden', className)}>
      <nav aria-label="Sidebar" className="flex flex-col gap-2">
        {children}
      </nav>
    </SimpleBar>
  );
}

export default SidebarBody;
export type { SidebarBodyProps };
