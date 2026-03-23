import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../helpers/cn';

type AvatarProps = ComponentPropsWithoutRef<'div'> & {
  type: 'image' | 'text';
  src?: string;
  alt?: string;
  text?: string;
};

function Avatar({ type, src, alt, text, className, ...props }: AvatarProps) {
  if (type === 'image') {
    return (
      <img
        src={src}
        alt={alt}
        width={64}
        height={64}
        className={cn('w-16 h-16 rounded-full bg-background object-cover', className)}
      />
    );
  }

  return (
    <div
      className={cn(
        'w-14 h-14 rounded-full bg-brand text-white flex items-center justify-center font-semibold uppercase text-lg leading-none tracking-wide',
        className,
      )}
      {...props}>
      {text ?? ''}
    </div>
  );
}

export default Avatar;
export type { AvatarProps };
