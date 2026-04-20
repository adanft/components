import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../helpers/cn';

type SkeletonAnimation = 'none' | 'pulse';

type SkeletonProps = ComponentPropsWithoutRef<'div'> & {
  animation?: SkeletonAnimation;
};

const animationClasses: Record<SkeletonAnimation, string> = {
  none: 'animate-none',
  pulse: 'motion-safe:animate-pulse motion-reduce:animate-none',
};

function Skeleton({ animation = 'pulse', className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('bg-muted', animationClasses[animation], className)}
      {...props}
    />
  );
}

export type { SkeletonAnimation, SkeletonProps };
export default Skeleton;
