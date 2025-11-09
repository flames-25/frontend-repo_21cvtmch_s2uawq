import React from 'react';
import { Rocket, Settings, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <header className="w-full sticky top-0 z-20 backdrop-blur bg-white/60 dark:bg-zinc-900/60 border-b border-black/5 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <motion.div
          className="flex items-center gap-2"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
            <Rocket size={18} />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Discord Farming Dashboard</h1>
            <p className="text-xs text-zinc-500">Multi-token automation monitor</p>
          </div>
        </motion.div>

        <motion.div
          className="flex items-center gap-2"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 20 }}
        >
          <button className="px-3 py-2 rounded-md bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition text-sm inline-flex items-center gap-2">
            <Settings size={16} />
            Settings
          </button>
          <button className="px-3 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition text-sm inline-flex items-center gap-2">
            <User size={16} />
            Account
          </button>
        </motion.div>
      </div>
    </header>
  );
}
