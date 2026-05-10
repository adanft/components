import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../../helpers/cn';
import { useModalContext } from './context';

type ModalTitleProps = ComponentPropsWithoutRef<'h2'>;

function ModalTitle({ className, ...props }: ModalTitleProps) {
  const { titleId } = useModalContext('Title');

  return (
    <h2 className={cn('text-lg font-semibold text-heading', className)} {...props} id={titleId} />
  );
}

export default ModalTitle;
export type { ModalTitleProps };
