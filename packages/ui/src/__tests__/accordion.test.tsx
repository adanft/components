import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';

import { Accordion } from '../index';

function AccordionHarness() {
  const [value, setValue] = useState<string | null>('overview');

  return (
    <Accordion value={value} onValueChange={setValue}>
      <Accordion.Item value="overview">
        <Accordion.Header>
          <Accordion.Trigger>Overview</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>Overview content</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="analytics">
        <Accordion.Header>
          <Accordion.Trigger>Analytics</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>Analytics content</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="settings">
        <Accordion.Header>
          <Accordion.Trigger>Settings</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>Settings content</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}

describe('Accordion', () => {
  it('opens and closes items on click', () => {
    render(<AccordionHarness />);

    expect(screen.getByRole('region', { name: 'Overview' })).toHaveTextContent('Overview content');

    fireEvent.click(screen.getByRole('button', { name: 'Analytics' }));

    expect(screen.getByRole('region', { name: 'Analytics' })).toHaveTextContent(
      'Analytics content',
    );
    expect(screen.queryByText('Overview content')).not.toBeVisible();

    fireEvent.click(screen.getByRole('button', { name: 'Analytics' }));

    expect(screen.queryByRole('region', { name: 'Analytics' })).not.toBeInTheDocument();
  });

  it('moves focus between triggers with keyboard', () => {
    render(<AccordionHarness />);

    const overviewTrigger = screen.getByRole('button', { name: 'Overview' });
    overviewTrigger.focus();

    fireEvent.keyDown(overviewTrigger, { key: 'ArrowDown' });

    expect(screen.getByRole('button', { name: 'Analytics' })).toHaveFocus();
  });
});
