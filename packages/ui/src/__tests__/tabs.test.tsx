import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Tabs } from '../index';

function TabsHarness() {
  const [value, setValue] = useState('overview');

  return (
    <Tabs value={value} onValueChange={setValue}>
      <Tabs.List>
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
        <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="overview">Overview content</Tabs.Content>
      <Tabs.Content value="analytics">Analytics content</Tabs.Content>
      <Tabs.Content value="settings">Settings content</Tabs.Content>
    </Tabs>
  );
}

function TabsWithDisabledTabHarness() {
  const [value, setValue] = useState('overview');

  return (
    <Tabs value={value} onValueChange={setValue}>
      <Tabs.List>
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="analytics" disabled>
          Analytics
        </Tabs.Trigger>
        <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="overview">Overview content</Tabs.Content>
      <Tabs.Content value="analytics">Analytics content</Tabs.Content>
      <Tabs.Content value="settings">Settings content</Tabs.Content>
    </Tabs>
  );
}

function VerticalTabsHarness() {
  const [value, setValue] = useState('overview');

  return (
    <Tabs value={value} onValueChange={setValue}>
      <Tabs.List orientation="vertical">
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="overview">Overview content</Tabs.Content>
      <Tabs.Content value="analytics">Analytics content</Tabs.Content>
    </Tabs>
  );
}

function UnmatchedValueTabsHarness({ firstDisabled }: { firstDisabled?: boolean }) {
  return (
    <Tabs value="missing" onValueChange={() => undefined}>
      <Tabs.List>
        <Tabs.Trigger value="overview" disabled={firstDisabled}>
          Overview
        </Tabs.Trigger>
        <Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
        <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="overview">Overview content</Tabs.Content>
      <Tabs.Content value="analytics">Analytics content</Tabs.Content>
      <Tabs.Content value="settings">Settings content</Tabs.Content>
    </Tabs>
  );
}

describe('Tabs', () => {
  it('switches panels on click', () => {
    render(<TabsHarness />);

    expect(screen.getByRole('tabpanel', { name: 'Overview' })).toHaveTextContent(
      'Overview content',
    );

    fireEvent.click(screen.getByRole('tab', { name: 'Analytics' }));

    expect(screen.getByRole('tabpanel', { name: 'Analytics' })).toHaveTextContent(
      'Analytics content',
    );
    expect(screen.queryByText('Overview content')).not.toBeInTheDocument();
  });

  it('keeps inactive panels mounted when keepMounted is true', () => {
    render(
      <Tabs value="overview" onValueChange={() => undefined}>
        <Tabs.List>
          <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
          <Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="overview">Overview content</Tabs.Content>
        <Tabs.Content value="analytics" keepMounted>
          Analytics content
        </Tabs.Content>
      </Tabs>,
    );

    expect(screen.getByText('Analytics content')).not.toBeVisible();
  });

  it('moves between tabs with arrow keys', () => {
    render(<TabsHarness />);

    const overviewTab = screen.getByRole('tab', { name: 'Overview' });
    overviewTab.focus();

    fireEvent.keyDown(screen.getByRole('tablist'), { key: 'ArrowRight' });

    expect(screen.getByRole('tab', { name: 'Analytics' })).toHaveFocus();
    expect(screen.getByRole('tabpanel', { name: 'Analytics' })).toHaveTextContent(
      'Analytics content',
    );
  });

  it('skips disabled tabs when moving with arrow keys', () => {
    render(<TabsWithDisabledTabHarness />);

    const overviewTab = screen.getByRole('tab', { name: 'Overview' });
    overviewTab.focus();

    fireEvent.keyDown(screen.getByRole('tablist'), { key: 'ArrowRight' });

    expect(screen.getByRole('tab', { name: 'Settings' })).toHaveFocus();
    expect(screen.getByRole('tabpanel', { name: 'Settings' })).toHaveTextContent(
      'Settings content',
    );
  });

  it('supports vertical keyboard navigation', () => {
    render(<VerticalTabsHarness />);

    const overviewTab = screen.getByRole('tab', { name: 'Overview' });
    overviewTab.focus();

    fireEvent.keyDown(screen.getByRole('tablist'), { key: 'ArrowDown' });

    expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'vertical');
    expect(screen.getByRole('tab', { name: 'Analytics' })).toHaveFocus();
    expect(screen.getByRole('tabpanel', { name: 'Analytics' })).toHaveTextContent(
      'Analytics content',
    );
  });

  it('keeps roving focus on the selected trigger when the value matches a tab', () => {
    render(<TabsHarness />);

    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('tab', { name: 'Analytics' })).toHaveAttribute('tabindex', '-1');
    expect(screen.getByRole('tab', { name: 'Settings' })).toHaveAttribute('tabindex', '-1');
  });

  it.each([
    { disabled: true },
    { 'aria-disabled': true as const },
    { 'aria-disabled': 'true' as const },
  ])('keeps disabled selection reachable via enabled siblings (%j)', async (disabledProps) => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    function Example({ selectedDisabled }: { selectedDisabled: boolean }) {
      return (
        <>
          <button type="button">Before tabs</button>
          <Tabs value="analytics" onValueChange={onValueChange}>
            <Tabs.List>
              <Tabs.Trigger value="unavailable" disabled>
                Unavailable
              </Tabs.Trigger>
              <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
              <Tabs.Trigger value="analytics" {...(selectedDisabled ? disabledProps : {})}>
                Analytics
              </Tabs.Trigger>
              <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="analytics">Analytics content</Tabs.Content>
          </Tabs>
          <button type="button">After tabs</button>
        </>
      );
    }
    const { rerender } = render(<Example selectedDisabled />);
    const overview = screen.getByRole('tab', { name: 'Overview' });
    const selected = screen.getByRole('tab', { name: 'Analytics' });
    const settings = screen.getByRole('tab', { name: 'Settings' });

    expect(selected).toHaveAttribute('tabindex', '-1');
    expect(overview).toHaveAttribute('tabindex', '0');
    expect(settings).toHaveAttribute('tabindex', '-1');
    expect(screen.getByRole('tab', { name: 'Unavailable' })).toHaveAttribute('tabindex', '-1');
    expect(onValueChange).not.toHaveBeenCalled();

    screen.getByRole('button', { name: 'Before tabs' }).focus();
    await user.tab();
    expect(overview).toHaveFocus();
    expect(selected).toHaveAttribute('aria-selected', 'true');
    expect(overview).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByRole('tabpanel', { name: 'Analytics' })).toHaveTextContent(
      'Analytics content',
    );
    expect(onValueChange).not.toHaveBeenCalled();
    await user.tab();
    expect(screen.getByRole('button', { name: 'After tabs' })).toHaveFocus();

    rerender(<Example selectedDisabled={false} />);
    expect(selected).toHaveAttribute('tabindex', '0');
    expect(overview).toHaveAttribute('tabindex', '-1');
    expect(settings).toHaveAttribute('tabindex', '-1');
    screen.getByRole('button', { name: 'Before tabs' }).focus();
    await user.tab();
    expect(selected).toHaveFocus();

    rerender(<Example selectedDisabled />);
    expect(selected).toHaveAttribute('tabindex', '-1');
    expect(overview).toHaveAttribute('tabindex', '0');
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it.each(['analytics', 'missing'])(
    'has no tab stop when all triggers are disabled (%s)',
    async (value) => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      render(
        <>
          <button type="button">Before tabs</button>
          <Tabs value={value} onValueChange={onValueChange}>
            <Tabs.List>
              <Tabs.Trigger value="overview" disabled>
                Overview
              </Tabs.Trigger>
              <Tabs.Trigger value="analytics" aria-disabled="true">
                Analytics
              </Tabs.Trigger>
            </Tabs.List>
          </Tabs>
          <button type="button">After tabs</button>
        </>,
      );

      for (const tab of screen.getAllByRole('tab')) {
        expect(tab).toHaveAttribute('tabindex', '-1');
      }
      screen.getByRole('button', { name: 'Before tabs' }).focus();
      await user.tab();
      expect(screen.getByRole('button', { name: 'After tabs' })).toHaveFocus();
      expect(onValueChange).not.toHaveBeenCalled();
    },
  );

  it('falls back to the first enabled trigger when the value matches no tab', () => {
    render(<UnmatchedValueTabsHarness />);

    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('tab', { name: 'Analytics' })).toHaveAttribute('tabindex', '-1');
    expect(screen.getByRole('tab', { name: 'Settings' })).toHaveAttribute('tabindex', '-1');
  });

  it('skips disabled triggers when falling back to a focusable trigger', () => {
    render(<UnmatchedValueTabsHarness firstDisabled />);

    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('tabindex', '-1');
    expect(screen.getByRole('tab', { name: 'Analytics' })).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('tab', { name: 'Settings' })).toHaveAttribute('tabindex', '-1');
  });

  it('moves the fallback to a trigger prepended after the initial render', () => {
    const { rerender } = render(
      <Tabs value="missing" onValueChange={() => undefined}>
        <Tabs.List>
          <Tabs.Trigger key="a" value="a">
            A
          </Tabs.Trigger>
          <Tabs.Trigger key="b" value="b">
            B
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs>,
    );

    rerender(
      <Tabs value="missing" onValueChange={() => undefined}>
        <Tabs.List>
          <Tabs.Trigger key="new" value="new">
            New
          </Tabs.Trigger>
          <Tabs.Trigger key="a" value="a">
            A
          </Tabs.Trigger>
          <Tabs.Trigger key="b" value="b">
            B
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs>,
    );

    expect(screen.getByRole('tab', { name: 'New' })).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('tab', { name: 'A' })).toHaveAttribute('tabindex', '-1');
    expect(screen.getByRole('tab', { name: 'B' })).toHaveAttribute('tabindex', '-1');
  });

  it('moves the fallback to the trigger that becomes first in the DOM after a reorder', () => {
    const { rerender } = render(
      <Tabs value="missing" onValueChange={() => undefined}>
        <Tabs.List>
          <Tabs.Trigger value="a">A</Tabs.Trigger>
          <Tabs.Trigger value="b">B</Tabs.Trigger>
        </Tabs.List>
      </Tabs>,
    );

    expect(screen.getByRole('tab', { name: 'A' })).toHaveAttribute('tabindex', '0');

    rerender(
      <Tabs value="missing" onValueChange={() => undefined}>
        <Tabs.List>
          <Tabs.Trigger value="b">B</Tabs.Trigger>
          <Tabs.Trigger value="a">A</Tabs.Trigger>
        </Tabs.List>
      </Tabs>,
    );

    expect(screen.getByRole('tab', { name: 'B' })).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('tab', { name: 'A' })).toHaveAttribute('tabindex', '-1');
  });

  it('restores the fallback to the first trigger after a disable and enable cycle', () => {
    const { rerender } = render(<UnmatchedValueTabsHarness />);

    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('tabindex', '0');

    rerender(<UnmatchedValueTabsHarness firstDisabled />);

    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('tabindex', '-1');
    expect(screen.getByRole('tab', { name: 'Analytics' })).toHaveAttribute('tabindex', '0');

    rerender(<UnmatchedValueTabsHarness />);

    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('tab', { name: 'Analytics' })).toHaveAttribute('tabindex', '-1');
    expect(screen.getByRole('tab', { name: 'Settings' })).toHaveAttribute('tabindex', '-1');
  });

  it('preserves internal tab semantics when native props are passed', () => {
    render(
      <Tabs value="overview" onValueChange={() => undefined}>
        <Tabs.List role="group">
          <Tabs.Trigger value="overview" role="button" aria-selected={false}>
            Overview
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="overview" role="region" hidden>
          Overview content
        </Tabs.Content>
      </Tabs>,
    );

    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel', { name: 'Overview' })).toBeVisible();
  });

  it('creates unique aria relationships for values that sanitize to the same slug', () => {
    const { container } = render(
      <Tabs value="foo bar" onValueChange={() => undefined}>
        <Tabs.List>
          <Tabs.Trigger value="foo bar">Foo bar</Tabs.Trigger>
          <Tabs.Trigger value="foo-bar">Foo dash bar</Tabs.Trigger>
          <Tabs.Trigger value="foo@bar">Foo at bar</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="foo bar" keepMounted>
          Foo bar content
        </Tabs.Content>
        <Tabs.Content value="foo-bar" keepMounted>
          Foo dash bar content
        </Tabs.Content>
        <Tabs.Content value="foo@bar" keepMounted>
          Foo at bar content
        </Tabs.Content>
      </Tabs>,
    );

    const tabs = screen.getAllByRole('tab');
    const panels = Array.from(container.querySelectorAll('[role="tabpanel"]'));
    const tabIds = tabs.map((tab) => tab.id);
    const panelIds = panels.map((panel) => panel.id);

    expect(new Set(tabIds).size).toBe(tabs.length);
    expect(new Set(panelIds).size).toBe(panels.length);

    for (const [index, tab] of tabs.entries()) {
      const panel = panels[index];

      expect(tab).toHaveAttribute('aria-controls', panel.id);
      expect(panel).toHaveAttribute('aria-labelledby', tab.id);
    }
  });
});
