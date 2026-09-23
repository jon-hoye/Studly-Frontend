"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BlurInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  blur?: string;
  className?: string;
}

export default function BlurIn({
  children,
  delay = 0,
  duration = 0.7,
  yOffset = 18,
  blur = "10px",
  className,
}: BlurInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: `blur(${blur})`, y: yOffset }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
