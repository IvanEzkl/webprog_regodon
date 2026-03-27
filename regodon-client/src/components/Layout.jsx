import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-white text-[#140D19]">
      <NavBar />
      <main className="pb-16 pt-20">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;