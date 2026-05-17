import { describe, expect, it } from 'vitest';

import { type DocsSearchEntry, docsSearchIndex, searchDocs } from '../data/search';

const rankingFixture: DocsSearchEntry[] = [
  {
    description: '',
    href: '/contains',
    keywords: [],
    name: 'My Button',
    section: 'Fixture',
    subpaths: [],
  },
  {
    description: '',
    href: '/prefix',
    keywords: [],
    name: 'Button Group',
    section: 'Fixture',
    subpaths: [],
  },
  {
    description: '',
    href: '/exact',
    keywords: [],
    name: 'Button',
    section: 'Fixture',
    subpaths: [],
  },
];

describe('docs search', () => {
  it('returns no results for a blank query', () => {
    expect(searchDocs('   ', docsSearchIndex)).toEqual([]);
  });

  it('ranks exact and prefix name matches before contains matches', () => {
    const results = searchDocs('button', rankingFixture);

    expect(results.map((result) => result.name)).toEqual(['Button', 'Button Group', 'My Button']);
  });

  it('matches user-intent keywords and descriptions', () => {
    const results = searchDocs('dialog', docsSearchIndex);

    expect(results[0]).toMatchObject({ name: 'Modal', href: '/components/modal' });
  });

  it('matches component import subpaths', () => {
    const results = searchDocs('@adanft/ui/select', docsSearchIndex);

    expect(results[0]).toMatchObject({ name: 'Select', href: '/components/select' });
  });

  it('limits results to a small result set', () => {
    expect(searchDocs('component', docsSearchIndex)).toHaveLength(6);
  });

  it('returns no results when limit is zero or negative', () => {
    expect(searchDocs('component', docsSearchIndex, 0)).toEqual([]);
    expect(searchDocs('component', docsSearchIndex, -1)).toEqual([]);
  });
});
