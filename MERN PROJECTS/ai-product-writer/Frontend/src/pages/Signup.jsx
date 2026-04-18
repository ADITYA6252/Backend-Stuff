import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Fill all fields");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("https://ai-product-writer-de3j.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        alert(data.error || "Signup failed");
        return;
      }

      alert("Signup successful ✅");
      navigate("/login");

    } catch (err) {
      console.log(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
    px-4 md:px-0
    bg-white dark:bg-[#0b0f19] 
    text-black dark:text-white 
    relative overflow-hidden transition-colors duration-300">

      {/* 🔥 Glow */}
      <div className="hidden dark:block absolute top-[-100px] left-[-100px] w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-purple-600 opacity-30 blur-3xl animate-pulse"></div>
      <div className="hidden dark:block absolute bottom-[-100px] right-[-100px] w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-blue-600 opacity-30 blur-3xl animate-pulse"></div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="p-6 md:p-8 rounded-2xl w-full max-w-sm shadow-2xl
        bg-gray-100 dark:bg-white/5
        border border-gray-300 dark:border-white/10
        backdrop-blur-xl transition-all duration-300"
      >
        <h2 className="text-xl md:text-2xl font-semibold text-center mb-6">
          Create Account ✨
        </h2>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg outline-none
          bg-white dark:bg-white/5
          border border-gray-300 dark:border-white/10
          text-black dark:text-white
          text-sm md:text-base
          focus:ring-2 focus:ring-purple-500 transition"
        />

        {/* PASSWORD */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 pr-10 rounded-lg outline-none
            bg-white dark:bg-white/5
            border border-gray-300 dark:border-white/10
            text-black dark:text-white
            text-sm md:text-base
            focus:ring-2 focus:ring-purple-500 transition"
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 cursor-pointer 
            text-gray-600 dark:text-gray-300 
            hover:text-black dark:hover:text-white transition"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

        {/* BUTTON */}
        <motion.button
          type="submit"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          disabled={loading}
          className="w-full py-3 rounded-xl text-white
          bg-gradient-to-r from-purple-500 to-blue-500
          shadow-lg disabled:opacity-50 text-sm md:text-base"
        >
          {loading ? "Creating..." : "Sign Up 🚀"}
        </motion.button>

        {/* FOOTER */}
        <p className="text-center text-xs md:text-sm mt-4 
        text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-purple-500 cursor-pointer hover:underline"
          >
            Sign In
          </span>
        </p>

      </motion.form>
    </div>
  );
}