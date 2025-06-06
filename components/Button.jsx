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
  showLoadingAnimation = true,
  size = 2,
  icon = false,
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
      whileTap={clickAnimation ? (isLoading ? {} : { scale: 0.98 }) : {}}
      transition={{ duration: 0.1, ease: "easeIn" }}
      aria-busy={isLoading}
      aria-disabled={isLoading}
      disabled={disabled || isLoading}
      data-color={color}
      data-icon={icon}
      {...props}
    >
      {
        (isLoading && showLoadingAnimation) ? (
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
