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
    expect(screen.queryByText('Overview content')).not.toBeVisible();
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
});
