'use client';

import { Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={styles.toggleBtn} style={{ width: 36, height: 36 }} />;
  }

  return (
    <button 
      onClick={toggleTheme} 
      className={styles.toggleBtn}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}
