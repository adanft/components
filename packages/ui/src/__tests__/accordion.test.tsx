import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';

import { Accordion } from '../index';

type AccordionHarnessProps = {
  collapsible?: boolean;
};

function AccordionHarness({ collapsible }: AccordionHarnessProps) {
  const [value, setValue] = useState<string | null>('overview');

  return (
    <Accordion collapsible={collapsible} value={value} onValueChange={setValue}>
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

  it('limits keyboard navigation to the current accordion when nested accordions exist', () => {
    render(
      <Accordion value="parent-1" onValueChange={() => undefined}>
        <Accordion.Item value="parent-1">
          <Accordion.Header>
            <Accordion.Trigger>Parent one</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            <Accordion value="child-1" onValueChange={() => undefined}>
              <Accordion.Item value="child-1">
                <Accordion.Header>
                  <Accordion.Trigger>Child one</Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content>Child content</Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="child-2">
                <Accordion.Header>
                  <Accordion.Trigger>Child two</Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content>Child content 2</Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="parent-2">
          <Accordion.Header>
            <Accordion.Trigger>Parent two</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>Parent content 2</Accordion.Content>
        </Accordion.Item>
      </Accordion>,
    );

    const parentOneTrigger = screen.getByRole('button', { name: 'Parent one' });
    const parentTwoTrigger = screen.getByRole('button', { name: 'Parent two' });
    const childOneTrigger = screen.getByRole('button', { name: 'Child one' });
    const childTwoTrigger = screen.getByRole('button', { name: 'Child two' });

    parentOneTrigger.focus();
    fireEvent.keyDown(parentOneTrigger, { key: 'ArrowDown' });
    expect(parentTwoTrigger).toHaveFocus();

    fireEvent.keyDown(parentTwoTrigger, { key: 'Home' });
    expect(parentOneTrigger).toHaveFocus();

    childOneTrigger.focus();
    fireEvent.keyDown(childOneTrigger, { key: 'End' });
    expect(childTwoTrigger).toHaveFocus();

    fireEvent.keyDown(childTwoTrigger, { key: 'ArrowUp' });
    expect(childOneTrigger).toHaveFocus();
  });

  it('keeps the open item expanded when collapsible is false', () => {
    render(<AccordionHarness collapsible={false} />);

    fireEvent.click(screen.getByRole('button', { name: 'Overview' }));

    expect(screen.getByRole('region', { name: 'Overview' })).toHaveTextContent('Overview content');
  });

  it('uses unique ids for trigger and content even when values sanitize the same', () => {
    render(
      <Accordion value="item a" onValueChange={() => undefined}>
        <Accordion.Item value="Item A">
          <Accordion.Header>
            <Accordion.Trigger>First item</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>First content</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-a">
          <Accordion.Header>
            <Accordion.Trigger>Second item</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>Second content</Accordion.Content>
        </Accordion.Item>
      </Accordion>,
    );

    const firstTrigger = screen.getByRole('button', { name: 'First item' });
    const secondTrigger = screen.getByRole('button', { name: 'Second item' });
    const firstContent = document.getElementById(firstTrigger.getAttribute('aria-controls') ?? '');
    const secondContent = document.getElementById(
      secondTrigger.getAttribute('aria-controls') ?? '',
    );

    expect(firstContent).not.toBeNull();
    expect(secondContent).not.toBeNull();
    expect(firstTrigger.id).not.toBe(secondTrigger.id);
    expect(firstContent?.id).not.toBe(secondContent?.id);
    expect(firstTrigger).toHaveAttribute('aria-controls', firstContent?.id);
    expect(secondTrigger).toHaveAttribute('aria-controls', secondContent?.id);
    expect(firstContent).toHaveAttribute('aria-labelledby', firstTrigger.id);
    expect(secondContent).toHaveAttribute('aria-labelledby', secondTrigger.id);
  });

  it('preserves internal wiring attrs when consumer passes conflicting props', () => {
    render(
      <Accordion
        value="overview"
        onValueChange={() => undefined}
        data-accordion-root="false"
        data-testid="accordion-root">
        <Accordion.Item value="overview" data-state="closed" data-testid="accordion-item">
          <Accordion.Header>
            <Accordion.Trigger
              id="consumer-trigger-id"
              type="submit"
              aria-controls="consumer-content-id"
              aria-expanded={false}
              data-accordion-trigger="false"
              data-state="closed">
              Overview
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content
            id="consumer-content-id"
            aria-labelledby="consumer-trigger-id"
            hidden
            data-state="closed">
            Overview content
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>,
    );

    const root = screen.getByTestId('accordion-root');
    const item = screen.getByTestId('accordion-item');
    const trigger = screen.getByRole('button', { name: 'Overview' });
    const content = screen.getByRole('region', { name: 'Overview' });

    expect(root).toHaveAttribute('data-accordion-root', 'true');
    expect(item).toHaveAttribute('data-state', 'open');
    expect(trigger).toHaveAttribute('type', 'button');
    expect(trigger).toHaveAttribute('data-accordion-trigger', 'true');
    expect(trigger).toHaveAttribute('data-state', 'open');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(content).toHaveAttribute('data-state', 'open');
    expect(content).not.toHaveAttribute('hidden');
    expect(trigger.id).not.toBe('consumer-trigger-id');
    expect(content.id).not.toBe('consumer-content-id');
    expect(trigger).toHaveAttribute('aria-controls', content.id);
    expect(content).toHaveAttribute('aria-labelledby', trigger.id);
  });
});
