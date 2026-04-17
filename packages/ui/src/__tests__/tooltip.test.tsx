import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';

import { Tooltip } from '../index';

function TooltipHarness() {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <Tooltip.Trigger>
        <button type="button">Save changes</button>
      </Tooltip.Trigger>
      <Tooltip.Content data-testid="tooltip-content">Save your work</Tooltip.Content>
    </Tooltip>
  );
}

describe('Tooltip', () => {
  it('opens on hover and closes on mouse leave', async () => {
    render(<TooltipHarness />);

    const trigger = screen.getByRole('button', { name: 'Save changes' });

    fireEvent.mouseEnter(trigger);

    expect(await screen.findByRole('tooltip')).toBeInTheDocument();
    expect(screen.getByTestId('tooltip-content')).toHaveTextContent('Save your work');

    fireEvent.mouseLeave(trigger);

    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  it('opens on focus and closes with escape', async () => {
    render(<TooltipHarness />);

    const trigger = screen.getByRole('button', { name: 'Save changes' });

    fireEvent.focus(trigger);

    expect(await screen.findByRole('tooltip')).toBeInTheDocument();

    fireEvent.keyDown(trigger, { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });
});
