import { useState } from "react";
import UploadForm from "../components/UploadForm";
import { motion } from "framer-motion";
import Stats from "../components/Stats";
import ResultCard from "../components/ResultCard";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Home() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleGenerate = async (data) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Login required!");
        navigate("/login");
        return;
      }

      const res = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        toast.error("Session expired, login again");
        navigate("/login");
        return;
      }

      const apiData = await res.json();
      const text = apiData.result || "";

      let description = "";
      let caption = "";
      let hashtags = "";

      try {
        let mainPart = text;

        if (text.includes("Hashtags:")) {
          const parts = text.split("Hashtags:");
          mainPart = parts[0];
          hashtags = parts[1].trim();
        }

        if (mainPart.includes("Caption:")) {
          const parts = mainPart.split("Caption:");
          description = parts[0].replace("Description:", "").trim();
          caption = parts[1].trim();
        } else {
          description = mainPart;
          caption = mainPart;
        }
      } catch {
        description = text;
        caption = text;
      }

      const newData = { description, caption, hashtags };
      setResult(newData);

      const oldHistory = JSON.parse(localStorage.getItem("history")) || [];
      const updatedHistory = [newData, ...oldHistory].slice(0, 20);
      localStorage.setItem("history", JSON.stringify(updatedHistory));

      toast.success("Generated successfully 🚀");

    } catch (error) {
      console.error(error);

      setResult({
        description: "❌ Error generating description",
        caption: "Try again later",
        hashtags: "",
      });

      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 md:px-6 py-10 md:py-12 max-w-6xl mx-auto">

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 md:mb-16"
      >
        <div className="inline-block px-3 md:px-4 py-1 rounded-full bg-purple-500/10 text-purple-500 text-xs md:text-sm mb-4">
          ✨ Powered by AI
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-gray-900 dark:text-white">
          AI descriptions for{" "}
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            your shop
          </span>{" "}
          in seconds
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mt-3 md:mt-4 text-sm md:text-base max-w-xl mx-auto">
          Upload product photo & get captions instantly 🚀
        </p>
      </motion.div>

      {/* STATS */}
      <Stats />

      {/* FORM */}
      <UploadForm onGenerate={handleGenerate} />

      {/* RESULT */}
      {result || loading ? (
        <ResultCard result={result} loading={loading} />
      ) : (
        <div className="mt-8 md:mt-10 text-center text-gray-500 dark:text-gray-400 text-sm md:text-base">
          👉 Generate something to see results here
        </div>
      )}

    </div>
  );
}