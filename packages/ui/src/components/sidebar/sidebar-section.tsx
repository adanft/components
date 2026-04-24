import { Minus } from 'lucide-react';
import { type ComponentPropsWithoutRef, useContext } from 'react';

import { cn } from '../../helpers/cn';
import { SidebarContext } from './context';

type SidebarSectionProps = ComponentPropsWithoutRef<'h5'> & {
  text: string;
};

function SidebarSection({ text, className, ...props }: SidebarSectionProps) {
  const sidebar = useContext(SidebarContext);

  return (
    <h5
      className={cn(
        'text-muted py-4 text-lg font-semibold whitespace-nowrap',
        sidebar?.state ? 'px-2' : 'px-6',
        className,
      )}
      {...props}>
      <Minus aria-hidden="true" className="inline size-4 stroke-2" />
      <span className="ml-6">{text}</span>
    </h5>
  );
}

export default SidebarSection;
export type { SidebarSectionProps };
