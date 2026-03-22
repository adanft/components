import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Modal } from '../index';

/**
 * jsdom sets offsetParent = null on all elements.
 * getFocusableElements filters out elements where offsetParent === null,
 * so we must mark each interactive element as "visible" for focus trap tests.
 */
function makeVisible(el: HTMLElement) {
  Object.defineProperty(el, 'offsetParent', { value: el.parentElement, configurable: true });
}

function renderModal({
  open = true,
  onClose = vi.fn(),
}: { open?: boolean; onClose?: () => void } = {}) {
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

  it('calls onClose when pressing Escape', () => {
    const onClose = vi.fn();
    renderModal({ onClose });

    fireEvent.keyDown(screen.getByTestId('panel'), { key: 'Escape' });

    expect(onClose).toHaveBeenCalled();
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

  it('Panel has aria-labelledby that matches Title id', () => {
    renderModal();

    const panel = screen.getByTestId('panel');
    const title = screen.getByText('Dialog heading');

    expect(panel).toHaveAttribute('aria-labelledby');
    expect(title).toHaveAttribute('id', panel.getAttribute('aria-labelledby'));
  });

  it('Title renders as h2', () => {
    renderModal();

    const title = screen.getByText('Dialog heading');

    expect(title.tagName).toBe('H2');
  });

  it('moves focus to Panel on open', () => {
    renderModal({ open: true });

    expect(screen.getByTestId('panel')).toHaveFocus();
  });

  it('restores focus to previously focused element on close', () => {
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

    expect(screen.getByTestId('panel')).toHaveFocus();

    rerender(
      <Modal open={false} onClose={onClose}>
        <Modal.Backdrop data-testid="backdrop" />
        <Modal.Panel data-testid="panel">
          <Modal.Title>Heading</Modal.Title>
        </Modal.Panel>
      </Modal>,
    );

    expect(trigger).toHaveFocus();

    document.body.removeChild(trigger);
  });

  describe('Focus Trap', () => {
    it('Tab on the last focusable element cycles focus to the first', () => {
      render(
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

      const btnA = screen.getByTestId('btn-a');
      const btnB = screen.getByTestId('btn-b');
      const btnC = screen.getByTestId('btn-c');
      const panel = screen.getByTestId('panel');

      makeVisible(btnA);
      makeVisible(btnB);
      makeVisible(btnC);

      btnC.focus();
      expect(btnC).toHaveFocus();

      fireEvent.keyDown(panel, { key: 'Tab', shiftKey: false });

      expect(btnA).toHaveFocus();
    });

    it('Shift+Tab on the first focusable element cycles focus to the last', () => {
      render(
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

      const btnA = screen.getByTestId('btn-a');
      const btnB = screen.getByTestId('btn-b');
      const btnC = screen.getByTestId('btn-c');
      const panel = screen.getByTestId('panel');

      makeVisible(btnA);
      makeVisible(btnB);
      makeVisible(btnC);

      btnA.focus();
      expect(btnA).toHaveFocus();

      fireEvent.keyDown(panel, { key: 'Tab', shiftKey: true });

      expect(btnC).toHaveFocus();
    });

    it('Tab with no focusable elements inside keeps focus on the panel without throwing', () => {
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

      // Focus remains on the panel (no focusable targets to move to)
      expect(panel).toHaveFocus();
    });
  });

  describe('Initial Focus', () => {
    it('focuses the [data-autofocus] element when the modal opens', () => {
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

      expect(screen.getByTestId('primary')).toHaveFocus();
    });

    it('falls back to focusing the panel when no [data-autofocus] is present', () => {
      render(
        <Modal open={true} onClose={vi.fn()}>
          <Modal.Backdrop />
          <Modal.Panel data-testid="panel">
            <Modal.Title>Fallback focus test</Modal.Title>
            <p>No interactive elements with autofocus.</p>
          </Modal.Panel>
        </Modal>,
      );

      expect(screen.getByTestId('panel')).toHaveFocus();
    });
  });
});
