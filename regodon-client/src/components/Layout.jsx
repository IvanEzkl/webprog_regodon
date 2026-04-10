import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ theme, onToggleTheme }) => {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-page)] text-[var(--ink-900)] transition-colors duration-300">
      <NavBar theme={theme} onToggleTheme={onToggleTheme} />
      <main className="flex-1 pb-16 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;