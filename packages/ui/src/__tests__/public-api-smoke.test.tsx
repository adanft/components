import * as components from '@adanft/ui';
import {
  Accordion,
  Alert,
  Breadcrumbs,
  Button,
  Modal,
  Select,
  SidebarGroupLink,
  SidebarLink,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@adanft/ui';
import { render, screen } from '@testing-library/react';
import type { SVGProps } from 'react';
import { describe, expect, it, vi } from 'vitest';

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
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    expect(screen.getByText('Current page')).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('combobox', { name: /select plan/i })).toHaveValue('starter');

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

  it('exposes final Breadcrumbs compound parts', () => {
    expect('List' in Breadcrumbs).toBe(true);
    expect('Item' in Breadcrumbs).toBe(true);
    expect('Link' in Breadcrumbs).toBe(true);
    expect('Page' in Breadcrumbs).toBe(true);
    expect('Separator' in Breadcrumbs).toBe(true);
    expect('Ellipsis' in Breadcrumbs).toBe(false);
  });
});
