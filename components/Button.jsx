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
  clickAnimation = true,
  loadingText = "",
  size = 2,
  icon = false,
  outline = false,
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
      whileTap={clickAnimation ? (isLoading ? {} : { scale: 0.96 }) : {}}
      transition={{ duration: 0.1, ease: "easeIn" }}
      aria-busy={isLoading}
      aria-disabled={isLoading}
      disabled={disabled || isLoading}
      data-color={color}
      data-icon={icon}
      data-outline={outline}
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
