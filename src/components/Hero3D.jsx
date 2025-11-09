import Spline from "@splinetool/react-spline";
import { motion } from "framer-motion";

export default function Hero3D() {
  return (
    <div className="relative h-[280px] md:h-[360px] w-full overflow-hidden rounded-2xl ring-1 ring-gray-100 shadow-sm">
      <Spline scene="https://prod.spline.design/6l4g8Xv0s-tmp/scene.splinecode" style={{ width: "100%", height: "100%" }} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent"
      />
      <div className="pointer-events-none absolute bottom-4 left-4">
        <motion.h2
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
          className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900"
        >
          Farm smarter, not harder.
        </motion.h2>
        <motion.p
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.35 }}
          className="text-gray-600"
        >
          Sleek dashboard UI for multi-token grinding.
        </motion.p>
      </div>
    </div>
  );
}
