import { createContext, useContext } from 'react';

type ModalContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const ModalContext = createContext<ModalContextValue | null>(null);

function useModalContext(componentName: string) {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error(`${componentName} must be used within Modal.Root.`);
  }

  return context;
}

export { ModalContext, useModalContext };
export type { ModalContextValue };
