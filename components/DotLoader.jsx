"use client";

import { motion } from "framer-motion";
import "@/css/DotLoader.css";

export default function DotLoader({ count = 3, size = 2, ...props }) {
  const dots = Array.from({ length: count });

  return (
    <motion.div className="dot-loader-wrapper" aria-hidden={true}>
      {dots.map((_, index) => (
        <motion.span
          key={index}
          className="dot-loader"
          style={{
            width: 4 * size,
            height: 4 * size,
            marginRight: index < count - 1 ? 2 * size : 0
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 0.8,
            ease: "linear",
            repeat: Infinity,
            repeatDelay: 0.8,
            repeatType: "loop",
            delay: (index / count),
          }}
          {...props}
        />
      ))}
    </motion.div>
  );
}
