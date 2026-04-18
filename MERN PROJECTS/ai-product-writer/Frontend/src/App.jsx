import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [theme, setTheme] = useState("dark");

  // 🔥 APPLY THEME
  const applyTheme = (mode) => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // 🔥 LOAD THEME
  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved) {
      setTheme(saved);
      applyTheme(saved);
    } else {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const defaultTheme = systemDark ? "dark" : "light";

      setTheme(defaultTheme);
      applyTheme(defaultTheme);
    }
  }, []);

  // 🔥 TOGGLE
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen 
      bg-white dark:bg-[#0b0f19] 
      text-black dark:text-white 
      relative overflow-x-hidden 
      transition-colors duration-300">

        {/* 🔥 TOASTER */}
        <Toaster
          position="top-right"
          containerStyle={{
            top: 20,
            right: 10,
          }}
          toastOptions={{
            style: {
              background: theme === "dark" ? "#111827" : "#ffffff",
              color: theme === "dark" ? "#ffffff" : "#000000",
              border: "1px solid #374151",
              fontSize: "14px",
            },
          }}
        />

        {/* 🔥 BACKGROUND GLOW (RESPONSIVE) */}
        <div className="hidden dark:block absolute top-[-80px] md:top-[-100px] left-[-80px] md:left-[-100px] 
        w-[200px] md:w-[300px] h-[200px] md:h-[300px] 
        bg-purple-600 opacity-30 blur-3xl animate-pulse"></div>

        <div className="hidden dark:block absolute bottom-[-80px] md:bottom-[-100px] right-[-80px] md:right-[-100px] 
        w-[200px] md:w-[300px] h-[200px] md:h-[300px] 
        bg-blue-600 opacity-30 blur-3xl animate-pulse"></div>

        {/* 🔥 NAVBAR */}
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        {/* 🔥 ROUTES */}
        <div className="pt-2 md:pt-4">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/generate"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;