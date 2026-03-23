import { type ReactNode, useId, useState } from 'react';

import { cn } from '../../helpers/cn';

type SidebarGroupProps = {
  children: ReactNode;
  iconName: string;
  text: string;
};

function SidebarGroup({ children, iconName, text }: SidebarGroupProps) {
  const [show, setShow] = useState(false);
  const contentId = useId();

  return (
    <div className={cn(show && 'bg-brand/5')}>
      <button
        type="button"
        className="flex px-2 leading-none items-center text-foreground gap-4 rounded-md w-full"
        onClick={() => setShow((s) => !s)}
        aria-expanded={show}
        aria-controls={contentId}>
        <i aria-hidden="true" className={cn('nf leading-none p-3.5 text-xl', iconName)} />
        <span className="font-medium whitespace-nowrap">{text}</span>
        <i
          aria-hidden="true"
          className={cn(
            'ml-auto nf leading-none nf-fa-angle_down duration-300 p-3.5 text-xl',
            show && 'rotate-180',
          )}
        />
      </button>

      <div
        id={contentId}
        className={cn(
          'grid gap-2 overflow-hidden transition-all duration-300',
          show ? 'grid-rows-[1fr] mt-2' : 'grid-rows-[0fr]',
        )}>
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

export default SidebarGroup;
export type { SidebarGroupProps };
