import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';

export default function LogViewer({ logs }) {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return logs || [];
    return (logs || []).filter((l) => l.message.toLowerCase().includes(q));
  }, [logs, query]);

  return (
    <div className="rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-zinc-900 overflow-hidden">
      <div className="px-4 py-3 border-b border-black/5 dark:border-white/10 flex items-center justify-between">
        <div>
          <div className="font-medium">Activity</div>
          <div className="text-xs text-zinc-500">Real-time commands and updates</div>
        </div>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-zinc-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter logs"
            className="px-3 py-2 text-sm rounded-md border border-black/10 dark:border-white/10 bg-transparent focus:outline-none"
          />
        </div>
      </div>

      <div className="max-h-72 overflow-auto divide-y divide-black/5 dark:divide-white/10">
        {filtered.length === 0 && (
          <div className="px-4 py-8 text-center text-sm text-zinc-500">No activity yet.</div>
        )}
        {filtered.map((log, i) => (
          <motion.div
            key={`${log.ts}-${i}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.02 }}
            className="px-4 py-2 text-sm"
          >
            <span className="text-zinc-500 font-mono mr-2">[{new Date(log.ts).toLocaleTimeString()}]</span>
            <span>{log.message}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
