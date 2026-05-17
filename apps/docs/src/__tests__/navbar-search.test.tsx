import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import NavbarSearch from '../components/navbar/search';

describe('NavbarSearch', () => {
  it('shows search results while typing and links to the result route', () => {
    render(
      <MemoryRouter>
        <NavbarSearch placeholder="Search" />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByRole('textbox', { name: /search docs/i }), {
      target: { value: 'dialog' },
    });

    const results = screen.getByLabelText(/search results/i);
    const modalLink = within(results).getByRole('link', { name: /modal/i });

    expect(modalLink).toHaveAttribute('href', '/components/modal');
  });

  it('closes results with Enter and Escape keyboard actions', async () => {
    render(
      <MemoryRouter>
        <NavbarSearch placeholder="Search" />
      </MemoryRouter>,
    );

    const input = screen.getByRole('textbox', { name: /search docs/i });

    fireEvent.change(input, { target: { value: 'spinner' } });
    expect(await screen.findByRole('link', { name: /spinner/i })).toBeInTheDocument();
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(screen.queryByLabelText(/search results/i)).not.toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'unknown component' } });
    expect(screen.getByText(/no docs found/i)).toBeInTheDocument();

    fireEvent.keyDown(input, { key: 'Escape' });
    expect(screen.queryByText(/no docs found/i)).not.toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('closes results when focus leaves the search', () => {
    render(
      <MemoryRouter>
        <NavbarSearch placeholder="Search" />
        <button type="button">Continue browsing</button>
      </MemoryRouter>,
    );

    const input = screen.getByRole('textbox', { name: /search docs/i });
    const nextControl = screen.getByRole('button', { name: /continue browsing/i });

    fireEvent.change(input, { target: { value: 'dialog' } });
    expect(screen.getByLabelText(/search results/i)).toBeInTheDocument();

    fireEvent.blur(input, { relatedTarget: nextControl });

    expect(screen.queryByLabelText(/search results/i)).not.toBeInTheDocument();
    expect(input).toHaveValue('');
  });
});
