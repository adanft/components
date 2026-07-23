import { type ComponentPropsWithoutRef, type KeyboardEventHandler, useId, useRef } from 'react';
import { cn } from '../../helpers/cn';
import useOutsideHandler from '../../hooks/use-outside-handler';
import { SidebarContext } from './context';

type SidebarProps = ComponentPropsWithoutRef<'aside'> & {
  state: boolean;
  action: (state: boolean) => void;
};

function Sidebar({ className, children, id, onKeyDown, state, action, ...props }: SidebarProps) {
  const autoId = useId();
  const sidebarId = id ?? `sidebar-${autoId}`;
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const asideRef = useOutsideHandler<HTMLElement>(() => {
    action(false);
  });
  const handleKeyDown: KeyboardEventHandler<HTMLElement> = (event) => {
    onKeyDown?.(event);

    if (event.key !== 'Escape' || event.defaultPrevented || !state) return;

    event.preventDefault();
    action(false);
    toggleRef.current?.focus();
  };

  const sidebarClassName = cn(
    'fixed top-0 left-0 z-20 flex h-screen min-h-0 flex-col border-r border-separator bg-surface shadow-card transition-[width] duration-300',
    state ? 'w-75.25' : 'w-16.25',
    className,
  );

  return (
    <SidebarContext.Provider value={{ action, collapsed: !state, sidebarId, state, toggleRef }}>
      <aside
        {...props}
        id={sidebarId}
        ref={asideRef}
        className={sidebarClassName}
        onKeyDown={handleKeyDown}>
        {children}
      </aside>
    </SidebarContext.Provider>
  );
}

export default Sidebar;
export type { SidebarProps };
export { Sidebar };
