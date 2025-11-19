import { Outlet } from "react-router";
import Navbar from "./components/Navbar.jsx";
import PopupProvider from "./components/Popup/PopupProvider.jsx";

const Layout = () => {
  return (
    <div className="flex h-screen bg-bg-dark text-text">
      <Navbar />
      <main className="grow h-full">
        <PopupProvider >
          <Outlet />
        </PopupProvider>
      </main>
    </div>
  );
};

export default Layout;
