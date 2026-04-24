import type { ComponentPropsWithoutRef } from 'react';
import { useId } from 'react';

import { AccordionContext } from './context';

type AccordionProps = ComponentPropsWithoutRef<'div'> & {
  collapsible?: boolean;
  onValueChange: (value: string | null) => void;
  value: string | null;
};

function Accordion({
  children,
  collapsible = true,
  onValueChange,
  value,
  ...props
}: AccordionProps) {
  const baseId = useId();

  return (
    <AccordionContext.Provider
      value={{
        baseId,
        collapsible,
        onValueChange,
        value,
      }}>
      <div {...props} data-accordion-root="true">
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export default Accordion;
export type { AccordionProps };
