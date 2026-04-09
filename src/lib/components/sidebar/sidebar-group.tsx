import { ChevronDown, type LucideIcon } from 'lucide-react';
import { type ReactNode, useId, useState } from 'react';

import { cn } from '../../helpers/cn';

type SidebarGroupProps = {
  children: ReactNode;
  icon: LucideIcon;
  text: string;
};

function SidebarGroup({ children, icon, text }: SidebarGroupProps) {
  const IconComponent = icon;
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
        <span className="flex shrink-0 items-center justify-center p-3.5">
          <IconComponent aria-hidden="true" className="size-5 stroke-2" />
        </span>
        <span className="font-medium whitespace-nowrap">{text}</span>
        <span className="ml-auto flex shrink-0 items-center justify-center p-3.5">
          <ChevronDown
            aria-hidden="true"
            className={cn('duration-300 size-5 stroke-2', show && 'rotate-180')}
          />
        </span>
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
