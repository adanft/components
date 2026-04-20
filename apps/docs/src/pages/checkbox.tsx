import { Box, Checkbox } from '@adanft/ui';
import { CodeBlock } from '../code-block';
import { Code } from '../components/code';

const importSnippet = `import { Checkbox } from '@adanft/ui';`;

const usageSnippet = `<Checkbox label="Accept terms" onChange={() => {}} />`;

const statesSnippet = `<Checkbox label="Unchecked" onChange={() => {}} />
<Checkbox label="Checked" checked onChange={() => {}} />
<Checkbox label="Disabled" disabled onChange={() => {}} />`;

const labelPositionSnippet = `<Checkbox label="Label on the right (default)" labelPosition="right" onChange={() => {}} />
<Checkbox label="Label on the left" labelPosition="left" onChange={() => {}} />
<Checkbox label="Label on top" labelPosition="top" onChange={() => {}} />
<Checkbox label="Label on bottom" labelPosition="bottom" onChange={() => {}} />`;

const withoutLabelSnippet = `<Checkbox aria-label="Accept terms" onChange={() => {}} />`;

function CheckboxPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <h1 className="text-3xl font-bold text-brand">Checkbox</h1>
        <p className="text-base leading-7 text-foreground">
          <Code>Checkbox</Code> is a form control used to toggle a checked or unchecked state.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-brand">Usage</h2>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-brand">Examples</h2>

        <h3 className="text-lg font-semibold text-brand">Default</h3>
        <Box className="flex items-center gap-4" shadow="none" surface="none">
          <Checkbox label="Accept terms" onChange={() => {}} />
        </Box>
        <CodeBlock code={usageSnippet} />

        <h3 className="text-lg font-semibold text-brand">States</h3>
        <Box className="flex flex-wrap items-center gap-6" shadow="none" surface="none">
          <Checkbox label="Unchecked" onChange={() => {}} />
          <Checkbox label="Checked" defaultChecked onChange={() => {}} />
          <Checkbox label="Disabled" disabled onChange={() => {}} />
        </Box>
        <CodeBlock code={statesSnippet} />

        <h3 className="text-lg font-semibold text-brand">Label position</h3>
        <Box className="flex flex-wrap items-center gap-8" shadow="none" surface="none">
          <Checkbox label="Right (default)" labelPosition="right" onChange={() => {}} />
          <Checkbox label="Left" labelPosition="left" onChange={() => {}} />
          <Checkbox label="Top" labelPosition="top" onChange={() => {}} />
          <Checkbox label="Bottom" labelPosition="bottom" onChange={() => {}} />
        </Box>
        <CodeBlock code={labelPositionSnippet} />

        <h3 className="text-lg font-semibold text-brand">Without label</h3>
        <p className="text-foreground">
          When no <Code>label</Code> prop is provided, make sure the control still has an accessible
          name through <Code>aria-label</Code> or <Code>aria-labelledby</Code>.
        </p>
        <Box className="flex items-center gap-4" shadow="none" surface="none">
          <Checkbox aria-label="Accept terms" onChange={() => {}} />
        </Box>
        <CodeBlock code={withoutLabelSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-brand">API Reference</h2>
        <div className="overflow-x-auto rounded-md border border-border">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm text-foreground">
            <thead className="bg-surface/60 text-sm text-muted">
              <tr>
                <th className="border-b border-border px-4 py-3 font-semibold">Prop</th>
                <th className="border-b border-border px-4 py-3 font-semibold">Type</th>
                <th className="border-b border-border px-4 py-3 font-semibold">Default</th>
                <th className="border-b border-border px-4 py-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>label</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>string</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">
                  Optional text rendered next to the checkbox.
                </td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>labelPosition</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>{`"left" | "right" | "top" | "bottom"`}</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>{`"right"`}</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  Controls where the label appears relative to the checkbox.
                </td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>checked</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>boolean</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">
                  Controls the checked state when used as a controlled input.
                </td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>defaultChecked</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>boolean</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">
                  Sets the initial checked state for uncontrolled usage.
                </td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>disabled</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>boolean</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">
                  Disables interaction and applies the disabled visual state.
                </td>
              </tr>
              <tr className="align-top">
                <td className="px-4 py-3">
                  <Code>className</Code>
                </td>
                <td className="px-4 py-3">
                  <Code>string</Code>
                </td>
                <td className="px-4 py-3">—</td>
                <td className="px-4 py-3">
                  Extends the component styles and can override default values when needed.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}

export default CheckboxPage;
