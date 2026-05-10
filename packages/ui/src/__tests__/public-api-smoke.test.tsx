import * as components from '@adanft/ui';
import {
  Accordion,
  Alert,
  Breadcrumbs,
  Button,
  type ButtonOutlineVariant,
  Modal,
  Select,
  type SidebarBodyProps,
  SidebarGroupLink,
  type SidebarGroupLinkProps,
  type SidebarGroupProps,
  type SidebarHeadProps,
  SidebarLink,
  type SidebarLinkProps,
  type SidebarProps,
  type SidebarSectionProps,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  type TabsListOrientation,
  Textarea,
} from '@adanft/ui';
import AccordionSubpath from '@adanft/ui/accordion';
import ButtonSubpath, {
  type ButtonOutlineVariant as ButtonOutlineVariantSubpath,
} from '@adanft/ui/button';
import PopoverSubpath from '@adanft/ui/popover';
import SidebarSubpath, {
  SidebarBody as SidebarBodySubpath,
  type SidebarBodyProps as SidebarBodySubpathProps,
  SidebarGroupLink as SidebarGroupLinkSubpath,
  type SidebarGroupLinkProps as SidebarGroupLinkSubpathProps,
  SidebarGroup as SidebarGroupSubpath,
  type SidebarGroupProps as SidebarGroupSubpathProps,
  SidebarHead as SidebarHeadSubpath,
  type SidebarHeadProps as SidebarHeadSubpathProps,
  SidebarLink as SidebarLinkSubpath,
  type SidebarLinkProps as SidebarLinkSubpathProps,
  Sidebar as SidebarNamedSubpath,
  SidebarSection as SidebarSectionSubpath,
  type SidebarSectionProps as SidebarSectionSubpathProps,
  type SidebarProps as SidebarSubpathProps,
} from '@adanft/ui/sidebar';
import TabsSubpath, {
  type TabsListOrientation as TabsListOrientationSubpath,
} from '@adanft/ui/tabs';
import TooltipSubpath from '@adanft/ui/tooltip';
import { render, screen } from '@testing-library/react';
import type { ComponentPropsWithoutRef, SVGProps } from 'react';
import { describe, expect, expectTypeOf, it, vi } from 'vitest';

type RouterLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & {
  to: string;
};

function RouterLink({ to, ...props }: RouterLinkProps) {
  return <a href={to} {...props} />;
}

function ShoppingCartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M4 4h2l2 12h10l2-8H7" />
    </svg>
  );
}

describe('@adanft/ui public API', () => {
  it('re-exports representative component behavior without deep imports or router context', () => {
    const { unmount } = render(
      <div>
        <Accordion value="overview" onValueChange={() => undefined}>
          <Accordion.Item value="overview">
            <Accordion.Header>
              <Accordion.Trigger>Overview</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>Overview content</Accordion.Content>
          </Accordion.Item>
        </Accordion>

        <Alert>
          <Alert.Title>Heads up</Alert.Title>
          <Alert.Description>Review the latest changes before continuing.</Alert.Description>
        </Alert>

        <Button disabled={true}>Save changes</Button>
        <Button asChild>
          <RouterLink to="/checkout">Checkout</RouterLink>
        </Button>

        <Breadcrumbs>
          <Breadcrumbs.List>
            <Breadcrumbs.Item>
              <Breadcrumbs.Link href="/docs">Docs</Breadcrumbs.Link>
            </Breadcrumbs.Item>
            <Breadcrumbs.Separator />
            <Breadcrumbs.Item>
              <Breadcrumbs.Page>Current page</Breadcrumbs.Page>
            </Breadcrumbs.Item>
          </Breadcrumbs.List>
        </Breadcrumbs>

        <Select aria-label="Select plan" defaultValue="starter" placeholder="Choose plan">
          <option value="starter">Starter</option>
          <option value="pro">Pro</option>
        </Select>

        <Textarea aria-label="Smoke textarea" placeholder="Write details" />
        <Spinner aria-label="Smoke loading" />

        <SidebarLink href="/orders" icon={ShoppingCartIcon} text="Orders" />
        <SidebarGroupLink href="/orders/history" text="Order history" />

        <Table aria-label="Smoke table">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Taylor</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>,
    );

    expect(screen.getByRole('button', { name: /overview/i })).toBeInTheDocument();
    expect(screen.getByText('Heads up')).toBeInTheDocument();
    expect(screen.getByText(/review the latest changes/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save changes/i })).toBeDisabled();
    expect(screen.getByRole('link', { name: /checkout/i })).toHaveAttribute('href', '/checkout');
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    expect(screen.getByText('Current page')).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('combobox', { name: /select plan/i })).toHaveValue('starter');
    expect(screen.getByRole('textbox', { name: /smoke textarea/i })).toHaveAttribute(
      'placeholder',
      'Write details',
    );
    expect(screen.getByRole('status', { name: /smoke loading/i })).toBeInTheDocument();

    const ordersLink = screen.getByRole('link', { name: /orders/i });
    expect(ordersLink).toHaveAttribute('href', '/orders');
    expect(screen.getByRole('link', { name: /order history/i })).toHaveAttribute(
      'href',
      '/orders/history',
    );

    expect(screen.getByRole('columnheader', { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /taylor/i })).toBeInTheDocument();

    unmount();
  });

  it('renders Modal compound component via portal', () => {
    const onClose = vi.fn();

    const { unmount } = render(
      <Modal open={true} onClose={onClose}>
        <Modal.Backdrop />
        <Modal.Panel data-testid="smoke-modal-panel">
          <Modal.Title>Smoke test</Modal.Title>
          <p>Modal content</p>
        </Modal.Panel>
      </Modal>,
    );

    expect(screen.getByTestId('smoke-modal-panel')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();

    unmount();
  });

  it('does not expose docs-only exports', () => {
    expect('Home' in components).toBe(false);
    expect('Navbar' in components).toBe(false);
    expect('NotFound' in components).toBe(false);
    expect('RouterSidebarLink' in components).toBe(false);
  });

  it('keeps primitive public subpaths compatible', () => {
    expect(AccordionSubpath).toBe(Accordion);
    expect(ButtonSubpath).toBe(Button);
    expect(PopoverSubpath).toBe(components.Popover);
    expect(TabsSubpath).toBe(components.Tabs);
    expect(TooltipSubpath).toBe(components.Tooltip);
  });

  it('keeps root-only type exports aligned with their subpaths', () => {
    expectTypeOf<ButtonOutlineVariant>().toEqualTypeOf<ButtonOutlineVariantSubpath>();
    expectTypeOf<TabsListOrientation>().toEqualTypeOf<TabsListOrientationSubpath>();
  });

  it('keeps the Sidebar public subpath aligned with the compound root API', () => {
    expectTypeOf<SidebarSubpathProps>().toEqualTypeOf<SidebarProps>();
    expectTypeOf<SidebarHeadSubpathProps>().toEqualTypeOf<SidebarHeadProps>();
    expectTypeOf<SidebarBodySubpathProps>().toEqualTypeOf<SidebarBodyProps>();
    expectTypeOf<SidebarLinkSubpathProps>().toEqualTypeOf<SidebarLinkProps>();
    expectTypeOf<SidebarGroupSubpathProps>().toEqualTypeOf<SidebarGroupProps>();
    expectTypeOf<SidebarGroupLinkSubpathProps>().toEqualTypeOf<SidebarGroupLinkProps>();
    expectTypeOf<SidebarSectionSubpathProps>().toEqualTypeOf<SidebarSectionProps>();

    expect(SidebarSubpath).toBe(components.Sidebar);
    expect(SidebarNamedSubpath).toBe(components.Sidebar);
    expect(SidebarHeadSubpath).toBe(components.SidebarHead);
    expect(SidebarBodySubpath).toBe(components.SidebarBody);
    expect(SidebarLinkSubpath).toBe(components.SidebarLink);
    expect(SidebarGroupSubpath).toBe(components.SidebarGroup);
    expect(SidebarGroupLinkSubpath).toBe(components.SidebarGroupLink);
    expect(SidebarSectionSubpath).toBe(components.SidebarSection);
  });

  it('keeps supported theme public exports available from the package root', () => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
    // biome-ignore lint/suspicious/noDocumentCookie: tests need to reset the SSR-readable theme cookie.
    document.cookie = 'theme=; path=/; max-age=0; SameSite=Lax';

    expect(components.initializeTheme()).toBe(false);
    expect('toggleTheme' in components).toBe(false);
    expect(components.ThemeSwitch).toBeTypeOf('function');
  });

  it('exposes final Breadcrumbs compound parts', () => {
    expect('List' in Breadcrumbs).toBe(true);
    expect('Item' in Breadcrumbs).toBe(true);
    expect('Link' in Breadcrumbs).toBe(true);
    expect('Page' in Breadcrumbs).toBe(true);
    expect('Separator' in Breadcrumbs).toBe(true);
    expect('Ellipsis' in Breadcrumbs).toBe(false);
  });
});
