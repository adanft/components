import type { ComponentPropsWithoutRef } from 'react';

type TableCaptionProps = ComponentPropsWithoutRef<'caption'>;

function TableCaption({ className, ...props }: TableCaptionProps) {
  const captionClassName = ['caption-bottom', 'pt-3', 'text-sm', 'ui-text-muted', className]
    .filter(Boolean)
    .join(' ');

  return <caption {...props} className={captionClassName} />;
}

export default TableCaption;
export type { TableCaptionProps };
