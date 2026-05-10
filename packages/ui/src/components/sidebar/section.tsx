import { type ComponentPropsWithoutRef, useContext } from 'react';

import { cn } from '../../helpers/cn';
import { MinusIcon } from '../../icons';
import { SidebarContext } from './context';

type SidebarSectionProps = ComponentPropsWithoutRef<'h5'> & {
  text: string;
};

function SidebarSection({ text, className, ...props }: SidebarSectionProps) {
  const sidebar = useContext(SidebarContext);

  return (
    <h5
      className={cn(
        'py-4 text-sm font-semibold whitespace-nowrap text-muted uppercase',
        sidebar?.state ? 'px-2' : 'px-6',
        className,
      )}
      {...props}>
      <MinusIcon aria-hidden="true" className="inline size-4 stroke-2" />
      <span className="ml-6">{text}</span>
    </h5>
  );
}

export default SidebarSection;
export type { SidebarSectionProps };
