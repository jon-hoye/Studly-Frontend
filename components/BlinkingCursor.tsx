"use client";

import { motion } from "framer-motion";

interface BlinkingCursorProps {
  className?: string;
}

export default function BlinkingCursor({ className }: BlinkingCursorProps) {
  return (
    <motion.span
      animate={{ opacity: [1, 0, 1] }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      aria-hidden="true"
      className={
        className ??
        "inline-block text-blue-500 dark:text-[#3ba7ff] font-light ml-0.5 select-none"
      }
    >
      |
    </motion.span>
  );
}
