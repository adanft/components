import type { ComponentPropsWithoutRef } from 'react';

import { useAccordionItemContext } from './context';

type AccordionContentProps = ComponentPropsWithoutRef<'section'>;

function AccordionContent({ children, ...props }: AccordionContentProps) {
  const itemContext = useAccordionItemContext('Content');

  return (
    <section
      id={itemContext.contentId}
      aria-labelledby={itemContext.triggerId}
      data-state={itemContext.open ? 'open' : 'closed'}
      hidden={!itemContext.open}
      {...props}>
      {children}
    </section>
  );
}

export default AccordionContent;
export type { AccordionContentProps };
