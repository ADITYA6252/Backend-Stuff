import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// 🔥 CUSTOM DROPDOWN
function CustomSelect({ value, setValue, options, disabled }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      <div
        onClick={() => !disabled && setOpen(!open)}
        className={`p-3 rounded-lg 
        bg-white dark:bg-white/5 
        border border-gray-300 dark:border-white/10 
        cursor-pointer flex justify-between items-center 
        text-gray-800 dark:text-white text-sm md:text-base
        ${disabled && "opacity-50 cursor-not-allowed"}`}
      >
        <span>{value}</span>
        <span>⌄</span>
      </div>

      {open && (
        <div className="absolute w-full mt-2 
        bg-white dark:bg-[#0f172a] 
        border border-gray-200 dark:border-white/10 
        rounded-lg shadow-xl z-50 overflow-hidden">
          {options.map((item) => (
            <div
              key={item}
              onClick={() => {
                setValue(item);
                setOpen(false);
              }}
              className="p-3 hover:bg-purple-500/20 cursor-pointer transition text-gray-800 dark:text-white text-sm md:text-base"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function UploadForm({ onGenerate }) {
  const [drag, setDrag] = useState(false);
  const [name, setName] = useState("");
  const [tone, setTone] = useState("Professional");
  const [category, setCategory] = useState("General");
  const [language, setLanguage] = useState("English");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image);
    };
  }, [image]);

  const handleFile = (file) => {
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setImage(preview);
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      navigate("/login");
      return;
    }

    if (!name) return alert("Enter product name");

    setLoading(true);
    await onGenerate({ name, tone, category, language, file });
    setLoading(false);
  };

  return (
    <div className="relative">

      {/* LOCK */}
      {!token && (
        <div className="absolute inset-0 
        bg-black/60 backdrop-blur-sm 
        flex items-center justify-center 
        rounded-2xl z-10">
          <button
            onClick={() => navigate("/login")}
            className="bg-purple-600 px-4 md:px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition text-white text-sm md:text-base"
          >
            🔐 Login to Continue
          </button>
        </div>
      )}

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-white/5 
        border border-gray-200 dark:border-white/10 
        rounded-2xl p-4 md:p-6 backdrop-blur-xl shadow-xl transition"
      >

        {/* UPLOAD */}
        <motion.div
          whileHover={{ scale: token ? 1.02 : 1 }}
          onClick={() => token && inputRef.current.click()}
          className={`border-2 border-dashed rounded-xl 
          p-6 md:p-10 text-center transition
          ${drag ? "border-purple-400 bg-purple-500/10" : "border-gray-300 dark:border-white/20"}
          ${!token && "opacity-50 cursor-not-allowed"}`}
          onDragOver={(e) => {
            e.preventDefault();
            if (token) setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            if (token) handleFile(e.dataTransfer.files[0]);
          }}
        >
          <input
            type="file"
            ref={inputRef}
            hidden
            accept="image/*"
            onChange={(e) => handleFile(e.target.files[0])}
          />

          {image ? (
            <img
              src={image}
              alt="preview"
              className="w-24 h-24 md:w-32 md:h-32 object-cover mx-auto rounded-xl mb-3"
            />
          ) : (
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-3xl md:text-4xl mb-3"
            >
              📷
            </motion.div>
          )}

          <p className="text-base md:text-lg font-medium text-gray-800 dark:text-white">
            {image ? "Change image" : "Upload product image"}
          </p>
        </motion.div>

        {/* INPUTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-6">

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product name"
            disabled={!token}
            className="bg-white dark:bg-white/5 
            border border-gray-300 dark:border-white/10 
            p-3 rounded-lg 
            text-gray-800 dark:text-white 
            text-sm md:text-base
            outline-none focus:ring-2 focus:ring-purple-500"
          />

          <CustomSelect
            value={category}
            setValue={setCategory}
            disabled={!token}
            options={["General", "Clothing", "Food", "Electronics"]}
          />

          <CustomSelect
            value={language}
            setValue={setLanguage}
            disabled={!token}
            options={["English", "Hindi", "Hinglish"]}
          />

          <CustomSelect
            value={tone}
            setValue={setTone}
            disabled={!token}
            options={["Professional", "Funny", "Emotional"]}
          />
        </div>

        {/* BUTTON */}
        <motion.button
          type="submit"
          whileTap={{ scale: token ? 0.95 : 1 }}
          whileHover={{ scale: token ? 1.05 : 1 }}
          disabled={!token || loading}
          className="mt-6 w-full 
          bg-gradient-to-r from-purple-500 to-blue-500 
          py-3 rounded-xl font-semibold text-white shadow-md
          text-sm md:text-base"
        >
          {!token
            ? "🔒 Login Required"
            : loading
            ? "⏳ Generating..."
            : "🚀 Generate AI Description"}
        </motion.button>

      </motion.form>
    </div>
  );
}