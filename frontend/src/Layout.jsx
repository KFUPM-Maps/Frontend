// components/Layout.jsx
import { Outlet } from "react-router";
import Navbar from "./components/Navbar.jsx";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
