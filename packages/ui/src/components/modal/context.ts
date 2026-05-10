import { createContext, type RefObject, useContext } from 'react';

type ModalContextValue = {
  initialFocusRef: RefObject<HTMLElement | null>;
  onClose: () => void;
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

export { ModalContext, useModalContext };
