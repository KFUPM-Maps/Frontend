import { useState, useContext } from "react";
import { AuthContext } from "../AuthLogic/AuthContext";
import { NavLink } from "react-router";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => setIsOpen(!isOpen);
  const user = useContext(AuthContext);

  const navLinks = [
    { name: "Home", href: "/", show: true },
    { name: "My Routes", href: "/myroutes", show: user.user },
    { name: "Manage Routes", href: "/manageroutes",  show: user.user && user.user.type === "admin"},
    { name: "Leaderboard", href: "/leaderboard",  show: true},
    { name: "My Account", href: "/myaccount",  show: user.user},
    { name: "Sign up", href: "/signup", show: !user.user },
    { name: "Log in", href: "/login", show: !user.user },
    { name: "Logout", href: "/logout", show: user.user },
    
  ];

  return (
    <>
      <div
        className={`
            fixed top-0 left-0 h-screen bg-gray-900 text-white transition-all duration-300 z-40
            ${isOpen ? "translate-x-0" : "translate-x-full"} w-full
            md:translate-x-0 md:w-64 md:static md:flex
        `}
      >
        <div
          className={`
            flex flex-col h-full overflow-hidden transition-opacity duration-300
            ${isOpen ? "opacity-100" : "opacity-0 md:opacity-100"}
            ${isOpen || "pointer-events-none md:pointer-events-auto"}
          `}
        >
          <h1 className="text-2xl font-bold p-6 border-b border-gray-700">
            KFUPM Maps
          </h1>
          <nav className="flex flex-col gap-4 p-6">
            {navLinks.map((link) => (
              link.show &&
              <NavLink
                key={link.name}
                to={link.href}
                className="hover:text-gray-300 text-lg"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </NavLink>
              
            ))}
          </nav>
        </div>
      </div>

      <button
        onClick={toggleNavbar}
        className="md:hidden fixed top-4 right-4 z-50 text-gray-800"
      >
        <span
          className="material-symbols-rounded text-3xl"
          onClick={toggleNavbar}
        >
          {isOpen ? "close" : "menu"}
        </span>
      </button>
    </>
  );
}
