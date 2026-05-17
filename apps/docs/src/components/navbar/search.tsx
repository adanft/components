import { Box } from '@adanft/ui';
import { Search } from 'lucide-react';
import { type FocusEvent, type KeyboardEvent, useId, useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { docsSearchIndex, searchDocs } from '../../data/search';

type NavbarSearchProps = {
  placeholder?: string;
};

function NavbarSearch({ placeholder = 'Search' }: NavbarSearchProps) {
  const [query, setQuery] = useState('');
  const resultsListId = useId();
  const navigate = useNavigate();
  const results = searchDocs(query, docsSearchIndex);
  const showPanel = query.trim().length > 0;
  const hasResults = results.length > 0;

  function closeSearch() {
    setQuery('');
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') {
      closeSearch();
      return;
    }

    if (event.key === 'Enter' && hasResults) {
      event.preventDefault();
      navigate(results[0].href);
      closeSearch();
    }
  }

  function handleBlur(event: FocusEvent<HTMLElement>) {
    const nextFocusedElement = event.relatedTarget;

    if (nextFocusedElement instanceof Node && event.currentTarget.contains(nextFocusedElement)) {
      return;
    }

    closeSearch();
  }

  return (
    <search
      aria-label="Docs search"
      className="relative hidden sm:block sm:w-80"
      onBlur={handleBlur}>
      <div className="flex gap-4 rounded-full border border-brand bg-background px-4 py-2">
        <Search aria-hidden="true" className="mt-0.5 size-5 text-brand stroke-2" />
        <input
          aria-controls={showPanel ? resultsListId : undefined}
          aria-label="Search docs"
          className="w-full bg-background font-medium text-foreground placeholder:text-foreground/60 focus-visible:outline-none"
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          type="text"
          value={query}
        />
      </div>

      {showPanel ? (
        <Box className="absolute right-0 top-14 max-h-[calc(100vh-8rem)] w-full overflow-y-auto">
          {hasResults ? (
            <section aria-label="Search results" id={resultsListId} className="flex flex-col gap-4">
              {results.map((result) => (
                <Link
                  className="block rounded-md border border-border px-4 py-3 text-left hover:bg-muted/10 focus-visible:bg-background focus-visible:outline-none"
                  key={result.href}
                  onClick={closeSearch}
                  to={result.href}>
                  <span className="block text-sm font-semibold text-foreground">{result.name}</span>
                  <span className="mt-1 block text-xs font-medium uppercase tracking-wide text-brand">
                    {result.section}
                  </span>
                  <span className="mt-1 block text-sm leading-5 text-foreground/70">
                    {result.description}
                  </span>
                </Link>
              ))}
            </section>
          ) : (
            <p className="px-4 py-5 text-sm font-medium text-foreground/70">
              No docs found for “{query.trim()}”.
            </p>
          )}
        </Box>
      ) : null}
    </search>
  );
}

export default NavbarSearch;
export type { NavbarSearchProps };
