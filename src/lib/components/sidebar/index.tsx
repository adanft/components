import { type ComponentPropsWithoutRef } from 'react';

import useOutsideHandler from '../../../hooks/use-outside-handler';

type SidebarProps = ComponentPropsWithoutRef<'aside'> & {
  state: boolean;
  action: (state: boolean) => void;
};

function Sidebar({ className, children, state, action, ...props }: SidebarProps) {
  const asideRef = useOutsideHandler<HTMLElement>(() => {
    action(false);
  });

  const sidebarClassName = [
    'transition-all duration-300 fixed min-h-screen z-20 top-0 left-0 border-r ui-border-default ui-shadow-sm ui-bg-surface-raised',
    state ? 'w-[321px]' : 'w-[65px]',
    className,
  ].join(' ');

  return (
    <aside {...props} ref={asideRef} className={sidebarClassName}>
      {children}
    </aside>
  );
}

export default Sidebar;
export type { SidebarProps };
