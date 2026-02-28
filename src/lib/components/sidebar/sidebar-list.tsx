import { Children, type ReactNode } from 'react';

type SidebarListProps = {
  children: ReactNode;
};

function SidebarList({ children }: SidebarListProps) {
  const childs = Children.toArray(children);

  return (
    <ul className="flex flex-col gap-2">
      {childs.map((child, i) => (
        <li key={i}>{child}</li>
      ))}
    </ul>
  );
}

export default SidebarList;
export type { SidebarListProps };
