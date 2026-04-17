import type { ComponentPropsWithoutRef } from 'react';
import { useId } from 'react';

import { AccordionContext } from './context';

type AccordionProps = ComponentPropsWithoutRef<'div'> & {
  onValueChange: (value: string | null) => void;
  value: string | null;
};

function Accordion({ children, onValueChange, value, ...props }: AccordionProps) {
  const baseId = useId();

  return (
    <AccordionContext.Provider
      value={{
        baseId,
        onValueChange,
        value,
      }}>
      <div data-accordion-root="true" {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export default Accordion;
export type { AccordionProps };
