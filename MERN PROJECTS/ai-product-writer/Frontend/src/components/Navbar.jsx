import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar({ theme, toggleTheme }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const isActive = (path) =>
    location.pathname === path ? "text-purple-500" : "";

  return (
    <nav
      className="flex justify-between items-center px-4 md:px-8 py-4 
      border-b border-gray-200 dark:border-white/10 
      bg-white dark:bg-transparent 
      backdrop-blur-lg transition-all duration-300 relative"
    >
      {/* LOGO */}
      <h1
        onClick={() => navigate("/")}
        className="text-lg font-semibold cursor-pointer flex items-center gap-1"
      >
        <span className="text-purple-500 animate-pulse">•</span>
        <span className="text-gray-800 dark:text-white">
          ShopWrite AI
        </span>
      </h1>

      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-2xl text-gray-800 dark:text-white"
      >
        ☰
      </button>

      {/* NAV LINKS */}
      <div
        className={`absolute md:static top-full left-0 w-full md:w-auto 
        bg-white dark:bg-[#0b0f19] md:bg-transparent 
        flex flex-col md:flex-row gap-4 md:gap-6 
        items-start md:items-center 
        text-sm font-medium text-gray-700 dark:text-gray-300
        p-4 md:p-0 shadow-md md:shadow-none
        ${open ? "flex" : "hidden md:flex"}`}
      >
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className={`hover:text-purple-500 transition ${isActive("/")}`}
        >
          Home
        </Link>

        {token && (
          <Link
            to="/generate"
            onClick={() => setOpen(false)}
            className={`hover:text-purple-500 transition ${isActive("/generate")}`}
          >
            Generate
          </Link>
        )}

        {token && (
          <Link
            to="/dashboard"
            onClick={() => setOpen(false)}
            className={`hover:text-purple-500 transition ${isActive("/dashboard")}`}
          >
            Dashboard
          </Link>
        )}

        {/* THEME */}
        <button
          onClick={toggleTheme}
          className="px-3 py-1.5 rounded-lg 
          bg-gray-200 dark:bg-white/10 
          hover:bg-gray-300 dark:hover:bg-white/20 
          transition-all duration-300"
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </button>

        {!token ? (
          <>
            <Link to="/login" onClick={() => setOpen(false)}>
              <button className="border border-gray-300 dark:border-white/20 px-4 py-1.5 rounded-lg hover:bg-purple-500/20 transition w-full md:w-auto">
                Sign in
              </button>
            </Link>

            <Link to="/signup" onClick={() => setOpen(false)}>
              <button className="bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-1.5 rounded-lg hover:scale-105 transition text-white shadow-md w-full md:w-auto">
                Signup
              </button>
            </Link>
          </>
        ) : (
          <>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>

            <button
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
              className="bg-red-500 px-4 py-1.5 rounded-lg hover:bg-red-600 transition hover:scale-105 text-white shadow-md w-full md:w-auto"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}