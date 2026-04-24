import {
  Box,
  Button,
  Field,
  Input,
  Label,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@adanft/ui';
import { useState } from 'react';
import { CodeBlock } from '../code-block';
import { Code } from '../components/code';

const importSnippet = `import { Modal } from '@adanft/ui';`;

const usageSnippet = `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open modal</Button>

<Modal open={open} onClose={() => setOpen(false)}>
  <Modal.Backdrop />
  <Modal.Panel className="space-y-4">
    <Modal.Title>Confirm action</Modal.Title>
    <p>This action needs confirmation before continuing.</p>
    <Button onClick={() => setOpen(false)}>Done</Button>
  </Modal.Panel>
</Modal>`;

const defaultExampleJsx = `<Modal open={open} onClose={() => setOpen(false)}>
  <Modal.Backdrop />
  <Modal.Panel className="space-y-4">
    <Modal.Title>Publish checklist</Modal.Title>
    <p>Confirm the release notes, docs links, and migration steps before publishing.</p>
    <div className="flex justify-end">
      <Button onClick={() => setOpen(false)}>Keep editing</Button>
    </div>
  </Modal.Panel>
</Modal>`;

const initialFocusExampleJsx = `<Modal open={open} onClose={() => setOpen(false)}>
  <Modal.Backdrop />
  <Modal.Panel className="space-y-4">
    <Modal.Title>Rename project</Modal.Title>
    <Field>
      <Label htmlFor="project-name">Project name</Label>
      <Input id="project-name" data-autofocus defaultValue="components" />
    </Field>
    <div className="flex justify-end gap-2">
      <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
      <Button onClick={() => setOpen(false)}>Save</Button>
    </div>
  </Modal.Panel>
</Modal>`;

const labelledExampleJsx = `<Modal open={open} onClose={() => setOpen(false)}>
  <Modal.Backdrop />
  <Modal.Panel aria-label="Quick settings" className="space-y-4">
    <p>Use aria-label when the modal does not render a visible title.</p>
    <Button onClick={() => setOpen(false)}>Close</Button>
  </Modal.Panel>
</Modal>`;

function ModalPage() {
  const [defaultOpen, setDefaultOpen] = useState(false);
  const [initialFocusOpen, setInitialFocusOpen] = useState(false);
  const [labelledOpen, setLabelledOpen] = useState(false);

  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <h1 className="text-3xl font-bold text-heading">Modal</h1>
        <p className="text-base leading-7 text-foreground">
          <Code>Modal</Code> renders controlled dialog content in a portal with backdrop dismiss,
          escape dismiss, focus trapping, and focus restoration.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">Usage</h2>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">Examples</h2>

        <h3 className="text-lg font-semibold text-heading">Default</h3>
        <Box className="flex items-center" shadow="none" surface="none">
          <Button onClick={() => setDefaultOpen(true)}>Review publish checklist</Button>

          <Modal open={defaultOpen} onClose={() => setDefaultOpen(false)}>
            <Modal.Backdrop />
            <Modal.Panel className="max-h-[80vh] space-y-4 overflow-auto">
              <Modal.Title>Publish checklist</Modal.Title>
              <p className="text-foreground">
                Confirm the release notes, docs links, and migration steps before publishing.
              </p>
              <div className="flex justify-end">
                <Button onClick={() => setDefaultOpen(false)}>Keep editing</Button>
              </div>
            </Modal.Panel>
          </Modal>
        </Box>
        <CodeBlock code={defaultExampleJsx} />

        <h3 className="text-lg font-semibold text-heading">Initial focus</h3>
        <Box className="flex items-center" shadow="none" surface="none">
          <Button onClick={() => setInitialFocusOpen(true)}>Rename project</Button>

          <Modal open={initialFocusOpen} onClose={() => setInitialFocusOpen(false)}>
            <Modal.Backdrop />
            <Modal.Panel className="space-y-4">
              <Modal.Title>Rename project</Modal.Title>
              <Field>
                <Label htmlFor="project-name">Project name</Label>
                <Input id="project-name" data-autofocus defaultValue="components" />
              </Field>
              <div className="flex justify-end gap-2">
                <Button variant="secondary" onClick={() => setInitialFocusOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setInitialFocusOpen(false)}>Save</Button>
              </div>
            </Modal.Panel>
          </Modal>
        </Box>
        <CodeBlock code={initialFocusExampleJsx} />

        <h3 className="text-lg font-semibold text-heading">Accessible name without title</h3>
        <Box className="flex items-center" shadow="none" surface="none">
          <Button onClick={() => setLabelledOpen(true)}>Open quick settings</Button>

          <Modal open={labelledOpen} onClose={() => setLabelledOpen(false)}>
            <Modal.Backdrop />
            <Modal.Panel aria-label="Quick settings" className="space-y-4">
              <p className="text-foreground">
                Use <Code>aria-label</Code> when the modal does not render a visible title.
              </p>
              <div className="flex justify-end">
                <Button onClick={() => setLabelledOpen(false)}>Close</Button>
              </div>
            </Modal.Panel>
          </Modal>
        </Box>
        <CodeBlock code={labelledExampleJsx} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">API Reference</h2>

        <h3 className="text-lg font-semibold text-heading">Modal</h3>
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
                <Code>open</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Controls whether the modal is rendered.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>onClose</Code>
              </TableCell>
              <TableCell>
                <Code>{`() => void`}</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Runs when the backdrop is clicked or Escape is pressed.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>children</Code>
              </TableCell>
              <TableCell>
                <Code>ReactNode</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Modal compound parts rendered inside the portal.</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold text-heading">Modal.Backdrop and Modal.Panel</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">Prop / Part</TableHead>
              <TableHead scope="col">Type</TableHead>
              <TableHead scope="col">Default</TableHead>
              <TableHead scope="col">Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Code>Modal.Backdrop</Code>
              </TableCell>
              <TableCell>native div props</TableCell>
              <TableCell>—</TableCell>
              <TableCell>Renders the overlay and calls the root close handler on click.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>Modal.Panel</Code>
              </TableCell>
              <TableCell>native div props</TableCell>
              <TableCell>—</TableCell>
              <TableCell>Wraps the modal content and accepts layout/spacing classes.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>aria-label</Code> / <Code>aria-labelledby</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                Names <Code>Modal.Panel</Code> when no <Code>Modal.Title</Code> is rendered.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold text-heading">Modal.Title and focus</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">Prop / Part</TableHead>
              <TableHead scope="col">Type</TableHead>
              <TableHead scope="col">Default</TableHead>
              <TableHead scope="col">Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Code>Modal.Title</Code>
              </TableCell>
              <TableCell>native h2 props</TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                Renders the visible title and names the panel when no manual name is provided.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>data-autofocus</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                Add it to the element that should receive focus when the modal opens.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </article>
  );
}

export default ModalPage;
