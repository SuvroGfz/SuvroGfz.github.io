import { motion } from "framer-motion";

/**
 * A glowing horizontal divider between sections.
 * Gradient line from transparent → emerald → transparent with a blur glow beneath.
 */
export default function GlowDivider() {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative max-w-4xl mx-auto my-4"
    >
      <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent blur-sm animate-glow-pulse" />
    </motion.div>
  );
}
