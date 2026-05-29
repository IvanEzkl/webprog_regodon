import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = () => {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-page)] text-[var(--ink-900)] transition-colors duration-300">
      <NavBar theme={theme} onToggleTheme={toggleTheme} />
      <main className="flex-1 pb-16 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;