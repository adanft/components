import Select from '@adanft/ui/select';
import { useState } from 'react';

function SelectCase() {
  const [plan, setPlan] = useState('pro');
  const [count, setCount] = useState(10);
  const rogueProps = { multiple: true };

  return (
    <main className="space-y-4 p-8">
      <form aria-label="Plans">
        <Select aria-label="Placeholder" name="placeholder" placeholder="Choose a plan">
          <option value="starter">Starter</option>
          <option value="pro">Pro</option>
        </Select>
        <Select aria-label="Default" name="default" defaultValue="pro" placeholder="Choose a plan">
          <option value="starter">Starter</option>
          <option value="pro">Pro</option>
        </Select>
        <Select aria-label="Disabled" name="disabled" disabled defaultValue="starter">
          <option value="starter">Starter</option>
        </Select>
        <button type="reset">Reset</button>
      </form>
      <Select
        aria-label="Controlled"
        value={plan}
        onChange={(event) => setPlan(event.target.value)}
        placeholder="Choose a plan">
        <option value="starter">Starter</option>
        <option value="pro">Pro</option>
      </Select>
      <output aria-label="Plan value">{plan}</output>
      <Select
        aria-label="Numeric"
        value={count}
        onChange={(event) => setCount(Number(event.target.value))}>
        <option value={10}>Ten</option>
        <option value={20}>Twenty</option>
      </Select>
      <output aria-label="Numeric value">{count}</output>
      <div data-testid="rogue-select">
        <Select {...rogueProps} aria-label="Unchecked" placeholder="Choose a plan">
          <option value="starter">Starter</option>
          <option value="pro">Pro</option>
        </Select>
      </div>
    </main>
  );
}

export default SelectCase;
