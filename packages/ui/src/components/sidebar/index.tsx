import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '../../helpers/cn';
import useOutsideHandler from '../../hooks/use-outside-handler';
import { SidebarContext } from './context';

type SidebarProps = ComponentPropsWithoutRef<'aside'> & {
  state: boolean;
  action: (state: boolean) => void;
};

function Sidebar({ className, children, state, action, ...props }: SidebarProps) {
  const asideRef = useOutsideHandler<HTMLElement>(() => {
    action(false);
  });

  const sidebarClassName = cn(
    'transition-all duration-300 fixed h-screen min-h-0 z-20 top-0 left-0 border-r border-separator shadow-card bg-surface flex flex-col',
    state ? 'w-75.25' : 'w-16.25',
    className,
  );

  return (
    <SidebarContext.Provider value={{ action, collapsed: !state, state }}>
      <aside {...props} ref={asideRef} className={sidebarClassName}>
        {children}
      </aside>
    </SidebarContext.Provider>
  );
}

export default Sidebar;
export type { SidebarProps };
