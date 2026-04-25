import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';

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
