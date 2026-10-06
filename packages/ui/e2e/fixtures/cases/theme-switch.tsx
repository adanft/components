import ThemeSwitch, { type ThemeSwitchSize } from '@adanft/ui/theme-switch';
import { useState } from 'react';

function ControlledSwitch({ size }: { size: ThemeSwitchSize }) {
  const [checked, setChecked] = useState(false);

  return (
    <section data-testid={`theme-switch-${size}`}>
      <h2>{size}</h2>
      <ThemeSwitch size={size} checked={checked} onCheckedChange={setChecked} />
      <output>{checked ? 'checked' : 'unchecked'}</output>
    </section>
  );
}

export default function ThemeSwitchCase() {
  return (
    <main className="p-8">
      <h1 className="mb-4 text-xl">ThemeSwitch motion regression</h1>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <ControlledSwitch key={size} size={size} />
      ))}
    </main>
  );
}
