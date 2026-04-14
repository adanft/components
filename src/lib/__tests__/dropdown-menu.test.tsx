import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { DropdownMenu } from '../index';

function DropdownMenuHarness() {
  const [open, setOpen] = useState(false);
  const onSelect = vi.fn();

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger>
        <button type="button">Actions</button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        data-testid="menu-content"
        className="min-w-40 rounded-md border border-border bg-background p-1 shadow-card">
        <DropdownMenu.Label>Account</DropdownMenu.Label>
        <DropdownMenu.Item onSelect={onSelect}>Profile</DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => undefined}>Settings</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item disabled>Delete</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}

describe('DropdownMenu', () => {
  it('opens on trigger click and renders menu content', () => {
    render(<DropdownMenuHarness />);

    fireEvent.mouseDown(screen.getByRole('button', { name: 'Actions' }));

    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('closes after selecting an item', () => {
    render(<DropdownMenuHarness />);

    const trigger = screen.getByRole('button', { name: 'Actions' });

    fireEvent.mouseDown(screen.getByRole('button', { name: 'Actions' }));
    fireEvent.click(screen.getByRole('menuitem', { name: 'Profile' }));

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();

    return waitFor(() => {
      expect(trigger).toHaveFocus();
    });
  });

  it('does not activate disabled items', () => {
    render(<DropdownMenuHarness />);

    fireEvent.mouseDown(screen.getByRole('button', { name: 'Actions' }));

    const disabledItem = screen.getByRole('menuitem', { name: 'Delete' });
    expect(disabledItem).toHaveAttribute('aria-disabled', 'true');
  });

  it('closes on outside click', () => {
    render(
      <div>
        <button type="button">Outside</button>
        <DropdownMenuHarness />
      </div>,
    );

    fireEvent.mouseDown(screen.getByRole('button', { name: 'Actions' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();

    fireEvent.pointerDown(screen.getByRole('button', { name: 'Outside' }));

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('opens with ArrowDown and focuses the first item', async () => {
    render(<DropdownMenuHarness />);

    const trigger = screen.getByRole('button', { name: 'Actions' });
    trigger.focus();

    fireEvent.keyDown(trigger, { key: 'ArrowDown' });

    expect(screen.getByRole('menu')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: 'Profile' })).toHaveFocus();
    });
  });

  it('closes with Escape and returns focus to the trigger', async () => {
    render(<DropdownMenuHarness />);

    const trigger = screen.getByRole('button', { name: 'Actions' });
    fireEvent.mouseDown(trigger);

    fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' });

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();

    await waitFor(() => {
      expect(trigger).toHaveFocus();
    });
  });

  it('supports typeahead navigation', () => {
    render(<DropdownMenuHarness />);

    fireEvent.mouseDown(screen.getByRole('button', { name: 'Actions' }));
    fireEvent.keyDown(screen.getByRole('menu'), { key: 's' });

    expect(screen.getByRole('menuitem', { name: 'Settings' })).toHaveFocus();
  });

  it('skips label, separator, and disabled items when navigating with keyboard', () => {
    render(<DropdownMenuHarness />);

    fireEvent.mouseDown(screen.getByRole('button', { name: 'Actions' }));

    const profileItem = screen.getByRole('menuitem', { name: 'Profile' });
    profileItem.focus();

    fireEvent.keyDown(profileItem, { key: 'ArrowDown' });
    expect(screen.getByRole('menuitem', { name: 'Settings' })).toHaveFocus();

    fireEvent.keyDown(screen.getByRole('menuitem', { name: 'Settings' }), { key: 'ArrowDown' });
    expect(screen.getByRole('menuitem', { name: 'Profile' })).toHaveFocus();
  });

  it('does not focus disabled item via typeahead', () => {
    render(<DropdownMenuHarness />);

    fireEvent.mouseDown(screen.getByRole('button', { name: 'Actions' }));

    const profileItem = screen.getByRole('menuitem', { name: 'Profile' });
    profileItem.focus();

    fireEvent.keyDown(profileItem, { key: 'd' });

    expect(screen.getByRole('menuitem', { name: 'Delete' })).not.toHaveFocus();
    expect(screen.getByRole('menuitem', { name: 'Profile' })).toHaveFocus();
  });
});
