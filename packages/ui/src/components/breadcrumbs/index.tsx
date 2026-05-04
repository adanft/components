import BreadcrumbsRoot from './breadcrumbs';
import BreadcrumbsItem from './item';
import BreadcrumbsLink from './link';
import BreadcrumbsList from './list';
import BreadcrumbsPage from './page';
import BreadcrumbsSeparator from './separator';

const Breadcrumbs = Object.assign(BreadcrumbsRoot, {
  Item: BreadcrumbsItem,
  Link: BreadcrumbsLink,
  List: BreadcrumbsList,
  Page: BreadcrumbsPage,
  Separator: BreadcrumbsSeparator,
});

export default Breadcrumbs;
export type { BreadcrumbsProps } from './breadcrumbs';
export type { BreadcrumbsItemProps } from './item';
export type { BreadcrumbsLinkProps } from './link';
export type { BreadcrumbsListProps } from './list';
export type { BreadcrumbsPageProps } from './page';
export type { BreadcrumbsSeparatorProps } from './separator';
