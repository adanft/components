import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../../helpers/cn';
import { SidebarClosedIcon, SidebarOpenIcon } from '../../icons';
import { useSidebarContext } from './context';

type SidebarHeadProps = ComponentPropsWithoutRef<'header'> & {
  href?: string;
  logoSrc: string;
  title: string;
};

function SidebarHead({ className, href = '/', logoSrc, title, ...props }: SidebarHeadProps) {
  const { action, state } = useSidebarContext('Head');
  const ToggleIcon = state ? SidebarOpenIcon : SidebarClosedIcon;

  return (
    <header {...props} className={cn('relative flex shrink-0 items-center p-2', className)}>
      <a href={href} className="flex items-center gap-2 overflow-hidden">
        <img src={logoSrc} alt={`${title} logo`} width={48} height={48} />
        <span className="font-semibold text-2xl whitespace-nowrap text-brand">{title}</span>
      </a>
      <button
        type="button"
        aria-label={state ? 'Collapse sidebar' : 'Expand sidebar'}
        className={cn(
          'absolute top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center cursor-pointer rounded-md border-2 border-brand leading-none text-brand transition-all duration-300',
          state ? 'left-[calc(100%-44px)]' : 'left-[calc(100%+8px)]',
        )}
        onClick={() => action(!state)}>
        <ToggleIcon aria-hidden="true" className="size-5 stroke-2" />
      </button>
    </header>
  );
}

export default SidebarHead;
export type { SidebarHeadProps };
