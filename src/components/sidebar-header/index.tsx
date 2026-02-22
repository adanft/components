import type { ComponentType, ReactNode } from 'react';

type HomeLinkComponentProps = {
  children: ReactNode;
  className: string;
  href: string;
};

type Props = {
  action: (prop: boolean) => void;
  state: boolean;
  homeHref?: string;
  logoSrc?: string;
  title?: string;
  HomeLinkComponent?: ComponentType<HomeLinkComponentProps>;
};

export type { HomeLinkComponentProps as SidebarHeaderHomeLinkComponentProps };

function SidebarHeader({
  action,
  state,
  homeHref = '/components',
  logoSrc = '/components/logo.png',
  title = 'Components',
  HomeLinkComponent,
}: Props) {
  const content = (
    <>
      <img src={logoSrc} alt="logo" width={48} height={48} />
      <span className="font-semibold text-2xl whitespace-nowrap text-primary-color">{title}</span>
    </>
  );

  return (
    <header className="relative flex items-center h-24 p-2">
      {HomeLinkComponent ? (
        <HomeLinkComponent className="flex items-center gap-2 overflow-hidden" href={homeHref}>
          {content}
        </HomeLinkComponent>
      ) : (
        <a href={homeHref} className="flex items-center gap-2 overflow-hidden">
          {content}
        </a>
      )}
      <button
        className={`text-primary-color leading-none transition-all duration-300 absolute top-2/4 -translate-y-1/2 cursor-pointer ${
          state ? 'left-68.5' : 'left-18.25'
        } border-2 border-primary-color p-2 rounded-md`}
        onClick={() => action(!state)}>
        <i
          className={`nf ${
            state ? 'nf-md-format_align_left' : 'nf-md-format_align_right'
          } text-lg leading-none`}></i>
      </button>
    </header>
  );
}

export default SidebarHeader;
