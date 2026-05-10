function createTabsValueId(value: string) {
  const encodedValue = Array.from(value, (character) =>
    character.codePointAt(0)?.toString(36),
  ).join('-');

  return encodedValue || 'empty';
}

export { createTabsValueId };
