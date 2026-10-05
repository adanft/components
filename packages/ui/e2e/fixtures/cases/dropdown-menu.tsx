import DropdownMenu from '@adanft/ui/dropdown-menu';
import { useState } from 'react';

export default function DropdownMenuCase() {
  const [open, setOpen] = useState(false);
  const [focusCount, setFocusCount] = useState(0);
  const [focusTarget, setFocusTarget] = useState('none');

  return (
    <main className="p-8">
      <h1 className="mb-4 text-xl">Dropdown consumer focus regression</h1>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenu.Trigger>
          <button type="button">Actions</button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>Profile</DropdownMenu.Item>
          <DropdownMenu.Item
            onFocus={(event) => {
              setFocusTarget(event.currentTarget.textContent ?? '');
              setFocusCount((count) => count + 1);
            }}>
            Settings
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
      <p>
        Consumer focus count: <output data-testid="focus-count">{focusCount}</output>
      </p>
      <p>
        Consumer focus target: <output data-testid="focus-target">{focusTarget}</output>
      </p>
    </main>
  );
}
