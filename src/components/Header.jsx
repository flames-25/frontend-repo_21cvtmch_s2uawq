import { Rocket, Settings, User } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between py-4 px-6">
      <div className="flex items-center gap-3">
        <motion.div
          initial={{ rotate: -20, scale: 0.9 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 text-white shadow-lg"
        >
          <Rocket className="h-6 w-6" />
        </motion.div>
        <div>
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-gray-900">
            Nebula Grinder
          </h1>
          <p className="text-xs md:text-sm text-gray-500 -mt-0.5">
            Multi-token dashboard (demo UI)
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white/70 px-3 py-2 text-sm text-gray-700 hover:bg-white transition">
          <Settings className="h-4 w-4" />
          Settings
        </button>
        <button className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 p-2 text-gray-700 hover:bg-white transition">
          <User className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
