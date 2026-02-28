import { Children, isValidElement, type ReactNode } from 'react';

type SidebarListProps = {
  children: ReactNode;
};

function getKey(child: ReactNode, index: number) {
  return isValidElement(child) && child.key !== null ? child.key : `sidebar-list-li-${index}`;
}

function SidebarList({ children }: SidebarListProps) {
  const childs = Children.toArray(children);

  return (
    <ul className="flex flex-col gap-2">
      {childs.map((child, index) => (
        <li key={getKey(child, index)}>{child}</li>
      ))}
    </ul>
  );
}

export default SidebarList;
export type { SidebarListProps };
