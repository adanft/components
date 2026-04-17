import ModalBackdrop from './backdrop';
import ModalRoot from './modal';
import ModalPanel from './panel';
import ModalTitle from './title';

const Modal = Object.assign(ModalRoot, {
  Backdrop: ModalBackdrop,
  Panel: ModalPanel,
  Title: ModalTitle,
});

export default Modal;
export type { ModalBackdropProps } from './backdrop';
export type { ModalProps } from './modal';
export type { ModalPanelProps } from './panel';
export type { ModalTitleProps } from './title';
