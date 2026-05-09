import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Textarea } from '../index';

describe('Textarea', () => {
  it('renders a native textarea with placeholder support', () => {
    render(<Textarea aria-label="Message" placeholder="Write a message" />);

    const textarea = screen.getByRole('textbox', { name: /message/i });

    expect(textarea.tagName).toBe('TEXTAREA');
    expect(textarea).toHaveAttribute('placeholder', 'Write a message');
    expect(textarea).toHaveClass('w-full', 'min-h-24', 'resize-y', 'rounded-md');
  });

  it('forwards consumer className and native props', () => {
    render(<Textarea aria-label="Bio" className="custom-textarea" name="bio" rows={6} />);

    const textarea = screen.getByLabelText('Bio');

    expect(textarea).toHaveAttribute('name', 'bio');
    expect(textarea).toHaveAttribute('rows', '6');
    expect(textarea).toHaveClass('custom-textarea', 'w-full');
  });

  it('includes invalid state classes for aria-invalid textareas', () => {
    render(<Textarea aria-invalid="true" aria-label="Message" />);

    expect(screen.getByLabelText('Message')).toHaveClass(
      'aria-invalid:border-danger',
      'aria-invalid:focus-visible:outline-danger',
    );
  });

  it('passes disabled through and includes disabled state classes', () => {
    render(<Textarea aria-label="Disabled message" disabled />);

    expect(screen.getByLabelText('Disabled message')).toBeDisabled();
    expect(screen.getByLabelText('Disabled message')).toHaveClass(
      'disabled:cursor-not-allowed',
      'disabled:bg-muted/20',
      'disabled:opacity-50',
    );
  });
});
