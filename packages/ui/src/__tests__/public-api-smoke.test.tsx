import { render, screen } from '@testing-library/react';
import { ShoppingCart } from 'lucide-react';
import { describe, expect, it, vi } from 'vitest';
import * as components from '@adanft/ui';

import { Accordion, Alert, Button, Modal, Select, SidebarLink, Table } from '@adanft/ui';

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

        <Select aria-label="Select plan" defaultValue="starter" placeholder="Choose plan">
          <option value="starter">Starter</option>
          <option value="pro">Pro</option>
        </Select>

        <SidebarLink href="/orders" icon={ShoppingCart} text="Orders" />

        <Table aria-label="Smoke table">
          <Table.Head
            headers={[{ id: 'name', label: 'Name' }]}
            getHeaderKey={(header) => header.id}
            renderHeader={(header) => header.label}
          />
          <Table.Body
            rows={[{ id: 1, name: 'Taylor' }]}
            getRowKey={(row) => row.id}
            getRowCells={(row) => [row.name]}
            renderCell={(cell) => cell}
          />
        </Table>
      </div>,
    );

    expect(screen.getByRole('button', { name: /overview/i })).toBeInTheDocument();
    expect(screen.getByText('Heads up')).toBeInTheDocument();
    expect(screen.getByText(/review the latest changes/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save changes/i })).toBeDisabled();
    expect(screen.getByRole('combobox', { name: /select plan/i })).toHaveValue('starter');

    const ordersLink = screen.getByRole('link', { name: /orders/i });
    expect(ordersLink).toHaveAttribute('href', '/orders');

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
});
