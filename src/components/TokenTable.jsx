import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Square, EyeOff, Eye } from "lucide-react";

const Masked = ({ value }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-sm text-gray-700">
        {show ? value : value.replace(/.(?=.{4})/g, "•")}
      </span>
      <button
        onClick={() => setShow((s) => !s)}
        className="p-1 rounded-md hover:bg-gray-100"
        aria-label={show ? "Hide" : "Show"}
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
};

export default function TokenTable() {
  const [tokens, setTokens] = useState([
    { id: "1", discord_name: "PixelFox#1234", alias: "Main", status: "inactive", token: "mfa.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" },
    { id: "2", discord_name: "NovaCat#7777", alias: "Farm-2", status: "active", token: "mfa.yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy" },
  ]);

  const toggle = (id) =>
    setTokens((t) => t.map((x) => (x.id === id ? { ...x, status: x.status === "active" ? "inactive" : "active" } : x)));

  return (
    <div className="rounded-2xl bg-white ring-1 ring-gray-100 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-medium text-gray-900">Tokens</h3>
        <button className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 px-3 py-2 text-sm text-white shadow">
          Add Token
        </button>
      </div>
      <div className="divide-y divide-gray-100">
        {tokens.map((t) => (
          <div key={t.id} className="p-4 grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
            <div>
              <p className="text-gray-900 font-medium">{t.discord_name}</p>
              <p className="text-xs text-gray-500">Alias: {t.alias}</p>
            </div>
            <div className="md:col-span-2">
              <Masked value={t.token} />
            </div>
            <div>
              <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                t.status === "active"
                  ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                  : "bg-gray-50 text-gray-700 ring-1 ring-gray-200"
              }`}>{t.status}</span>
            </div>
            <div className="flex items-center gap-2 justify-end">
              <button onClick={() => toggle(t.id)} className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white shadow ${
                t.status === "active" ? "bg-gray-700 hover:bg-gray-800" : "bg-indigo-600 hover:bg-indigo-700"
              }`}>
                {t.status === "active" ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {t.status === "active" ? "Stop" : "Start"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
