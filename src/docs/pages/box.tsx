import type { ReactNode } from 'react';

import { Box } from '../../lib';

type CodeBlockProps = {
  children: ReactNode;
};

function CodeBlock({ children }: CodeBlockProps) {
  return (
    <pre className="overflow-x-auto rounded-lg border ui-border-default bg-slate-950 p-4 text-sm text-slate-100">
      <code className="font-mono leading-6">{children}</code>
    </pre>
  );
}

function BoxPage() {
  const practicalExample = (
    <>
      <span className="text-sky-300">&lt;Box</span>{' '}
      <span className="text-amber-300">className</span>=
      <span className="text-emerald-300">"space-y-2 rounded-lg ui-bg-surface-raised"</span>
      <span className="text-sky-300">&gt;</span>
      <br />
      <span className="pl-4 text-sky-300">&lt;h3</span>{' '}
      <span className="text-amber-300">className</span>=
      <span className="text-emerald-300">"text-lg font-semibold ui-text-brand"</span>
      <span className="text-sky-300">&gt;</span>
      <span className="pl-1 text-slate-100">Release notes</span>
      <span className="text-sky-300">&lt;/h3&gt;</span>
      <br />
      <span className="pl-4 text-sky-300">&lt;p</span>{' '}
      <span className="text-amber-300">className</span>=
      <span className="text-emerald-300">"ui-text-body"</span>
      <span className="text-sky-300">&gt;</span>
      <span className="pl-1 text-slate-100">
        Version 2.4 ships improved card spacing and keyboard focus styles.
      </span>
      <span className="text-sky-300">&lt;/p&gt;</span>
      <br />
      <span className="text-sky-300">&lt;/Box&gt;</span>
    </>
  );

  const importSnippet = (
    <>
      <span className="text-fuchsia-400">import</span> {'{ '}
      <span className="text-sky-300">Box</span>
      {' } '}
      <span className="text-fuchsia-400">from</span>{' '}
      <span className="text-emerald-300">'../../lib'</span>;
    </>
  );

  const usageSnippet = (
    <>
      <span className="text-sky-300">&lt;Box&gt;</span>
      <br />
      <span className="pl-4 text-sky-300">&lt;p</span>{' '}
      <span className="text-amber-300">className</span>=
      <span className="text-emerald-300">"ui-text-body"</span>
      <span className="text-sky-300">&gt;</span>
      <span className="pl-1 text-slate-100">Content inside the container</span>
      <span className="text-sky-300">&lt;/p&gt;</span>
      <br />
      <span className="text-sky-300">&lt;/Box&gt;</span>
    </>
  );

  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] ui-text-muted">
          components {'>'} Box
        </p>
        <h1 className="text-3xl font-bold ui-text-brand">Box</h1>
        <p className="ui-text-body">
          <code>Box</code> is a lightweight wrapper around a <code>{'<div />'}</code> with fixed
          border, shadow and padding. Use it to group related content in a consistent container.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold ui-text-brand">Usage</h2>
        <p className="ui-text-body">
          Import <code>Box</code> from the public library entrypoint.
        </p>
        <CodeBlock>{importSnippet}</CodeBlock>
        <CodeBlock>{usageSnippet}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold ui-text-brand">Example</h2>
        <div className="rounded-lg border ui-border-default ui-bg-surface-raised p-4">
          <Box className="space-y-2 rounded-lg ui-bg-surface-raised">
            <h3 className="text-lg font-semibold ui-text-brand">Release notes</h3>
            <p className="ui-text-body">
              Version 2.4 ships improved card spacing and keyboard focus styles.
            </p>
          </Box>
        </div>
        <CodeBlock>{practicalExample}</CodeBlock>
      </section>
    </article>
  );
}

export default BoxPage;
