import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

type SidebarHeadProps = {
  action: (prop: boolean) => void;
  href?: string;
  logoSrc: string;
  state: boolean;
  title: string;
};

function SidebarHead({ action, href = '/', logoSrc, state, title }: SidebarHeadProps) {
  const ToggleIcon = state ? PanelLeftClose : PanelLeftOpen;

  return (
    <header className="relative flex items-center h-24 p-2">
      <a href={href} className="flex items-center gap-2 overflow-hidden">
        <img src={logoSrc} alt={`${title} logo`} width={48} height={48} />
        <span className="font-semibold text-2xl whitespace-nowrap text-brand">{title}</span>
      </a>
      <button
        type="button"
        aria-label={state ? 'Collapse sidebar' : 'Expand sidebar'}
        className={`text-brand leading-none transition-all duration-300 absolute top-2/4 -translate-y-1/2 cursor-pointer border-2 border-brand p-2 rounded-md ${state ? 'left-68.5' : 'left-18.5'}`}
        onClick={() => action(!state)}>
        <ToggleIcon aria-hidden="true" className="size-5 stroke-2" />
      </button>
    </header>
  );
}

export default SidebarHead;
export type { SidebarHeadProps };
