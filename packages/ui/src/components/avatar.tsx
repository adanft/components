import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../helpers/cn';

type AvatarSize = 'sm' | 'md' | 'lg';

interface AvatarBaseProps {
  className?: string;
  size?: AvatarSize;
}

interface AvatarImageProps
  extends Omit<ComponentPropsWithoutRef<'img'>, 'src' | 'alt'>,
    AvatarBaseProps {
  type: 'image';
  src: string;
  alt: string;
}

interface AvatarTextProps extends ComponentPropsWithoutRef<'div'>, AvatarBaseProps {
  type: 'text';
  text: string;
}

type AvatarProps = AvatarImageProps | AvatarTextProps;

const avatarSizeConfig: Record<
  AvatarSize,
  { className: string; dimension: number; textClassName: string }
> = {
  sm: {
    className: 'size-10',
    dimension: 40,
    textClassName: 'text-sm',
  },
  md: {
    className: 'size-14',
    dimension: 56,
    textClassName: 'text-lg',
  },
  lg: {
    className: 'size-16',
    dimension: 64,
    textClassName: 'text-xl',
  },
};

function Avatar({ type, size = 'md', className, ...props }: AvatarProps) {
  const sizeConfig = avatarSizeConfig[size];

  if (type === 'image') {
    const imageProps = props as AvatarImageProps;
    const { alt, src, ...restImageProps } = imageProps;

    return (
      <img
        src={src}
        alt={alt}
        width={sizeConfig.dimension}
        height={sizeConfig.dimension}
        {...restImageProps}
        className={cn('rounded-full bg-background object-cover', sizeConfig.className, className)}
      />
    );
  }

  const textProps = props as AvatarTextProps;
  const { text, ...restTextProps } = textProps;

  return (
    <div
      className={cn(
        'rounded-full bg-brand text-white flex items-center justify-center font-semibold uppercase leading-none tracking-wide',
        sizeConfig.className,
        sizeConfig.textClassName,
        className,
      )}
      {...restTextProps}>
      {text}
    </div>
  );
}

export default Avatar;
export type { AvatarProps, AvatarSize };
