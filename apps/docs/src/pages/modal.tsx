import { Box, Modal } from '@adanft/ui';
import { useState } from 'react';
import { CodeBlock } from '../code-block';

const importSnippet = `import { Modal } from '@adanft/ui';`;

const usageSnippet = `import { useState } from 'react';
import { Modal } from '@adanft/ui';

const [isOpen, setIsOpen] = useState(false);

<button type="button" onClick={() => setIsOpen(true)}>Open modal</button>

<Modal open={isOpen} onClose={() => setIsOpen(false)}>
  <Modal.Backdrop />
  <Modal.Panel className="max-h-[80vh] overflow-auto">
    <Modal.Title>Share project</Modal.Title>
    <p>Share the project with a teammate.</p>
    <button type="button" onClick={() => setIsOpen(false)}>Close</button>
  </Modal.Panel>
</Modal>`;

const exampleSnippet = `const [isOpen, setIsOpen] = useState(false);

<button type="button" onClick={() => setIsOpen(true)}>
  Review publish checklist
</button>

<Modal open={isOpen} onClose={() => setIsOpen(false)}>
  <Modal.Backdrop />
  <Modal.Panel className="max-h-[80vh] overflow-auto">
    <Modal.Title>Share project</Modal.Title>
    <p>Share the project with a teammate.</p>
    <button type="button" onClick={() => setIsOpen(false)}>Close</button>
  </Modal.Panel>
</Modal>`;

const autofocusSnippet = `const [isOpen, setIsOpen] = useState(false);

<button type="button" onClick={() => setIsOpen(true)}>
  Rename project
</button>

<Modal open={isOpen} onClose={() => setIsOpen(false)}>
  <Modal.Backdrop />
  <Modal.Panel className="max-h-[80vh] space-y-4 overflow-auto">
    <Modal.Title>Publish checklist</Modal.Title>
    <p>Confirm the release notes, docs links, and migration steps before publishing.</p>
    <div className="flex justify-end">
      <button type="button" onClick={() => setIsOpen(false)}>
        Keep editing
      </button>
    </div>
  </Modal.Panel>
</Modal>`;

function ModalPage() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [exampleOpen, setExampleOpen] = useState(false);
  const [autofocusOpen, setAutofocusOpen] = useState(false);

  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          components {'>'} Modal
        </p>
        <h1 className="text-3xl font-bold text-brand">Modal</h1>
        <p className="text-foreground">
          <code>Modal</code> provides a controlled, headless compound API for focused dialog
          content. Use <code>Modal</code> as the root with <code>open</code> and{' '}
          <code>onClose</code> props, <code>Modal.Backdrop</code> for the overlay,{' '}
          <code>Modal.Panel</code> for the dialog container, and <code>Modal.Title</code> for the
          accessible heading.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Usage</h2>
        <p className="text-foreground">
          Import <code>Modal</code> from the public library entrypoint.
        </p>
        <CodeBlock code={importSnippet} />
        <p className="text-foreground">
          <code>Modal</code> is fully controlled — manage the <code>open</code> state yourself and
          pass <code>onClose</code> to react to dismiss actions (backdrop click, escape key).
        </p>
        <p className="text-foreground">
          <code>Modal.Backdrop</code> renders the visual overlay and calls <code>onClose</code> on
          click. <code>Modal.Panel</code> stops click propagation and holds the dialog content.
        </p>
        <p className="text-foreground">
          <code>Modal.Title</code> renders an <code>{'<h2>'}</code> and automatically links to{' '}
          <code>Modal.Panel</code> via <code>aria-labelledby</code>.
        </p>
        <p className="text-foreground">
          If the content needs internal scroll, add a width or height limit together with{' '}
          <code>overflow-auto</code> so the scroll stays inside the panel.
        </p>
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Example</h2>
        <Box className="flex items-center">
          <button type="button" onClick={() => setExampleOpen(true)}>
            Review publish checklist
          </button>

          <Modal open={exampleOpen} onClose={() => setExampleOpen(false)}>
            <Modal.Backdrop />
            <Modal.Panel className="max-h-[80vh] space-y-4 overflow-auto">
              <Modal.Title>Publish checklist</Modal.Title>
              <p className="text-foreground">
                Confirm the release notes, docs links, and migration steps before publishing.
              </p>
              <div className="flex justify-end">
                <button type="button" onClick={() => setExampleOpen(false)}>
                  Keep editing
                </button>
              </div>
            </Modal.Panel>
          </Modal>
        </Box>
        <CodeBlock code={exampleSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Initial focus</h2>
        <p className="text-foreground">
          Add <code>data-autofocus</code> to the element that should receive focus when the modal
          opens — typically the first interactive input. If no element has{' '}
          <code>data-autofocus</code>, <code>Modal.Panel</code> itself receives focus as a fallback.
        </p>
        <Box className="flex items-center">
          <button type="button" onClick={() => setAutofocusOpen(true)}>
            Rename project
          </button>

          <Modal open={autofocusOpen} onClose={() => setAutofocusOpen(false)}>
            <Modal.Backdrop />
            <Modal.Panel className="space-y-4">
              <Modal.Title>Rename project</Modal.Title>
              <input
                data-autofocus
                type="text"
                placeholder="Project name"
                defaultValue="my-app"
                className="w-full rounded border px-2 py-1"
              />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setAutofocusOpen(false)}>
                  Cancel
                </button>
                <button type="button" onClick={() => setAutofocusOpen(false)}>
                  Save
                </button>
              </div>
            </Modal.Panel>
          </Modal>
        </Box>
        <CodeBlock code={autofocusSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Basic</h2>
        <Box className="flex items-center">
          <button type="button" onClick={() => setBasicOpen(true)}>
            Open basic modal
          </button>

          <Modal open={basicOpen} onClose={() => setBasicOpen(false)}>
            <Modal.Backdrop />
            <Modal.Panel>
              <Modal.Title>Confirm</Modal.Title>
              <p className="text-foreground">Are you sure you want to continue?</p>
              <button type="button" onClick={() => setBasicOpen(false)}>
                Done
              </button>
            </Modal.Panel>
          </Modal>
        </Box>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Composition</h2>
        <p className="text-foreground">
          Keep the structure small. Put the main content inside <code>Modal.Panel</code> and use a
          standard <code>{'<button>'}</code> with <code>onClick</code> for dismiss actions.
        </p>
        <p className="text-foreground">
          <code>Modal.Backdrop</code> handles the overlay click automatically. Style it with
          Tailwind classes like <code>bg-black/50</code> — positioning is built in.
        </p>
        <p className="text-foreground">
          <code>Modal.Panel</code> renders with <code>role=&quot;dialog&quot;</code> and{' '}
          <code>aria-modal=&quot;true&quot;</code>. It auto-links to <code>Modal.Title</code> via{' '}
          <code>aria-labelledby</code>.
        </p>
        <p className="text-foreground">
          Internal scrolling only appears when <code>Modal.Panel</code> has a defined width or
          height limit, such as <code>max-w-lg</code> or <code>max-h-[80vh]</code>, together with{' '}
          <code>overflow-auto</code>.
        </p>
      </section>
    </article>
  );
}

export default ModalPage;
