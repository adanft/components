import ModalBody from './body';
import ModalClose from './close';
import ModalRoot from './root';
import ModalTrigger from './trigger';

const Modal = {
  Root: ModalRoot,
  Trigger: ModalTrigger,
  Body: ModalBody,
  Close: ModalClose,
};

export default Modal;
export { ModalBody, ModalClose, ModalRoot, ModalTrigger };
export type { ModalBodyProps } from './body';
export type { ModalCloseProps } from './close';
export type { ModalRootProps } from './root';
export type { ModalTriggerProps } from './trigger';
