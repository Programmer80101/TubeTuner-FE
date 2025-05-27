"use client";

import { motion } from "framer-motion";
import DotLoader from "@/components/DotLoader";
import "@/css/Button.css";

export default function Button({
  children,
  color = "",
  onClick,
  disabled = false,
  isLoading = false,
  loadingText = "",
  size = 2,
  ...props
}) {
  const handleClick = (e) => {
    if (!isLoading && typeof onClick === "function") {
      onClick(e);
    }
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileTap={isLoading ? {} : { scale: 0.98 }}
      transition={{ duration: 0.1, ease: "easeIn" }}
      aria-busy={isLoading}
      aria-disabled={isLoading}
      disabled={disabled || isLoading}
      data-button="true"
      data-color={color}
      {...props}
    >
      {
        isLoading ? (
          <div className="button-loader-wrapper">
            <DotLoader size={size} />
            <span>
              {loadingText || children}
            </span>
          </div>
        ) : (
          <>
            {children}
          </>
        )
      }
    </motion.button >
  );
}
