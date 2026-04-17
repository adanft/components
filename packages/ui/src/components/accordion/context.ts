import { createContext, useContext } from 'react';

type AccordionContextValue = {
  baseId: string;
  onValueChange: (value: string | null) => void;
  value: string | null;
};

type AccordionItemContextValue = {
  contentId: string;
  open: boolean;
  triggerId: string;
  value: string;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);
const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

function useAccordionContext(componentName: string) {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error(`<Accordion.${componentName}> must be used within <Accordion>.`);
  }

  return context;
}

function useAccordionItemContext(componentName: string) {
  const context = useContext(AccordionItemContext);

  if (!context) {
    throw new Error(`<Accordion.${componentName}> must be used within <Accordion.Item>.`);
  }

  return context;
}

export type { AccordionContextValue, AccordionItemContextValue };
export { AccordionContext, AccordionItemContext, useAccordionContext, useAccordionItemContext };
