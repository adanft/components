import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Input } from '../index';

describe('Input', () => {
  it('renders a text input by default with placeholder support', () => {
    render(<Input aria-label="Email" placeholder="name@example.com" />);

    const input = screen.getByRole('textbox', { name: /email/i });

    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('placeholder', 'name@example.com');
  });

  it('supports custom input types and disabled state', () => {
    render(<Input aria-label="Password" type="password" disabled />);

    const input = screen.getByLabelText('Password');

    expect(input).toHaveAttribute('type', 'password');
    expect(input).toBeDisabled();
  });

  it('merges consumer className with base styles', () => {
    render(<Input aria-label="Name" className="custom-input" />);

    expect(screen.getByLabelText('Name')).toHaveClass('custom-input', 'w-full', 'rounded-md');
  });
});
