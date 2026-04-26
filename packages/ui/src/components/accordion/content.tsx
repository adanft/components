import type { ComponentPropsWithoutRef } from 'react';

import { useAccordionItemContext } from './context';

type AccordionContentProps = ComponentPropsWithoutRef<'section'> & {
  keepMounted?: boolean;
};

function AccordionContent({ children, keepMounted = false, ...props }: AccordionContentProps) {
  const itemContext = useAccordionItemContext('Content');

  if (!keepMounted && !itemContext.open) {
    return null;
  }

  return (
    <section
      {...props}
      id={itemContext.contentId}
      aria-labelledby={itemContext.triggerId}
      data-state={itemContext.open ? 'open' : 'closed'}
      hidden={!itemContext.open}>
      {children}
    </section>
  );
}

export default AccordionContent;
export type { AccordionContentProps };
