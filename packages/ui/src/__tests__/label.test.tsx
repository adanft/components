import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Input, Label } from '../index';

describe('Label', () => {
  it('renders label text and merges consumer className with base styles', () => {
    render(
      <Label className="custom-label" htmlFor="email">
        Email
      </Label>,
    );

    expect(screen.getByText('Email')).toHaveClass('custom-label', 'text-sm', 'font-medium');
  });

  it('passes htmlFor through to associate with a form control', () => {
    render(
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" />
      </div>,
    );

    expect(screen.getByLabelText('Email')).toHaveAttribute('id', 'email');
  });
});
