// components/Layout.jsx
import { Outlet } from "react-router";
import Navbar from "./components/Navbar.jsx";

const Layout = () => {
  return (
    <div className="flex h-screen bg-bg-dark">
      <main className="flex-grow h-full">
        <Outlet />
      </main>
      <Navbar />
    </div>
  );
};

export default Layout;
