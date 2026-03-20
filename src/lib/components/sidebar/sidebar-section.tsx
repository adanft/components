type SidebarSectionProps = {
  text: string;
  state: boolean;
};

function SidebarSection({ text, state }: SidebarSectionProps) {
  return (
    <h5
      className={`text-muted py-4 text-lg font-semibold whitespace-nowrap ${state ? 'px-2' : 'px-6'}`}>
      <i className="nf nf-fa-minus"></i>
      <span className="ml-6">{text}</span>
    </h5>
  );
}

export default SidebarSection;
export type { SidebarSectionProps };
