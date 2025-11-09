import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Play, Square, PlusCircle, ShieldAlert } from 'lucide-react';

export default function TokenTable({ tokens, onAdd, onToggle }) {
  const [tokenInput, setTokenInput] = React.useState('');
  const [channelInput, setChannelInput] = React.useState('');

  const masked = (t) => (t ? `${t.slice(0, 4)}...${t.slice(-4)}` : '—');
  const rows = useMemo(() => tokens || [], [tokens]);

  return (
    <div className="rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-zinc-900 overflow-hidden">
      <div className="px-4 py-3 border-b border-black/5 dark:border-white/10 flex items-center justify-between">
        <div>
          <div className="font-medium">Tokens</div>
          <div className="text-xs text-zinc-500">Manage connected tokens and start/stop automation</div>
        </div>
        <div className="flex gap-2 items-center">
          <input
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            placeholder="Discord token"
            className="px-3 py-2 text-sm rounded-md border border-black/10 dark:border-white/10 bg-transparent focus:outline-none"
          />
          <input
            value={channelInput}
            onChange={(e) => setChannelInput(e.target.value)}
            placeholder="Channel ID"
            className="px-3 py-2 text-sm rounded-md border border-black/10 dark:border-white/10 bg-transparent focus:outline-none"
          />
          <button
            onClick={() => {
              if (!tokenInput || !channelInput) return;
              onAdd?.(tokenInput.trim(), channelInput.trim());
              setTokenInput('');
              setChannelInput('');
            }}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
          >
            <PlusCircle size={16} /> Add
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-zinc-500">
            <tr className="border-b border-black/5 dark:border-white/10">
              <th className="px-4 py-2">Token</th>
              <th className="px-4 py-2">Channel</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-zinc-500">
                  <div className="inline-flex items-center gap-2">
                    <ShieldAlert size={16} /> No tokens yet. Add one to get started.
                  </div>
                </td>
              </tr>
            )}
            {rows.map((t, i) => (
              <motion.tr
                key={`${t.token}-${i}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="border-b border-black/5 dark:border-white/10"
              >
                <td className="px-4 py-3 font-mono">{masked(t.token)}</td>
                <td className="px-4 py-3">{t.channelId || '—'}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs ${t.active ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'}`}>
                    {t.active ? 'Running' : 'Stopped'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end">
                    <button
                      onClick={() => onToggle?.(i)}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-white ${t.active ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                    >
                      {t.active ? <Square size={16} /> : <Play size={16} />} {t.active ? 'Stop' : 'Start'}
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
