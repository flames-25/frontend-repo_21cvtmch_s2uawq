import React from 'react';
import { motion } from 'framer-motion';
import { Coins, Terminal, Package, PawPrint } from 'lucide-react';

export default function DashboardCards({ stats }) {
  const { coins = 0, commands = 0, items = 0, animals = 0 } = stats || {};
  const cards = [
    { label: 'Coins Gained', value: coins, icon: Coins, color: 'from-amber-400 to-orange-500' },
    { label: 'Commands Sent', value: commands, icon: Terminal, color: 'from-sky-400 to-blue-600' },
    { label: 'Items Found', value: items, icon: Package, color: 'from-emerald-400 to-teal-600' },
    { label: 'Animals Caught', value: animals, icon: PawPrint, color: 'from-fuchsia-400 to-purple-600' },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c, i) => (
        <motion.div
          key={c.label}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: i * 0.08, type: 'spring', stiffness: 300, damping: 24 }}
          className="p-4 rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-sm"
        >
          <div className={`w-9 h-9 rounded-md bg-gradient-to-br ${c.color} text-white flex items-center justify-center mb-3`}>
            <c.icon size={18} />
          </div>
          <div className="text-2xl font-semibold tracking-tight">{new Intl.NumberFormat().format(c.value)}</div>
          <div className="text-xs text-zinc-500 mt-1">{c.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
