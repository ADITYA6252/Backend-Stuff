import { useState } from "react";
import toast from "react-hot-toast";

export default function ResultCard({ result, loading }) {
  const [copied, setCopied] = useState("");

  const copyText = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);

    toast.success("Copied ✅");

    setTimeout(() => setCopied(""), 2000);
  };

  // 🔥 LOADER
  if (loading) {
    return (
      <div className="mt-6 p-4 md:p-6 rounded-2xl 
      bg-white dark:bg-white/5 
      border border-gray-200 dark:border-white/10 
      backdrop-blur-xl shadow-lg transition">

        {/* Spinner */}
        <div className="flex justify-center mb-4 md:mb-6">
          <div className="w-8 h-8 md:w-10 md:h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>

        {/* Skeleton */}
        <div className="animate-pulse space-y-2 md:space-y-3">
          <div className="h-3 md:h-4 bg-gray-300 dark:bg-white/10 rounded w-3/4"></div>
          <div className="h-3 md:h-4 bg-gray-300 dark:bg-white/10 rounded"></div>
          <div className="h-3 md:h-4 bg-gray-300 dark:bg-white/10 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="mt-6 p-4 md:p-6 rounded-2xl 
    bg-white dark:bg-white/5 
    border border-gray-200 dark:border-white/10 
    backdrop-blur-xl shadow-xl 
    hover:shadow-purple-500/20 
    transition-all duration-300">

      {/* DESCRIPTION */}
      <div className="mb-5 md:mb-6">
        <h2 className="font-semibold mb-2 text-gray-900 dark:text-gray-200 
        text-base md:text-lg flex items-center gap-2">
          📝 Description
        </h2>

        <p className="text-gray-700 dark:text-gray-300 
        leading-relaxed text-sm md:text-base">
          {result.description}
        </p>

        <button
          onClick={() => copyText(result.description, "desc")}
          className="mt-3 w-full md:w-auto 
          bg-purple-500 hover:bg-purple-600 
          text-white px-4 py-2 rounded-xl 
          transition transform hover:scale-105 
          text-sm shadow-md"
        >
          {copied === "desc" ? "Copied ✅" : "📋 Copy Description"}
        </button>
      </div>

      {/* CAPTION */}
      <div className="mb-5 md:mb-6">
        <h2 className="font-semibold mb-2 text-gray-900 dark:text-gray-200 
        text-base md:text-lg flex items-center gap-2">
          📢 Caption
        </h2>

        <p className="text-purple-500 font-medium text-sm md:text-base">
          {result.caption}
        </p>

        <button
          onClick={() => copyText(result.caption, "cap")}
          className="mt-3 w-full md:w-auto 
          bg-blue-500 hover:bg-blue-600 
          text-white px-4 py-2 rounded-xl 
          transition transform hover:scale-105 
          text-sm shadow-md"
        >
          {copied === "cap" ? "Copied ✅" : "📋 Copy Caption"}
        </button>
      </div>

      {/* HASHTAGS */}
      {result.hashtags && (
        <div>
          <h2 className="font-semibold mb-2 text-gray-900 dark:text-gray-200 
          text-base md:text-lg flex items-center gap-2">
            🏷️ Hashtags
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base break-words">
            {result.hashtags}
          </p>

          <button
            onClick={() => copyText(result.hashtags, "hash")}
            className="mt-3 w-full md:w-auto 
            bg-green-500 hover:bg-green-600 
            text-white px-4 py-2 rounded-xl 
            transition transform hover:scale-105 
            text-sm shadow-md"
          >
            {copied === "hash" ? "Copied ✅" : "📋 Copy Hashtags"}
          </button>
        </div>
      )}
    </div>
  );
}