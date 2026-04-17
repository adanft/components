import type { ComponentPropsWithoutRef } from 'react';

import { useModalContext } from './context';

type ModalTitleProps = ComponentPropsWithoutRef<'h2'>;

function ModalTitle(props: ModalTitleProps) {
  const { titleId } = useModalContext('Title');

  return <h2 {...props} id={titleId} />;
}

export default ModalTitle;
export type { ModalTitleProps };
