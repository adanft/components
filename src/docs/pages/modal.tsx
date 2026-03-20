import { Box, Icon, Modal } from '../../lib';
import { CodeBlock } from '../code-block';

const importSnippet = `import { Modal } from '../../lib';`;

const usageSnippet = `import { Icon, Modal } from '../../lib';

<Modal.Root>
  <Modal.Trigger>
    <button type="button">Open modal</button>
  </Modal.Trigger>
  <Modal.Body closeIcon={<Icon symbol="nf-md-close" />} className="max-h-[80vh] overflow-auto">
    <p>Share the project with a teammate.</p>
    <Modal.Close>
      <button type="button">Close</button>
    </Modal.Close>
  </Modal.Body>
</Modal.Root>`;

const exampleJsx = `<Modal.Root>
  <Modal.Trigger>
    <button type="button">Review publish checklist</button>
  </Modal.Trigger>
  <Modal.Body
    closeIcon={<Icon symbol="nf-md-close" />}
    className="max-h-[80vh] max-w-lg space-y-4 overflow-auto"
  >
    <p>Confirm the release notes, docs links, and migration steps before publishing.</p>
    <div className="flex justify-end">
      <Modal.Close>
        <button type="button">Keep editing</button>
      </Modal.Close>
    </div>
  </Modal.Body>
</Modal.Root>`;

function ModalPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          components {'>'} Modal
        </p>
        <h1 className="text-3xl font-bold text-brand">Modal</h1>
        <p className="text-foreground">
          <code>Modal</code> provides a small compound API for opening and closing focused dialog
          content. Use <code>Modal.Root</code> to share state, <code>Modal.Trigger</code> to open,
          <code>Modal.Body</code> to render the dialog, and <code>Modal.Close</code> for the dismiss
          action.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Usage</h2>
        <p className="text-foreground">
          Import <code>Modal</code> from the public library entrypoint.
        </p>
        <CodeBlock code={importSnippet} />
        <p className="text-foreground">
          <code>Modal.Trigger</code> and <code>Modal.Close</code> attach the modal action to the
          single child element you pass.
        </p>
        <p className="text-foreground">
          <code>Modal.Body</code> now requires a <code>closeIcon</code> prop for the default close
          button rendered in the top-right corner.
        </p>
        <p className="text-foreground">
          If the content needs internal scroll, define the size on <code>Modal.Body</code> and add
          <code>overflow-auto</code> so the scroll stays inside the modal.
        </p>
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Example</h2>
        <Box className="flex items-center">
          <Modal.Root>
            <Modal.Trigger>
              <button type="button">Review publish checklist</button>
            </Modal.Trigger>
            <Modal.Body
              closeIcon={<Icon symbol="nf-md-close" />}
              className="max-h-[80vh] max-w-lg space-y-4 overflow-auto">
              <p className="text-foreground">
                Confirm the release notes, docs links, and migration steps before publishing.
              </p>
              <div className="flex justify-end">
                <Modal.Close>
                  <button type="button">Keep editing</button>
                </Modal.Close>
              </div>
            </Modal.Body>
          </Modal.Root>
        </Box>
        <CodeBlock code={exampleJsx} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Composition</h2>
        <p className="text-foreground">
          Keep the structure small. Put the main content inside <code>Modal.Body</code> and add a
          single <code>Modal.Close</code> when the flow only needs a dismiss action.
        </p>
        <p className="text-foreground">
          Pass the icon you want to show in the default top-right close button through the
          <code>closeIcon</code> prop.
        </p>
        <p className="text-foreground">
          Pass your own button or clickable element into <code>Modal.Trigger</code> and
          <code>Modal.Close</code> when you want full control over styles.
        </p>
        <p className="text-foreground">
          Internal scrolling only appears when <code>Modal.Body</code> has a defined width or height
          limit, such as <code>max-w-lg</code> or <code>max-h-[80vh]</code>, together with
          <code>overflow-auto</code>.
        </p>
      </section>
    </article>
  );
}

export default ModalPage;
