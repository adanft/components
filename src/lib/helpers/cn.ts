import { twMerge } from 'tailwind-merge';

type ClassNameType = boolean | null | string | undefined;

function cn(...values: ClassNameType[]) {
  return twMerge(values.filter(Boolean).join(' '));
}

export { cn };
export type { ClassNameType };
