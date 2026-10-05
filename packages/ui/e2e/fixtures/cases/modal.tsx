import Modal from '@adanft/ui/modal';
import { useState } from 'react';

export default function ModalCase() {
  const [outerOpen, setOuterOpen] = useState(false);
  const [innerOpen, setInnerOpen] = useState(false);

  return (
    <main className="p-8">
      <h1 className="mb-4 text-xl">Nested Modal keyboard regression</h1>
      <button type="button" onClick={() => setOuterOpen(true)}>
        Open outer modal
      </button>
      <Modal open={outerOpen} onClose={() => setOuterOpen(false)}>
        <Modal.Backdrop />
        <Modal.Panel className="rounded-lg bg-surface p-6 shadow-card">
          <Modal.Title>Outer modal</Modal.Title>
          <button type="button" data-autofocus onClick={() => setInnerOpen(true)}>
            Open inner modal
          </button>
          <Modal open={innerOpen} onClose={() => setInnerOpen(false)}>
            <Modal.Backdrop />
            <Modal.Panel className="rounded-lg bg-surface p-6 shadow-card">
              <Modal.Title>Inner modal</Modal.Title>
              <button type="button" data-autofocus onClick={() => setInnerOpen(false)}>
                Close inner modal
              </button>
            </Modal.Panel>
          </Modal>
        </Modal.Panel>
      </Modal>
    </main>
  );
}
