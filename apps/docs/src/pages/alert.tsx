import { Alert, Box } from '@adanft/ui';
import { AlertCircle, CheckCircle2, Info, TriangleAlert } from 'lucide-react';
import { CodeBlock } from '../code-block';
import { Code } from '../components/code';

const importSnippet = `import { Alert } from '@adanft/ui';`;

const usageSnippet = `<Alert variant="warning">
  <Alert.Title>Attention</Alert.Title>
  <Alert.Description>
    Review your changes before continuing.
  </Alert.Description>
</Alert>`;

const infoSnippet = `<Alert variant="info" icon={<Info size={18} aria-hidden="true" />}>
  <Alert.Title>Heads up</Alert.Title>
  <Alert.Description>
    This alert is informative and stays inline with the content.
  </Alert.Description>
</Alert>`;

const successSnippet = `<Alert variant="success" icon={<CheckCircle2 size={18} aria-hidden="true" />}>
  <Alert.Title>Saved</Alert.Title>
  <Alert.Description>
    Your workspace settings were updated successfully.
  </Alert.Description>
</Alert>`;

const warningSnippet = `<Alert variant="warning" icon={<TriangleAlert size={18} aria-hidden="true" />}>
  <Alert.Title>Attention</Alert.Title>
  <Alert.Description>
    Billing details are incomplete and may affect future renewals.
  </Alert.Description>
</Alert>`;

const dangerSnippet = `<Alert variant="danger" icon={<AlertCircle size={18} aria-hidden="true" />}>
  <Alert.Title>Connection issue</Alert.Title>
  <Alert.Description>
    We could not sync the latest data. Try again in a moment.
  </Alert.Description>
</Alert>`;

function AlertPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <h1 className="text-3xl font-bold text-brand">Alert</h1>
        <p className="text-base leading-7 text-foreground">
          <Code>Alert</Code> displays inline contextual feedback for information, success, warning,
          or danger states.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-brand">Usage</h2>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-brand">Examples</h2>

        <h3 className="text-lg font-semibold text-brand">Info</h3>
        <Box shadow="none" surface="none">
          <Alert variant="info" icon={<Info size={18} aria-hidden="true" />}>
            <Alert.Title>Heads up</Alert.Title>
            <Alert.Description>
              This alert is informative and stays inline with the content.
            </Alert.Description>
          </Alert>
        </Box>
        <CodeBlock code={infoSnippet} />

        <h3 className="text-lg font-semibold text-brand">Success</h3>
        <Box shadow="none" surface="none">
          <Alert variant="success" icon={<CheckCircle2 size={18} aria-hidden="true" />}>
            <Alert.Title>Saved</Alert.Title>
            <Alert.Description>
              Your workspace settings were updated successfully.
            </Alert.Description>
          </Alert>
        </Box>
        <CodeBlock code={successSnippet} />

        <h3 className="text-lg font-semibold text-brand">Warning</h3>
        <Box shadow="none" surface="none">
          <Alert variant="warning" icon={<TriangleAlert size={18} aria-hidden="true" />}>
            <Alert.Title>Attention</Alert.Title>
            <Alert.Description>
              Billing details are incomplete and may affect future renewals.
            </Alert.Description>
          </Alert>
        </Box>
        <CodeBlock code={warningSnippet} />

        <h3 className="text-lg font-semibold text-brand">Danger</h3>
        <Box shadow="none" surface="none">
          <Alert variant="danger" icon={<AlertCircle size={18} aria-hidden="true" />}>
            <Alert.Title>Connection issue</Alert.Title>
            <Alert.Description>
              We could not sync the latest data. Try again in a moment.
            </Alert.Description>
          </Alert>
        </Box>
        <CodeBlock code={dangerSnippet} />
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
                  <Code>variant</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>{`"info" | "success" | "warning" | "danger"`}</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>{`"info"`}</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  Controls the visual treatment of the alert.
                </td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>icon</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>ReactNode</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">
                  Optional icon rendered before the alert content.
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

export default AlertPage;
