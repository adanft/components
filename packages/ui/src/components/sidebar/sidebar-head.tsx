import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../../helpers/cn';
import { useSidebarContext } from './context';

type SidebarHeadProps = ComponentPropsWithoutRef<'header'> & {
  href?: string;
  logoSrc: string;
  title: string;
};

function SidebarHead({ className, href = '/', logoSrc, title, ...props }: SidebarHeadProps) {
  const { action, state } = useSidebarContext('Head');
  const ToggleIcon = state ? PanelLeftClose : PanelLeftOpen;

  return (
    <header {...props} className={cn('relative flex items-center h-24 p-2', className)}>
      <a href={href} className="flex items-center gap-2 overflow-hidden">
        <img src={logoSrc} alt={`${title} logo`} width={48} height={48} />
        <span className="font-semibold text-2xl whitespace-nowrap text-brand">{title}</span>
      </a>
      <button
        type="button"
        aria-label={state ? 'Collapse sidebar' : 'Expand sidebar'}
        className={cn(
          'absolute top-2/4 -translate-y-1/2 cursor-pointer rounded-md border-2 border-brand p-2 leading-none text-brand transition-all duration-300',
          state ? 'left-68.5' : 'left-18.5',
        )}
        onClick={() => action(!state)}>
        <ToggleIcon aria-hidden="true" className="size-5 stroke-2" />
      </button>
    </header>
  );
}

export default SidebarHead;
export type { SidebarHeadProps };
