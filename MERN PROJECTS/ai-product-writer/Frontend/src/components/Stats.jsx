import { motion } from "framer-motion";

const stats = [
  {
    title: "2.4k+",
    subtitle: "Descriptions Generated",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "580+",
    subtitle: "Active Shops",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "4.9★",
    subtitle: "Average Rating",
    color: "from-yellow-400 to-orange-500",
  },
];

export default function Stats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
      {stats.map((item, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2 }}
          className="relative p-[1px] rounded-xl"
        >
          {/* 🔥 Gradient Glow */}
          <div
            className={`absolute inset-0 rounded-xl blur opacity-40 bg-gradient-to-r ${item.color}`}
          ></div>

          {/* 🔥 Card */}
          <div
            className="relative rounded-xl 
            p-4 md:p-6 text-center backdrop-blur-xl
            bg-gray-100 dark:bg-[#0f172a]
            border border-gray-300 dark:border-white/10
            transition-all duration-300"
          >
            {/* TITLE */}
            <h2
              className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
            >
              {item.title}
            </h2>

            {/* SUBTITLE */}
            <p className="mt-2 text-xs md:text-sm 
            text-gray-600 dark:text-gray-400">
              {item.subtitle}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}