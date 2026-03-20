import { Box, Icon } from '../../lib';
import { CodeBlock } from '../code-block';

const exampleJsx = `<Icon symbol="nf-md-react" className="text-4xl text-sky-400" aria-hidden="true" />`;

const importSnippet = `import { Icon } from '../../lib';`;

const usageSnippet = `<Icon symbol="nf-fa-user" aria-hidden="true" />`;

function IconPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          components {'>'} Icon
        </p>
        <h1 className="text-3xl font-bold text-brand">Icon</h1>
        <p className="text-foreground">
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
        <h2 className="text-xl font-semibold text-brand">Usage</h2>
        <p className="text-foreground">Import the component and provide a Nerd Fonts symbol string.</p>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Example</h2>
        <Box className="flex items-center">
          <Icon symbol="nf-md-react" className="text-4xl text-sky-400" aria-hidden="true" />
        </Box>
        <CodeBlock code={exampleJsx} />
      </section>
    </article>
  );
}

export default IconPage;
