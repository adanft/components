import { type ReactNode, useState } from 'react';

type Props = {
  children: ReactNode;
  iconName: string;
  text: string;
};

function SidebarLinkList({ children, text, iconName }: Props) {
  const [show, setShow] = useState(false);
  return (
    <div className={`${show && 'bg-indigo-500/5'}`}>
      <button
        className="flex px-2 leading-none items-center text-color gap-4 rounded-md w-full"
        onClick={() => setShow(!show)}>
        <i className={`nf leading-none ${iconName} p-3.5 text-xl`} />
        <span className="font-medium whitespace-nowrap">{text}</span>
        <i
          className={`ml-auto nf leading-none nf-fa-angle_down duration-300 ${
            show && 'rotate-180'
          } p-3.5 text-xl`}
        />
      </button>

      <div
        className={`grid gap-2 overflow-hidden transition-all duration-300 ${
          show ? 'grid-rows-[1fr] mt-2' : 'grid-rows-[0fr]'
        }`}>
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

export default SidebarLinkList;
