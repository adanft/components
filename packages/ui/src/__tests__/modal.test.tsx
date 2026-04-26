import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Modal } from '../index';

function renderModal({
  open = true,
  onClose = vi.fn(),
}: {
  open?: boolean;
  onClose?: () => void;
} = {}) {
  return {
    onClose,
    ...render(
      <Modal open={open} onClose={onClose}>
        <Modal.Backdrop data-testid="backdrop" />
        <Modal.Panel data-testid="panel">
          <Modal.Title>Dialog heading</Modal.Title>
          <p>Body content</p>
        </Modal.Panel>
      </Modal>,
    ),
  };
}

describe('Modal', () => {
  it('renders nothing when open is false', () => {
    renderModal({ open: false });

    expect(screen.queryByTestId('panel')).not.toBeInTheDocument();
    expect(screen.queryByText('Body content')).not.toBeInTheDocument();
  });

  it('renders portal content when open is true', () => {
    renderModal({ open: true });

    expect(screen.getByTestId('panel')).toBeInTheDocument();
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  it('calls onClose when clicking Backdrop', () => {
    const onClose = vi.fn();
    renderModal({ onClose });

    fireEvent.click(screen.getByTestId('backdrop'));

    expect(onClose).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('keeps closing Backdrop when consumer onClick is provided', () => {
    const onClose = vi.fn();
    const onClick = vi.fn();

    render(
      <Modal open={true} onClose={onClose}>
        <Modal.Backdrop data-testid="backdrop" onClick={onClick} />
        <Modal.Panel>
          <Modal.Title>Dialog heading</Modal.Title>
        </Modal.Panel>
      </Modal>,
    );

    fireEvent.click(screen.getByTestId('backdrop'));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not close Backdrop when consumer onClick prevents default', () => {
    const onClose = vi.fn();

    render(
      <Modal open={true} onClose={onClose}>
        <Modal.Backdrop
          data-testid="backdrop"
          onClick={(event) => {
            event.preventDefault();
          }}
        />
        <Modal.Panel>
          <Modal.Title>Dialog heading</Modal.Title>
        </Modal.Panel>
      </Modal>,
    );

    fireEvent.click(screen.getByTestId('backdrop'));

    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when pressing Escape', () => {
    const onClose = vi.fn();
    renderModal({ onClose });

    fireEvent.keyDown(screen.getByTestId('panel'), { key: 'Escape' });

    expect(onClose).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not close when Panel onKeyDown prevents Escape default', () => {
    const onClose = vi.fn();

    render(
      <Modal open={true} onClose={onClose}>
        <Modal.Backdrop />
        <Modal.Panel
          data-testid="panel"
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              event.preventDefault();
            }
          }}>
          <Modal.Title>Dialog heading</Modal.Title>
        </Modal.Panel>
      </Modal>,
    );

    fireEvent.keyDown(screen.getByTestId('panel'), { key: 'Escape' });

    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when pressing Escape from a focused child', () => {
    const onClose = vi.fn();

    render(
      <Modal open={true} onClose={onClose}>
        <Modal.Backdrop />
        <Modal.Panel>
          <Modal.Title>Escape child</Modal.Title>
          <button type="button">Close from child</button>
        </Modal.Panel>
      </Modal>,
    );

    fireEvent.keyDown(screen.getByRole('button', { name: 'Close from child' }), { key: 'Escape' });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onClose when clicking inside Panel', () => {
    const onClose = vi.fn();
    renderModal({ onClose });

    fireEvent.click(screen.getByTestId('panel'));

    expect(onClose).not.toHaveBeenCalled();
  });

  it('sets role="dialog" and aria-modal="true" on Panel', () => {
    renderModal();

    const panel = screen.getByTestId('panel');

    expect(panel).toHaveAttribute('role', 'dialog');
    expect(panel).toHaveAttribute('aria-modal', 'true');
  });

  it('protects Panel structural dialog attributes from consumer props', () => {
    render(
      <Modal open={true} onClose={vi.fn()}>
        <Modal.Backdrop />
        <Modal.Panel role="region" aria-modal={false} tabIndex={0} data-testid="panel">
          <Modal.Title>Dialog heading</Modal.Title>
        </Modal.Panel>
      </Modal>,
    );

    const panel = screen.getByTestId('panel');

    expect(panel).toHaveAttribute('role', 'dialog');
    expect(panel).toHaveAttribute('aria-modal', 'true');
    expect(panel).toHaveAttribute('tabIndex', '-1');
  });

  it('Panel has aria-labelledby that matches Title id', () => {
    renderModal();

    const panel = screen.getByTestId('panel');
    const title = screen.getByText('Dialog heading');

    expect(panel).toHaveAttribute('aria-labelledby');
    expect(title).toHaveAttribute('id', panel.getAttribute('aria-labelledby'));
  });

  it('allows Panel to use aria-label without Modal.Title', () => {
    render(
      <Modal open={true} onClose={vi.fn()}>
        <Modal.Backdrop />
        <Modal.Panel aria-label="Settings" data-testid="panel">
          <p>Settings content</p>
        </Modal.Panel>
      </Modal>,
    );

    const panel = screen.getByRole('dialog', { name: 'Settings' });

    expect(panel).toHaveAttribute('aria-label', 'Settings');
    expect(panel).not.toHaveAttribute('aria-labelledby');
  });

  it('allows Panel to use consumer-provided aria-labelledby', () => {
    render(
      <Modal open={true} onClose={vi.fn()}>
        <Modal.Backdrop />
        <Modal.Panel aria-labelledby="custom-title" data-testid="panel">
          <h2 id="custom-title">Custom title</h2>
          <p>Dialog content</p>
        </Modal.Panel>
      </Modal>,
    );

    expect(screen.getByRole('dialog', { name: 'Custom title' })).toHaveAttribute(
      'aria-labelledby',
      'custom-title',
    );
  });

  it('Title renders as h2', () => {
    renderModal();

    const title = screen.getByText('Dialog heading');

    expect(title.tagName).toBe('H2');
  });

  it('moves focus to Panel on open', async () => {
    renderModal({ open: true });

    await waitFor(() => expect(screen.getByTestId('panel')).toHaveFocus());
  });

  it('restores focus to previously focused element on close', async () => {
    const trigger = document.createElement('button');
    trigger.textContent = 'Trigger';
    document.body.appendChild(trigger);
    trigger.focus();

    const onClose = vi.fn();

    const { rerender } = render(
      <Modal open={true} onClose={onClose}>
        <Modal.Backdrop data-testid="backdrop" />
        <Modal.Panel data-testid="panel">
          <Modal.Title>Heading</Modal.Title>
        </Modal.Panel>
      </Modal>,
    );

    await waitFor(() => expect(screen.getByTestId('panel')).toHaveFocus());

    rerender(
      <Modal open={false} onClose={onClose}>
        <Modal.Backdrop data-testid="backdrop" />
        <Modal.Panel data-testid="panel">
          <Modal.Title>Heading</Modal.Title>
        </Modal.Panel>
      </Modal>,
    );

    await waitFor(() => expect(trigger).toHaveFocus());

    document.body.removeChild(trigger);
  });

  describe('Focus Trap', () => {
    it('isolates outside content while the modal is open', async () => {
      const outside = document.createElement('button');
      outside.textContent = 'Outside';
      document.body.appendChild(outside);

      const { rerender } = render(
        <Modal open={true} onClose={vi.fn()}>
          <Modal.Backdrop />
          <Modal.Panel data-testid="panel">
            <Modal.Title>Trap test</Modal.Title>
            <button type="button" data-testid="btn-a">
              A
            </button>
            <button type="button" data-testid="btn-b">
              B
            </button>
            <button type="button" data-testid="btn-c">
              C
            </button>
          </Modal.Panel>
        </Modal>,
      );

      const panel = screen.getByTestId('panel');

      await waitFor(() => expect(panel).toHaveFocus());
      fireEvent.keyDown(panel, { key: 'Tab', shiftKey: false });

      expect(outside).toHaveAttribute('aria-hidden', 'true');
      expect(outside).not.toHaveFocus();

      rerender(
        <Modal open={false} onClose={vi.fn()}>
          <Modal.Backdrop />
          <Modal.Panel data-testid="panel">
            <Modal.Title>Trap test</Modal.Title>
          </Modal.Panel>
        </Modal>,
      );

      await waitFor(() => expect(outside).not.toHaveAttribute('aria-hidden'));

      document.body.removeChild(outside);
    });

    it('Tab with no focusable elements inside does not throw', () => {
      render(
        <Modal open={true} onClose={vi.fn()}>
          <Modal.Backdrop />
          <Modal.Panel data-testid="panel">
            <Modal.Title>No interactives</Modal.Title>
            <p>Just text, nothing focusable.</p>
          </Modal.Panel>
        </Modal>,
      );

      const panel = screen.getByTestId('panel');
      panel.focus();

      expect(() => {
        fireEvent.keyDown(panel, { key: 'Tab', shiftKey: false });
      }).not.toThrow();

      expect(screen.getByTestId('panel')).toBeInTheDocument();
    });
  });

  describe('Initial Focus', () => {
    it('focuses the [data-autofocus] element when the modal opens', async () => {
      render(
        <Modal open={true} onClose={vi.fn()}>
          <Modal.Backdrop />
          <Modal.Panel data-testid="panel">
            <Modal.Title>Autofocus test</Modal.Title>
            <button type="button">Secondary</button>
            <button type="button" data-autofocus data-testid="primary">
              Primary action
            </button>
          </Modal.Panel>
        </Modal>,
      );

      await waitFor(() => expect(screen.getByTestId('primary')).toHaveFocus());
    });

    it('falls back to focusing the panel when no [data-autofocus] is present', async () => {
      render(
        <Modal open={true} onClose={vi.fn()}>
          <Modal.Backdrop />
          <Modal.Panel data-testid="panel">
            <Modal.Title>Fallback focus test</Modal.Title>
            <p>No interactive elements with autofocus.</p>
          </Modal.Panel>
        </Modal>,
      );

      await waitFor(() => expect(screen.getByTestId('panel')).toHaveFocus());
    });
  });

  describe('Scroll lock', () => {
    it('keeps document scroll locked until every open modal closes', () => {
      const previousOverflow = document.documentElement.style.overflow;

      const { rerender } = render(
        <>
          <Modal open={true} onClose={vi.fn()}>
            <Modal.Backdrop />
            <Modal.Panel>
              <Modal.Title>First modal</Modal.Title>
            </Modal.Panel>
          </Modal>
          <Modal open={true} onClose={vi.fn()}>
            <Modal.Backdrop />
            <Modal.Panel>
              <Modal.Title>Second modal</Modal.Title>
            </Modal.Panel>
          </Modal>
        </>,
      );

      expect(document.documentElement.style.overflow).toBe('hidden');

      rerender(
        <>
          <Modal open={false} onClose={vi.fn()}>
            <Modal.Backdrop />
            <Modal.Panel>
              <Modal.Title>First modal</Modal.Title>
            </Modal.Panel>
          </Modal>
          <Modal open={true} onClose={vi.fn()}>
            <Modal.Backdrop />
            <Modal.Panel>
              <Modal.Title>Second modal</Modal.Title>
            </Modal.Panel>
          </Modal>
        </>,
      );

      expect(document.documentElement.style.overflow).toBe('hidden');

      rerender(
        <>
          <Modal open={false} onClose={vi.fn()}>
            <Modal.Backdrop />
            <Modal.Panel>
              <Modal.Title>First modal</Modal.Title>
            </Modal.Panel>
          </Modal>
          <Modal open={false} onClose={vi.fn()}>
            <Modal.Backdrop />
            <Modal.Panel>
              <Modal.Title>Second modal</Modal.Title>
            </Modal.Panel>
          </Modal>
        </>,
      );

      expect(document.documentElement.style.overflow).toBe(previousOverflow);
    });
  });
});
