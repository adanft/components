import { initializeTheme, setTheme } from '@adanft/ui/theme';
import { useState } from 'react';

export default function ThemeCase() {
  const [result, setResult] = useState<boolean | null>(null);

  return (
    <main>
      <h1>Theme persistence</h1>
      <button type="button" onClick={() => setResult(initializeTheme())}>
        Initialize theme
      </button>
      <button type="button" onClick={() => setResult(setTheme(true))}>
        Set dark
      </button>
      <button type="button" onClick={() => setResult(setTheme(false))}>
        Set light
      </button>
      <output aria-label="Theme result">{result === null ? 'not called' : String(result)}</output>
    </main>
  );
}
