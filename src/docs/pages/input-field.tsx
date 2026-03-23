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

const errorBooleanSnippet = `<InputField
  id="username"
  label="Username"
  name="username"
  placeholder="johndoe"
  error={true}
/>`;

const errorMessageSnippet = `<InputField
  id="password"
  label="Password"
  name="password"
  type="password"
  placeholder="Enter password"
  error="This field is required"
/>`;

function InputFieldPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          components {'>'} InputField
        </p>
        <h1 className="text-3xl font-bold text-brand">InputField</h1>
        <p className="text-foreground">
          <code>InputField</code> pairs a label with an accessible <code>{'<input />'}</code>{' '}
          element and ships with the library&apos;s default border, spacing, and focus styles. Use
          it as the base text input in forms and filter controls.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Usage</h2>
        <p className="text-foreground">
          Import <code>InputField</code> from the public library entrypoint.
        </p>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Example</h2>
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

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Error state</h2>
        <p className="text-foreground">
          Pass <code>error={'{true}'}</code> to highlight the border and label in red without
          displaying a message.
        </p>
        <Box>
          <InputField
            id="username"
            label="Username"
            name="username"
            placeholder="johndoe"
            error={true}
          />
        </Box>
        <CodeBlock code={errorBooleanSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Error with message</h2>
        <p className="text-foreground">
          Pass a string to <code>error</code> to show both the red highlight and an inline error
          message below the input.
        </p>
        <Box>
          <InputField
            id="password"
            label="Password"
            name="password"
            type="password"
            placeholder="Enter password"
            error="This field is required"
          />
        </Box>
        <CodeBlock code={errorMessageSnippet} />
      </section>
    </article>
  );
}

export default InputFieldPage;
