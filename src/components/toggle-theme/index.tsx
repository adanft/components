import { useState, type JSX } from 'react';
import styles from './styles.module.css';
import { getStoredTheme, toggleTheme, type ThemeMode } from '../../helpers/theme';

function ToggleTheme(): JSX.Element {
  const [theme, setTheme] = useState<ThemeMode>(getStoredTheme() ?? 'light');

  const changeTheme = (): void => {
    setTheme((previousTheme) => toggleTheme(previousTheme));
  };

  return (
    <label className="relative inline-block w-12 h-6 cursor-pointer">
      <span className={styles.sun}>
        <i className="nf nf-oct-sun"></i>
      </span>
      <span className={styles.moon}>
        <i className="nf nf-fa-moon_o"></i>
      </span>
      <input
        type="checkbox"
        className={styles.input}
        onChange={changeTheme}
        checked={theme === 'dark'}
      />
      <span className={styles.slider}></span>
    </label>
  );
}

export default ToggleTheme;
