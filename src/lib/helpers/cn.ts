type ClassNameType = false | null | string | undefined;

function cn(...values: ClassNameType[]) {
  return values.filter(Boolean).join(' ');
}

export { cn };
export type { ClassNameType };
