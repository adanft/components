import { Box, InputField } from '../../lib';
import { CodeBlock } from '../code-block';

const importSnippet = `import { InputField } from '../../lib';`;

const usageSnippet = `<InputField id="email" label="Email" name="email" type="email" placeholder="name@company.com" />`;

const exampleJsx = `<InputField
  id="workEmail"
  label="Email"
  name="workEmail"
  type="email"
  placeholder="you@company.com"
/>`;

function InputFieldPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] ui-text-muted">
          components {'>'} InputField
        </p>
        <h1 className="text-3xl font-bold ui-text-brand">InputField</h1>
        <p className="ui-text-body">
          <code>InputField</code> pairs a label with an accessible <code>{'<input />'}</code>{' '}
          element and ships with the library&apos;s default border, spacing, and focus styles. Use
          it as the base text input in forms and filter controls.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold ui-text-brand">Usage</h2>
        <p className="ui-text-body">
          Import <code>InputField</code> from the public library entrypoint.
        </p>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold ui-text-brand">Example</h2>
        <Box>
          <InputField
            id="workEmail"
            label="Email"
            name="workEmail"
            type="email"
            placeholder="you@company.com"
          />
        </Box>
        <CodeBlock code={exampleJsx} />
      </section>
    </article>
  );
}

export default InputFieldPage;
