// components/Layout.jsx
import { Outlet } from "react-router";
import Navbar from "./components/Navbar.jsx";

const Layout = () => {
  return (
    <div className="flex h-screen bg-bg-dark">
      <Navbar />
      <main className="flex-grow h-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
