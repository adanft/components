import { AlertCircle, CheckCircle2, Info, TriangleAlert } from 'lucide-react';

import { Alert, Box } from '@adanft/ui';
import { CodeBlock } from '../code-block';

const importSnippet = `import { Alert } from '@adanft/ui';`;

const usageSnippet = `<Alert variant="warning">
  <Alert.Title>Attention</Alert.Title>
  <Alert.Description>
    Review your changes before continuing.
  </Alert.Description>
</Alert>`;

const exampleSnippet = `<div className="space-y-4">
  <Alert variant="info" icon={<Info size={18} />}>
    <Alert.Title>Heads up</Alert.Title>
    <Alert.Description>
      This alert is informative and stays inline with the content.
    </Alert.Description>
  </Alert>

  <Alert variant="success" icon={<CheckCircle2 size={18} />}>
    <Alert.Title>Saved</Alert.Title>
    <Alert.Description>
      Your workspace settings were updated successfully.
    </Alert.Description>
  </Alert>

  <Alert variant="warning" icon={<TriangleAlert size={18} />}>
    <Alert.Title>Attention</Alert.Title>
    <Alert.Description>
      Billing details are incomplete and may affect future renewals.
    </Alert.Description>
  </Alert>

  <Alert variant="danger" icon={<AlertCircle size={18} />}>
    <Alert.Title>Connection issue</Alert.Title>
    <Alert.Description>
      We could not sync the latest data. Try again in a moment.
    </Alert.Description>
  </Alert>
</div>`;

function AlertPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          components {'>'} Alert
        </p>
        <h1 className="text-3xl font-bold text-brand">Alert</h1>
        <p className="text-foreground">
          <code>Alert</code> provides an inline contextual message for important information,
          warnings, or errors.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Usage</h2>
        <p className="text-foreground">
          Use <code>Alert.Title</code> and <code>Alert.Description</code> for a clear message
          hierarchy. Add a visual icon if it helps the context, but do not rely on color alone.
        </p>
        <p className="text-foreground">
          This component does not set <code>role="alert"</code> automatically. Pass{' '}
          <code>role="status"</code> or <code>role="alert"</code> only when the message truly needs
          live announcement semantics.
        </p>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Full example</h2>
        <Box className="p-8">
          <div className="mx-auto max-w-xl space-y-4 rounded-xl border border-border bg-surface p-6 shadow-card">
            <Alert variant="info" icon={<Info size={18} />}>
              <Alert.Title>Heads up</Alert.Title>
              <Alert.Description>
                This alert is informative and stays inline with the content.
              </Alert.Description>
            </Alert>

            <Alert variant="success" icon={<CheckCircle2 size={18} />}>
              <Alert.Title>Saved</Alert.Title>
              <Alert.Description>
                Your workspace settings were updated successfully.
              </Alert.Description>
            </Alert>

            <Alert variant="warning" icon={<TriangleAlert size={18} />}>
              <Alert.Title>Attention</Alert.Title>
              <Alert.Description>
                Billing details are incomplete and may affect future renewals.
              </Alert.Description>
            </Alert>

            <Alert variant="danger" icon={<AlertCircle size={18} />}>
              <Alert.Title>Connection issue</Alert.Title>
              <Alert.Description>
                We could not sync the latest data. Try again in a moment.
              </Alert.Description>
            </Alert>
          </div>
        </Box>
        <CodeBlock code={exampleSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">What this v1 includes</h2>
        <ul className="list-disc space-y-2 pl-5 text-foreground">
          <li>Inline contextual message, not toast or dismissible notification.</li>
          <li>
            Subcomponents: <code>Alert.Title</code> and <code>Alert.Description</code>.
          </li>
          <li>
            Variants: <code>info</code>, <code>success</code>, <code>warning</code>,{' '}
            <code>danger</code>.
          </li>
          <li>
            Optional icon support through the root <code>icon</code> prop.
          </li>
        </ul>
      </section>
    </article>
  );
}

export default AlertPage;
