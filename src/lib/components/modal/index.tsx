import ModalRoot from './modal';
import ModalBackdrop from './backdrop';
import ModalPanel from './panel';
import ModalTitle from './title';

const Modal = Object.assign(ModalRoot, {
  Backdrop: ModalBackdrop,
  Panel: ModalPanel,
  Title: ModalTitle,
});

export default Modal;
export type { ModalProps } from './modal';
export type { ModalBackdropProps } from './backdrop';
export type { ModalPanelProps } from './panel';
export type { ModalTitleProps } from './title';
