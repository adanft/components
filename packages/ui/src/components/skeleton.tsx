import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../helpers/cn';

type SkeletonShape = 'text' | 'block' | 'rounded' | 'circle';
type SkeletonAnimation = 'none' | 'pulse';

type SkeletonProps = ComponentPropsWithoutRef<'div'> & {
  animation?: SkeletonAnimation;
  shape?: SkeletonShape;
};

const shapeClasses: Record<SkeletonShape, string> = {
  text: 'h-4 w-full rounded-md',
  block: 'h-24 w-full rounded-none',
  rounded: 'h-24 w-full rounded-xl',
  circle: 'size-10 rounded-full',
};

const animationClasses: Record<SkeletonAnimation, string> = {
  none: 'animate-none',
  pulse: 'motion-safe:animate-pulse motion-reduce:animate-none',
};

function Skeleton({ animation = 'pulse', className, shape = 'text', ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('bg-muted', shapeClasses[shape], animationClasses[animation], className)}
      {...props}
    />
  );
}

export type { SkeletonAnimation, SkeletonProps, SkeletonShape };
export default Skeleton;
