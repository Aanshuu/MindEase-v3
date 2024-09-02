import { useEffect, useState } from 'react';
import {Sun} from 'lucide-react';
import {MoonStar} from 'lucide-react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check for saved user preference, or default to light theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button onClick={toggleTheme} className="p-1 bg-black dark:bg-white text-white dark:text-black rounded">
      {theme === 'light' ? <Sun/> : <MoonStar/>}
    </button>
  );
};

export default ThemeToggle;
