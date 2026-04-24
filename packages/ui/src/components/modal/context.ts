import { createContext, type RefObject, useContext } from 'react';

type ModalContextValue = {
  onClose: () => void;
  previousActiveElementRef: RefObject<HTMLElement | null>;
  titleId: string;
};

const ModalContext = createContext<ModalContextValue | null>(null);

function useModalContext(componentName: string) {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error(`<Modal.${componentName}> must be used within <Modal>.`);
  }

  return context;
}

export type { ModalContextValue };
export { ModalContext, useModalContext };
