import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Landing() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div className="text-center mt-20 md:mt-32 px-4 md:px-6 transition-colors duration-300">

      {/* HEADING */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold 
        text-gray-900 dark:text-white leading-tight"
      >
        AI Product Description Generator 🚀
      </motion.h1>

      {/* SUBTEXT */}
      <p className="mt-3 md:mt-4 max-w-xl mx-auto 
      text-gray-600 dark:text-gray-400 
      text-sm md:text-base">
        Generate descriptions, captions & hashtags instantly using AI
      </p>

      {/* BUTTONS */}
      <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">

        {/* GET STARTED */}
        <button
          onClick={() => navigate(token ? "/generate" : "/signup")}
          className="w-full sm:w-auto 
          bg-purple-600 text-white px-6 py-3 rounded-xl 
          hover:scale-105 hover:bg-purple-700 
          transition-all duration-300 shadow-md text-sm md:text-base"
        >
          Get Started
        </button>

        {/* SIGN IN */}
        {!token && (
          <button
            onClick={() => navigate("/login")}
            className="w-full sm:w-auto 
            border border-gray-300 dark:border-white/20 
            px-6 py-3 rounded-xl 
            text-gray-800 dark:text-white
            hover:bg-gray-100 dark:hover:bg-white/10 
            transition-all duration-300 text-sm md:text-base"
          >
            Sign In
          </button>
        )}
      </div>

    </div>
  );
}