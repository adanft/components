import type { ComponentType, ReactNode } from 'react';

type HomeLinkComponentProps = {
  children: ReactNode;
  className: string;
  href: string;
};

type Props = {
  action: (prop: boolean) => void;
  state: boolean;
  brandHref?: string;
  brandLogoAlt?: string;
  brandLogoSrc?: string;
  brandTitle?: string;
  homeHref?: string;
  logoSrc?: string;
  title?: string;
  LinkComponent?: ComponentType<HomeLinkComponentProps>;
  HomeLinkComponent?: ComponentType<HomeLinkComponentProps>;
};

export type {
  HomeLinkComponentProps as SidebarHeaderHomeLinkComponentProps,
  HomeLinkComponentProps as SidebarHeaderLinkComponentProps,
};

function SidebarHeader({
  action,
  state,
  brandHref,
  brandLogoAlt,
  brandLogoSrc,
  brandTitle,
  homeHref,
  logoSrc,
  title,
  LinkComponent,
  HomeLinkComponent,
}: Props) {
  const resolvedHref = brandHref ?? homeHref ?? '/';
  const resolvedLogoSrc = brandLogoSrc ?? logoSrc;
  const resolvedTitle = brandTitle ?? title ?? 'Brand';
  const resolvedLogoAlt = brandLogoAlt ?? `${resolvedTitle} logo`;
  const ResolvedLinkComponent = LinkComponent ?? HomeLinkComponent;

  const content = (
    <>
      {resolvedLogoSrc ? (
        <img src={resolvedLogoSrc} alt={resolvedLogoAlt} width={48} height={48} />
      ) : null}
      <span className="font-semibold text-2xl whitespace-nowrap text-brand">
        {resolvedTitle}
      </span>
    </>
  );

  return (
    <header className="relative flex items-center h-24 p-2">
      {ResolvedLinkComponent ? (
        <ResolvedLinkComponent
          className="flex items-center gap-2 overflow-hidden"
          href={resolvedHref}>
          {content}
        </ResolvedLinkComponent>
      ) : (
        <a href={resolvedHref} className="flex items-center gap-2 overflow-hidden">
          {content}
        </a>
      )}
      <button
        className={`text-brand leading-none transition-all duration-300 absolute top-2/4 -translate-y-1/2 cursor-pointer border-2 border-brand p-2 rounded-md ${state ? 'left-[274px]' : 'left-[73px]'}`}
        onClick={() => action(!state)}>
        <i
          className={`nf text-lg leading-none ${state ? 'nf-md-format_align_left' : 'nf-md-format_align_right'}`}></i>
      </button>
    </header>
  );
}

export default SidebarHeader;
