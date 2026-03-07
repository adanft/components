import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../../helpers/cn';

type TableCaptionProps = ComponentPropsWithoutRef<'caption'>;

function TableCaption({ className, ...props }: TableCaptionProps) {
  const captionClassName = cn('caption-bottom', 'pt-3', 'text-sm', 'ui-text-muted', className);

  return <caption {...props} className={captionClassName} />;
}

export default TableCaption;
export type { TableCaptionProps };
