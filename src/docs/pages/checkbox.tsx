import { Box, Checkbox } from '../../lib';
import { CodeBlock } from '../code-block';

// ─────────────────────────────────────────────────────────────────────────────
// Snippets
// ─────────────────────────────────────────────────────────────────────────────

const importSnippet = `import { Checkbox } from '@your-org/components';`;

const statesSnippet = `<Checkbox label="Unchecked" onChange={() => {}} />
<Checkbox label="Checked" checked onChange={() => {}} />
<Checkbox label="Disabled" disabled onChange={() => {}} />`;

const labelPositionSnippet = `<Checkbox label="Label on the right (default)" labelPosition="right" onChange={() => {}} />
<Checkbox label="Label on the left" labelPosition="left" onChange={() => {}} />
<Checkbox label="Label on top" labelPosition="top" onChange={() => {}} />
<Checkbox label="Label on bottom" labelPosition="bottom" onChange={() => {}} />`;

const withoutLabelSnippet = `<Checkbox aria-label="Accept terms" onChange={() => {}} />`;

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

function CheckboxPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          components {'>'} Checkbox
        </p>
        <h1 className="text-3xl font-bold text-brand">Checkbox</h1>
        <p className="text-foreground">
          <code>Checkbox</code> is a controlled form input that supports checked and unchecked
          states. It auto-generates accessible <code>id</code>/<code>htmlFor</code> wiring, and lets
          you position the label on any side via <code>labelPosition</code>.
        </p>
      </header>

      {/* ── Import ─────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Import</h2>
        <CodeBlock code={importSnippet} />
      </section>

      {/* ── States ─────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">States</h2>
        <p className="text-foreground">
          The component supports three visual states: unchecked, checked, and disabled.
        </p>
        <Box className="flex flex-wrap items-center gap-6">
          <Checkbox label="Unchecked" onChange={() => {}} />
          <Checkbox label="Checked" defaultChecked onChange={() => {}} />
          <Checkbox label="Disabled" disabled onChange={() => {}} />
        </Box>
        <CodeBlock code={statesSnippet} />
      </section>

      {/* ── Label position ─────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Label position</h2>
        <p className="text-foreground">
          Use <code>labelPosition</code> to control where the label renders relative to the
          checkbox. Defaults to <code>"right"</code>. Accepts <code>"left"</code>,{' '}
          <code>"right"</code>, <code>"top"</code>, or <code>"bottom"</code>.
        </p>
        <Box className="flex flex-wrap items-center gap-8">
          <Checkbox label="Right (default)" labelPosition="right" onChange={() => {}} />
          <Checkbox label="Left" labelPosition="left" onChange={() => {}} />
          <Checkbox label="Top" labelPosition="top" onChange={() => {}} />
          <Checkbox label="Bottom" labelPosition="bottom" onChange={() => {}} />
        </Box>
        <CodeBlock code={labelPositionSnippet} />
      </section>

      {/* ── Without label ──────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Without label</h2>
        <p className="text-foreground">
          When no <code>label</code> prop is given, no <code>{'<label>'}</code> element is rendered.
          Always provide an <code>aria-label</code> or <code>aria-labelledby</code> for screen
          readers.
        </p>
        <Box className="flex items-center gap-4">
          <Checkbox aria-label="Accept terms" onChange={() => {}} />
        </Box>
        <CodeBlock code={withoutLabelSnippet} />
      </section>
    </article>
  );
}

export default CheckboxPage;
