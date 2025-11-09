import React from 'react';
import Header from './components/Header';
import Hero3D from './components/Hero3D';
import DashboardCards from './components/DashboardCards';
import TokenTable from './components/TokenTable';
import LogViewer from './components/LogViewer';
import { grinder } from './utils/grinder';

export default function App() {
  const [tokens, setTokens] = React.useState([]);
  const [logs, setLogs] = React.useState([]);
  const [aggregate, setAggregate] = React.useState({ coins: 0, commands: 0, items: 0, animals: 0 });
  const statsRef = React.useRef(new Map()); // token -> stats

  React.useEffect(() => {
    const offLog = grinder.on('log', (entry) => setLogs((l) => [entry, ...l].slice(0, 250)));
    const offStatus = grinder.on('status', ({ token, active }) => {
      setTokens((prev) => prev.map((t) => (t.token === token ? { ...t, active } : t)));
    });
    const offStats = grinder.on('stats', ({ token, delta }) => {
      const current = statsRef.current.get(token) || { coins: 0, commands: 0, items: 0, animals: 0, catches: 0 };
      const next = {
        ...current,
        coins: (current.coins || 0) + (delta.coins || 0),
        commands: (current.commands || 0) + (delta.commands || 0),
        items: (current.items || 0) + (delta.items || 0),
        animals: (current.animals || 0) + (delta.animals || 0),
        catches: (current.catches || 0) + (delta.catches || 0),
      };
      statsRef.current.set(token, next);
      // recompute aggregate
      const agg = { coins: 0, commands: 0, items: 0, animals: 0 };
      for (const s of statsRef.current.values()) {
        agg.coins += s.coins || 0;
        agg.commands += s.commands || 0;
        agg.items += s.items || 0;
        agg.animals += s.animals || 0;
      }
      setAggregate(agg);
    });
    return () => {
      offLog?.();
      offStatus?.();
      offStats?.();
    };
  }, []);

  const handleAdd = (token, channelId) => {
    const entry = grinder.addToken(token, channelId);
    setTokens((prev) => [...prev, entry]);
  };

  const handleToggle = (index) => {
    setTokens((prev) => {
      const t = prev[index];
      if (!t) return prev;
      if (t.active) {
        grinder.stopToken(t.token);
        return prev.map((x, i) => (i === index ? { ...x, active: false } : x));
      } else {
        grinder.startToken(t.token, t.channelId);
        return prev.map((x, i) => (i === index ? { ...x, active: true } : x));
      }
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <Hero3D />

        <DashboardCards stats={aggregate} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TokenTable tokens={tokens} onAdd={handleAdd} onToggle={handleToggle} />
          </div>
          <div className="lg:col-span-1">
            <LogViewer logs={logs} />
          </div>
        </div>
      </main>
    </div>
  );
}
