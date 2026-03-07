import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Modal } from '../index';

describe('Modal', () => {
  it('opens dialog content from the trigger', () => {
    render(
      <Modal.Root>
        <Modal.Trigger>
          <button type="button">Open modal</button>
        </Modal.Trigger>
        <Modal.Body closeIcon="x" data-testid="modal-body">
          Modal content
        </Modal.Body>
      </Modal.Root>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Open modal' }));

    expect(screen.getByTestId('modal-body')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('closes when pressing escape', () => {
    render(
      <Modal.Root defaultOpen>
        <Modal.Trigger>
          <button type="button">Open modal</button>
        </Modal.Trigger>
        <Modal.Body closeIcon="x" data-testid="modal-body" />
      </Modal.Root>,
    );

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(screen.queryByTestId('modal-body')).not.toBeInTheDocument();
  });

  it('closes from the close action', () => {
    render(
      <Modal.Root defaultOpen>
        <Modal.Trigger>
          <button type="button">Open modal</button>
        </Modal.Trigger>
        <Modal.Body closeIcon="x" data-testid="modal-body">
          <Modal.Close>
            <button type="button">Cancel</button>
          </Modal.Close>
        </Modal.Body>
      </Modal.Root>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(screen.queryByTestId('modal-body')).not.toBeInTheDocument();
  });

  it('supports controlled open state changes', () => {
    const onOpenChange = vi.fn();

    const { rerender } = render(
      <Modal.Root open={false} onOpenChange={onOpenChange}>
        <Modal.Trigger>
          <button type="button">Open modal</button>
        </Modal.Trigger>
        <Modal.Body closeIcon="x" data-testid="modal-body" />
      </Modal.Root>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Open modal' }));

    expect(onOpenChange).toHaveBeenCalledWith(true);

    rerender(
      <Modal.Root open onOpenChange={onOpenChange}>
        <Modal.Trigger>
          <button type="button">Open modal</button>
        </Modal.Trigger>
        <Modal.Body closeIcon="x" data-testid="modal-body" className="custom-modal" />
      </Modal.Root>,
    );

    expect(screen.getByTestId('modal-body')).toHaveClass('ui-bg-surface-raised', 'custom-modal');
  });
});
