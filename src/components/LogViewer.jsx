import { useMemo, useState } from "react";
import { motion } from "framer-motion";

const levels = ["info", "success", "error"];

export default function LogViewer() {
  const [filter, setFilter] = useState("all");
  const [logs] = useState(() => {
    const base = [
      { id: 1, level: "success", message: "Token NovaCat hunted a duck", timestamp: Date.now() - 1000 * 60 },
      { id: 2, level: "info", message: "Cycle completed (3 commands)", timestamp: Date.now() - 1000 * 120 },
      { id: 3, level: "error", message: "Rate limited, backing off 30s", timestamp: Date.now() - 1000 * 240 },
      { id: 4, level: "success", message: "+250 coins from beg", timestamp: Date.now() - 1000 * 500 },
    ];
    return base;
  });

  const filtered = useMemo(() => (filter === "all" ? logs : logs.filter((l) => l.level === filter)), [filter, logs]);

  return (
    <div className="rounded-2xl bg-white ring-1 ring-gray-100 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-medium text-gray-900">Activity Logs</h3>
        <div className="flex items-center gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
          >
            <option value="all">All</option>
            {levels.map((l) => (
              <option key={l} value={l} className="capitalize">
                {l}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ul className="max-h-72 overflow-y-auto divide-y divide-gray-100">
        {filtered.map((log) => (
          <motion.li
            key={log.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 text-sm"
          >
            <div className="flex items-center justify-between">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                  log.level === "success"
                    ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                    : log.level === "error"
                    ? "bg-rose-50 text-rose-700 ring-1 ring-rose-200"
                    : "bg-sky-50 text-sky-700 ring-1 ring-sky-200"
                }`}
              >
                {log.level}
              </span>
              <span className="text-gray-400">
                {new Date(log.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <p className="mt-2 text-gray-700">{log.message}</p>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
