import {
  Alert,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@adanft/ui';
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
        <h1 className="text-3xl font-bold text-heading">Alert</h1>
        <p className="text-base leading-7 text-foreground">
          <Code>Alert</Code> displays inline contextual feedback for information, success, warning,
          or danger states.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">Usage</h2>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">Examples</h2>

        <h3 className="text-lg font-semibold text-heading">Info</h3>
        <Box shadow="none" surface="none">
          <Alert variant="info" icon={<Info size={18} aria-hidden="true" />}>
            <Alert.Title>Heads up</Alert.Title>
            <Alert.Description>
              This alert is informative and stays inline with the content.
            </Alert.Description>
          </Alert>
        </Box>
        <CodeBlock code={infoSnippet} />

        <h3 className="text-lg font-semibold text-heading">Success</h3>
        <Box shadow="none" surface="none">
          <Alert variant="success" icon={<CheckCircle2 size={18} aria-hidden="true" />}>
            <Alert.Title>Saved</Alert.Title>
            <Alert.Description>
              Your workspace settings were updated successfully.
            </Alert.Description>
          </Alert>
        </Box>
        <CodeBlock code={successSnippet} />

        <h3 className="text-lg font-semibold text-heading">Warning</h3>
        <Box shadow="none" surface="none">
          <Alert variant="warning" icon={<TriangleAlert size={18} aria-hidden="true" />}>
            <Alert.Title>Attention</Alert.Title>
            <Alert.Description>
              Billing details are incomplete and may affect future renewals.
            </Alert.Description>
          </Alert>
        </Box>
        <CodeBlock code={warningSnippet} />

        <h3 className="text-lg font-semibold text-heading">Danger</h3>
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
        <h2 className="text-2xl font-semibold text-heading">API Reference</h2>

        <h3 className="text-lg font-semibold text-heading">Alert</h3>
        <p className="text-foreground">
          A thin wrapper around the native <Code>{`<div>`}</Code> element.
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">Prop</TableHead>
              <TableHead scope="col">Type</TableHead>
              <TableHead scope="col">Default</TableHead>
              <TableHead scope="col">Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Code>variant</Code>
              </TableCell>
              <TableCell>
                <Code>{`"info" | "success" | "warning" | "danger"`}</Code>
              </TableCell>
              <TableCell>
                <Code>{`"info"`}</Code>
              </TableCell>
              <TableCell>Controls the visual treatment of the alert.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>icon</Code>
              </TableCell>
              <TableCell>
                <Code>ReactNode</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Optional icon rendered before the alert content.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>className</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Extends the component styles.</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold text-heading">Alert.Title</h3>
        <p className="text-foreground">
          A thin wrapper around the native <Code>{`<div>`}</Code> element.
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">Prop</TableHead>
              <TableHead scope="col">Type</TableHead>
              <TableHead scope="col">Default</TableHead>
              <TableHead scope="col">Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Code>className</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Extends the component styles.</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold text-heading">Alert.Description</h3>
        <p className="text-foreground">
          A thin wrapper around the native <Code>{`<div>`}</Code> element.
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">Prop</TableHead>
              <TableHead scope="col">Type</TableHead>
              <TableHead scope="col">Default</TableHead>
              <TableHead scope="col">Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Code>className</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Extends the component styles.</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </article>
  );
}

export default AlertPage;
