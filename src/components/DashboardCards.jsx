import { motion } from "framer-motion";
import { Coins, Activity, Package, BarChart3 } from "lucide-react";

const colorPresets = {
  coins: {
    badge: "from-yellow-400 to-amber-500",
    bg: "from-yellow-400/10 to-amber-500/10",
  },
  commands: {
    badge: "from-violet-500 to-indigo-500",
    bg: "from-violet-500/10 to-indigo-500/10",
  },
  items: {
    badge: "from-emerald-400 to-teal-500",
    bg: "from-emerald-400/10 to-teal-500/10",
  },
  animals: {
    badge: "from-sky-400 to-blue-500",
    bg: "from-sky-400/10 to-blue-500/10",
  },
};

const StatCard = ({ icon: Icon, label, value, preset, delay = 0 }) => {
  const colors = colorPresets[preset];
  return (
    <motion.div
      initial={{ y: 16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.45, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg}`} />
      <div className="relative p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{label}</p>
            <motion.p
              key={value}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="text-2xl font-semibold tracking-tight text-gray-900"
            >
              {value}
            </motion.p>
          </div>
          <div className={`rounded-xl p-3 bg-gradient-to-br ${colors.badge} text-white shadow-md`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function DashboardCards() {
  const summary = {
    coins: 128450,
    commands: 5421,
    items: 87,
    animals: 23,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard icon={Coins} label="Total Coins" value={summary.coins.toLocaleString()} preset="coins" />
      <StatCard icon={Activity} label="Commands Sent" value={summary.commands.toLocaleString()} preset="commands" delay={0.05} />
      <StatCard icon={Package} label="Items" value={summary.items} preset="items" delay={0.1} />
      <StatCard icon={BarChart3} label="Animals" value={summary.animals} preset="animals" delay={0.15} />
    </div>
  );
}
