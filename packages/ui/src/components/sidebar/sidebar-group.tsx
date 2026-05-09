import {
  Children,
  type ComponentType,
  isValidElement,
  type ReactElement,
  type ReactNode,
  type SVGProps,
  useId,
  useState,
} from 'react';

import { cn } from '../../helpers/cn';
import { ChevronDownIcon } from '../../icons';
import Popover from '../../primitives/popover';
import { useSidebarContext } from './context';
import SidebarGroupLink from './sidebar-group-link';

type SidebarIcon = ComponentType<SVGProps<SVGSVGElement>>;

type SidebarGroupProps = {
  active?: boolean;
  children: ReactNode;
  icon: SidebarIcon;
  text: string;
};

type SidebarGroupManualOverride = {
  activeKey: string | null;
  open: boolean;
};

type SidebarGroupLinkElement = ReactElement<{ className?: string }> & {
  props: {
    active?: boolean;
    className?: string;
    href?: string;
  };
  type: {
    __sidebarGroupLink?: boolean;
  };
};

function isSidebarGroupLinkElement(child: ReactNode): child is SidebarGroupLinkElement {
  return (
    isValidElement(child) &&
    (child.type === SidebarGroupLink ||
      Boolean((child as SidebarGroupLinkElement).type.__sidebarGroupLink))
  );
}

function SidebarGroup({ active = false, children, icon, text }: SidebarGroupProps) {
  const Icon = icon;
  const [floatOpen, setFloatOpen] = useState(false);
  const contentId = useId();
  const { collapsed } = useSidebarContext('Group');
  const groupLinks = Children.toArray(children).map((child) => {
    if (!isSidebarGroupLinkElement(child)) {
      throw new Error('<SidebarGroup> only accepts <SidebarGroupLink> children.');
    }
    return child;
  });
  const activeGroupLink = groupLinks.find((child) => child.props.active);
  const activeKey = activeGroupLink?.props.href ?? null;
  const hasActiveGroupLink = groupLinks.some((child) => child.props.active);
  const [manualOverride, setManualOverride] = useState<SidebarGroupManualOverride | null>(null);
  const groupOpen =
    manualOverride && manualOverride.activeKey === activeKey
      ? manualOverride.open
      : hasActiveGroupLink;

  const trigger = (
    <button
      type="button"
      className={cn(
        'flex w-full items-center gap-4 rounded-md text-left leading-none text-foreground',
        active && 'text-brand',
        'px-2',
      )}
      onClick={
        collapsed
          ? undefined
          : () =>
              setManualOverride({
                activeKey,
                open: !groupOpen,
              })
      }
      aria-controls={collapsed ? undefined : contentId}
      aria-expanded={collapsed ? undefined : groupOpen}
      aria-label={collapsed ? text : undefined}>
      <span className="flex shrink-0 items-center justify-center p-3.5">
        <Icon aria-hidden="true" className="size-5 stroke-2" />
      </span>
      <span className="font-medium whitespace-nowrap">{text}</span>
      <span className="ml-auto flex shrink-0 items-center justify-center p-3.5">
        <ChevronDownIcon
          aria-hidden="true"
          className={cn(
            'size-5 stroke-2 transition-transform duration-300',
            groupOpen && 'rotate-180',
          )}
        />
      </span>
    </button>
  );

  if (collapsed) {
    return (
      <Popover
        open={floatOpen}
        onOpenChange={setFloatOpen}
        placement="right-start"
        contentRole={null}
        triggerHasPopup={false}>
        <Popover.Trigger>{trigger}</Popover.Trigger>
        <Popover.Content className="z-30 min-w-64 rounded-md border border-border bg-surface p-2 shadow-card">
          <p className="px-3 py-2 text-sm font-semibold uppercase text-muted">{text}</p>
          <div className="flex flex-col gap-2">{groupLinks}</div>
        </Popover.Content>
      </Popover>
    );
  }

  return (
    <div>
      {trigger}

      <div
        id={contentId}
        className={cn(
          'grid overflow-hidden transition-[grid-template-rows] duration-300',
          groupOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}>
        <div className="overflow-hidden mx-7.75">
          <div className="px-7 border-l border-muted">{groupLinks}</div>
        </div>
      </div>
    </div>
  );
}

export default SidebarGroup;
export type { SidebarGroupProps };
