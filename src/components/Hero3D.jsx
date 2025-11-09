import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function Hero3D() {
  return (
    <section className="relative h-[280px] sm:h-[360px] w-full overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950">
      <Spline style={{ width: '100%', height: '100%' }} scene="https://prod.spline.design/9t5wZJ2PN9b8QO0m/scene.splinecode" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/70 dark:from-zinc-900/40 dark:to-zinc-900/80" />

      <div className="absolute inset-0 flex items-end p-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="backdrop-blur-md bg-white/50 dark:bg-zinc-900/40 rounded-xl p-4 sm:p-5 border border-black/5 dark:border-white/10"
        >
          <h2 className="text-xl sm:text-2xl font-semibold">Automate. Monitor. Optimize.</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl mt-1">
            Connect multiple tokens and keep an eye on commands, balances, and catches in real-time. Start and stop cycles with one click.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
