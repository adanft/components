import { useState, type JSX } from 'react';
import styles from './styles.module.css';
import { getStorage, removeStorage, setStorage } from '../../helpers/local-storage';

function ToggleTheme(): JSX.Element {
  const [theme, setTheme] = useState(getStorage('theme'));

  const changeTheme = (): void => {
    if (theme === null) {
      setStorage('theme', 'dark');
      setTheme('dark');
    } else {
      removeStorage('theme');
      setTheme(null);
    }
    document.body.classList.toggle('dark');
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
