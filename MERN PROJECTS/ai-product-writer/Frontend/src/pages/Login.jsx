import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.token) {
        alert(data.error || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      alert("Login successful ✅");

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen 
    px-4 md:px-0
    bg-white dark:bg-[#0b0f19] 
    text-black dark:text-white 
    transition-colors duration-300">

      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 md:p-8 rounded-2xl w-full max-w-sm shadow-xl
        bg-gray-100 dark:bg-white/5
        border border-gray-300 dark:border-white/10
        backdrop-blur-xl transition-all duration-300"
      >
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">
          Welcome Back 👋
        </h2>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="w-full p-3 mb-4 rounded-lg outline-none
          bg-white dark:bg-white/5
          border border-gray-300 dark:border-white/10
          text-black dark:text-white
          text-sm md:text-base
          focus:ring-2 focus:ring-purple-500 transition"
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          className="w-full p-3 mb-6 rounded-lg outline-none
          bg-white dark:bg-white/5
          border border-gray-300 dark:border-white/10
          text-black dark:text-white
          text-sm md:text-base
          focus:ring-2 focus:ring-purple-500 transition"
        />

        {/* BUTTON */}
        <motion.button
          type="submit"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          disabled={loading}
          className="w-full py-3 rounded-xl text-white
          bg-gradient-to-r from-purple-500 to-blue-500
          disabled:opacity-50 shadow-md text-sm md:text-base"
        >
          {loading ? "Signing in..." : "Sign In 🚀"}
        </motion.button>

      </motion.form>
    </div>
  );
}