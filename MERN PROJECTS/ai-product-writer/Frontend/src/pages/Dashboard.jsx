import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [history, setHistory] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔥 FETCH
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setHistory(data);
      } catch {
        toast.error("Failed to load history");
      }
    };

    fetchHistory();
  }, []);

  // 🔥 DELETE
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:5000/history/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHistory((prev) => prev.filter((item) => item._id !== id));
      toast.success("Deleted ✅");
    } catch {
      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 CLEAR ALL
  const handleClearAll = async () => {
    if (!confirm("Clear all history?")) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      await fetch("http://localhost:5000/history", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHistory([]);
      toast.success("All history cleared 🧹");
    } catch {
      toast.error("Clear failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 COPY
  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success("Copied ✅");

    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="px-4 md:px-6 py-10 md:py-12 max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard 🚀
        </h1>

        {history.length > 0 && (
          <button
            onClick={handleClearAll}
            disabled={loading}
            className="w-full md:w-auto bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition disabled:opacity-50 text-sm md:text-base"
          >
            {loading ? "Processing..." : "Clear All"}
          </button>
        )}
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-12">
        {[
          { label: "Descriptions", value: history.length },
          { label: "Status", value: "Active" },
          { label: "Plan", value: "Free" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white dark:bg-white/5 
            border border-gray-200 dark:border-white/10 
            p-4 md:p-6 rounded-xl 
            shadow-sm hover:shadow-purple-500/20 
            transition-all duration-300"
          >
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              {item.value}
            </h2>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* HISTORY */}
      <div className="space-y-4 md:space-y-6">
        {history.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-10 text-sm md:text-base">
            😔 No history yet <br />
            Start generating something!
          </div>
        ) : (
          history.map((item, index) => (
            <div
              key={item._id}
              className="bg-white dark:bg-white/5 
              border border-gray-200 dark:border-white/10 
              p-4 md:p-5 rounded-xl 
              shadow-md hover:shadow-purple-500/20 
              hover:scale-[1.02] 
              transition-all duration-300"
            >
              {/* Description */}
              <p className="mb-3 text-gray-800 dark:text-gray-200 text-sm md:text-base">
                {item.description}
              </p>

              {/* Caption */}
              <p className="text-purple-500 mb-2 text-sm md:text-base">
                {item.caption}
              </p>

              {/* Hashtags */}
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-4 break-words">
                {item.hashtags}
              </p>

              {/* ACTIONS */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={() => handleCopy(item.caption, index)}
                  className="w-full sm:w-auto bg-green-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-green-600 transition"
                >
                  {copiedIndex === index ? "Copied ✅" : "Copy"}
                </button>

                <button
                  onClick={() => handleDelete(item._id)}
                  disabled={loading}
                  className="w-full sm:w-auto bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-600 transition disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}