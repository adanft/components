import type { TabsTriggerRegistration } from './context';

function findFirstEnabledTriggerInDocumentOrder(triggers: TabsTriggerRegistration[]) {
  let firstTrigger: TabsTriggerRegistration | undefined;

  for (const trigger of triggers) {
    if (trigger.disabled || !trigger.node.isConnected) {
      continue;
    }

    const isBeforeFirstTrigger =
      firstTrigger !== undefined &&
      (trigger.node.compareDocumentPosition(firstTrigger.node) &
        Node.DOCUMENT_POSITION_FOLLOWING) !==
        0;

    if (!firstTrigger || isBeforeFirstTrigger) {
      firstTrigger = trigger;
    }
  }

  return firstTrigger;
}

function createTabsValueId(value: string) {
  const encodedValue = Array.from(value, (character) =>
    character.codePointAt(0)?.toString(36),
  ).join('-');

  return encodedValue || 'empty';
}

export { createTabsValueId, findFirstEnabledTriggerInDocumentOrder };
