import { type ComponentPropsWithoutRef } from 'react';

import useOutsideHandler from '../../../hooks/use-outside-handler';
import { cn } from '../../helpers/cn';

type SidebarProps = ComponentPropsWithoutRef<'aside'> & {
  state: boolean;
  action: (state: boolean) => void;
};

function Sidebar({ className, children, state, action, ...props }: SidebarProps) {
  const asideRef = useOutsideHandler<HTMLElement>(() => {
    action(false);
  });

  const sidebarClassName = cn(
    'transition-all duration-300 fixed min-h-screen z-20 top-0 left-0 border-r border-border shadow-card bg-surface',
    state ? 'w-80.25' : 'w-16.25',
    className,
  );

  return (
    <aside {...props} ref={asideRef} className={sidebarClassName}>
      {children}
    </aside>
  );
}

export default Sidebar;
export type { SidebarProps };
