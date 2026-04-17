import { Field, RadioGroup, Select } from '@adanft/ui';
import { CodeBlock } from '../code-block';

const importSnippet = `import { Field } from '@adanft/ui';`;

const usageSnippet = `<Field id="email" invalid required>
  <Field.Label>Email</Field.Label>

  <Field.Control asChild>
    <input type="email" />
  </Field.Control>

  <Field.Description>We never share your email.</Field.Description>
  <Field.Error>Email is required.</Field.Error>
</Field>`;

const groupSnippet = `<Field.Set invalid>
  <Field.Legend>Plan</Field.Legend>
  <Field.Description>Choose one option.</Field.Description>

  <RadioGroup value="starter" onValueChange={() => undefined}>
    <RadioGroup.Item value="starter" label="Starter" />
    <RadioGroup.Item value="pro" label="Pro" />
  </RadioGroup>

  <Field.Error>You must choose a plan.</Field.Error>
</Field.Set>`;

const selectSnippet = `<Field id="workspace-plan">
  <Field.Label>Workspace plan</Field.Label>

  <Field.Control asChild>
    <Select defaultValue="pro">
      <option value="starter">Starter</option>
      <option value="pro">Pro</option>
      <option value="team">Team</option>
    </Select>
  </Field.Control>

  <Field.Description>Choose the current workspace plan.</Field.Description>
</Field>`;

function FieldPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          components {'>'} Field
        </p>
        <h1 className="text-3xl font-bold text-brand">Field</h1>
        <p className="text-foreground">
          <code>Field</code> provides the shared structure for label, description, error, and
          control wiring. Use <code>Field.Set</code> and <code>Field.Legend</code> for grouped
          controls like radio groups.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Single control</h2>
        <p className="text-foreground">
          Use <code>Field.Control</code> with <code>asChild</code> to inject <code>id</code>,{' '}
          <code>aria-describedby</code>, and error state into a real form control.
        </p>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
        <div className="rounded-xl border border-border bg-surface p-6 shadow-card">
          <Field id="email" invalid required>
            <Field.Label>Email</Field.Label>
            <Field.Control asChild>
              <input
                type="email"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground"
              />
            </Field.Control>
            <Field.Description>We never share your email.</Field.Description>
            <Field.Error>Email is required.</Field.Error>
          </Field>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">What Field.Control wires for you</h2>
        <ul className="list-disc space-y-2 pl-5 text-foreground">
          <li>
            injects a stable <code>id</code> into the child control when it does not have one.
          </li>
          <li>
            merges <code>aria-describedby</code> with the ids of description and error when those
            pieces actually exist.
          </li>
          <li>
            adds <code>aria-invalid</code> and <code>aria-errormessage</code> when the field is
            marked invalid.
          </li>
          <li>
            passes <code>required</code> to the control when the control does not already define it.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Grouped controls</h2>
        <p className="text-foreground">
          Use <code>Field.Set</code> and <code>Field.Legend</code> to preserve native semantics for
          grouped controls like <code>RadioGroup</code>.
        </p>
        <CodeBlock code={groupSnippet} />
        <div className="rounded-xl border border-border bg-surface p-6 shadow-card">
          <Field.Set invalid>
            <Field.Legend>Plan</Field.Legend>
            <Field.Description>Choose one option.</Field.Description>
            <RadioGroup value="starter" onValueChange={() => undefined} className="flex-col gap-3">
              <RadioGroup.Item value="starter" label="Starter" />
              <RadioGroup.Item value="pro" label="Pro" />
            </RadioGroup>
            <Field.Error>You must choose a plan.</Field.Error>
          </Field.Set>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">With Select</h2>
        <p className="text-foreground">
          <code>Field</code> also works with the native <code>Select</code> wrapper through{' '}
          <code>Field.Control</code>.
        </p>
        <CodeBlock code={selectSnippet} />
        <div className="rounded-xl border border-border bg-surface p-6 shadow-card">
          <Field id="workspace-plan">
            <Field.Label>Workspace plan</Field.Label>
            <Field.Control asChild>
              <Select defaultValue="pro">
                <option value="starter">Starter</option>
                <option value="pro">Pro</option>
                <option value="team">Team</option>
              </Select>
            </Field.Control>
            <Field.Description>Choose the current workspace plan.</Field.Description>
          </Field>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">How it fits the current library</h2>
        <ul className="list-disc space-y-2 pl-5 text-foreground">
          <li>
            <code>Select</code> can already be composed with <code>Field.Control</code>.
          </li>
          <li>
            <code>RadioGroup</code> benefits from the new <code>Field.Set</code> and{' '}
            <code>Field.Legend</code> story immediately.
          </li>
        </ul>
        <div className="rounded-xl border border-border bg-surface p-6 shadow-card">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">Select with Field</p>
            <Field id="workspace-plan">
              <Field.Label>Workspace plan</Field.Label>
              <Field.Control asChild>
                <Select defaultValue="pro">
                  <option value="starter">Starter</option>
                  <option value="pro">Pro</option>
                  <option value="team">Team</option>
                </Select>
              </Field.Control>
              <Field.Description>Choose the current workspace plan.</Field.Description>
            </Field>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">What this v1 includes</h2>
        <ul className="list-disc space-y-2 pl-5 text-foreground">
          <li>
            <code>Field</code>, <code>Field.Label</code>, <code>Field.Description</code>,{' '}
            <code>Field.Error</code>, and <code>Field.Control</code> for single controls.
          </li>
          <li>
            <code>Field.Set</code> and <code>Field.Legend</code> for grouped semantics with native{' '}
            <code>fieldset</code> / <code>legend</code>.
          </li>
          <li>
            automatic wiring of <code>id</code>, <code>aria-describedby</code>,{' '}
            <code>aria-invalid</code>, and <code>aria-errormessage</code>.
          </li>
          <li>
            required and invalid state reflected through <code>data-required</code> and{' '}
            <code>data-invalid</code>.
          </li>
        </ul>
      </section>
    </article>
  );
}

export default FieldPage;
