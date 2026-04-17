import { Minus } from 'lucide-react';
import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../../helpers/cn';

type SidebarSectionProps = ComponentPropsWithoutRef<'h5'> & {
  text: string;
};

function SidebarSection({ text, className, ...props }: SidebarSectionProps) {
  return (
    <h5
      className={cn('text-muted py-4 text-lg font-semibold whitespace-nowrap px-6', className)}
      {...props}>
      <Minus aria-hidden="true" className="inline size-4 stroke-2" />
      <span className="ml-6">{text}</span>
    </h5>
  );
}

export default SidebarSection;
export type { SidebarSectionProps };
