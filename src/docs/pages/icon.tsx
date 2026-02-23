import type { ReactNode } from 'react';

import { Icon } from '../../lib';

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

function IconPage() {
  const basicExampleJsx = (
    <>
      <span className="text-sky-300">&lt;Icon</span> <span className="text-amber-300">symbol</span>=
      <span className="text-emerald-300">"nf-md-react"</span>{' '}
      <span className="text-amber-300">className</span>=
      <span className="text-emerald-300">"text-4xl text-sky-400"</span>{' '}
      <span className="text-amber-300">aria-hidden</span>=
      <span className="text-emerald-300">"true"</span> <span className="text-sky-300">/&gt;</span>
    </>
  );

  const importSnippet = (
    <>
      <span className="text-fuchsia-400">import</span> {'{ '}
      <span className="text-sky-300">Icon</span>
      {' } '}
      <span className="text-fuchsia-400">from</span>{' '}
      <span className="text-emerald-300">'../../lib'</span>;
    </>
  );

  const usageSnippet = (
    <>
      <span className="text-sky-300">&lt;Icon</span> <span className="text-amber-300">symbol</span>=
      <span className="text-emerald-300">"nf-fa-user"</span>{' '}
      <span className="text-amber-300">aria-hidden</span>=
      <span className="text-emerald-300">"true"</span> <span className="text-sky-300">/&gt;</span>
    </>
  );

  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] ui-text-muted">
          components {'>'} Icon
        </p>
        <h1 className="text-3xl font-bold ui-text-brand">Icon</h1>
        <p className="ui-text-body">
          <code>Icon</code> renders a Nerd Font symbol through an <code>{'<i />'}</code> element.
          Control size, color and motion with <code>className</code> and pass native attributes when
          needed. Icon names come from the{' '}
          <a
            href="https://www.nerdfonts.com/cheat-sheet"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4">
            Nerd Fonts cheat sheet
          </a>
          .
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold ui-text-brand">Usage</h2>
        <p className="ui-text-body">Import the component and provide a Nerd Fonts symbol string.</p>
        <CodeBlock>{importSnippet}</CodeBlock>
        <CodeBlock>{usageSnippet}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold ui-text-brand">Example</h2>
        <div className="rounded-lg border ui-border-default ui-bg-surface-raised p-4">
          <Icon symbol="nf-md-react" className="text-4xl text-sky-400" aria-hidden="true" />
        </div>
        <CodeBlock>{basicExampleJsx}</CodeBlock>
      </section>
    </article>
  );
}

export default IconPage;
