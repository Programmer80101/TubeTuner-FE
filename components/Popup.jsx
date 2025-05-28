"use client";

import { FaXmark } from "react-icons/fa6";
import { useCallback, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import "@/css/Popup.css";

const popupVariants = {
  hidden: { opacity: 0, y: -20, filter: "blur(1px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
}

export default function Popup({ id, color = "neutral", removePopup, children }) {
  const popupDurationMs = 3000;
  const updatesPerSecond = 10;
  const tickIntervalMs = 1000 / updatesPerSecond;

  const [timeLeft, setTimeLeft] = useState(popupDurationMs);
  const [isPaused, setIsPaused] = useState(false);
  const progressRef = useRef(null);

  const handleClose = useCallback(() => removePopup(id), [id, removePopup]);

  useEffect(() => {
    function tick() {
      setTimeLeft(prev => Math.max(prev - tickIntervalMs, 0));
      if (!isPaused) {
        progressRef.current = setTimeout(tick, tickIntervalMs);
      }
    }

    progressRef.current = setTimeout(tick, tickIntervalMs);

    return () => clearTimeout(progressRef.current);
  }, [isPaused, tickIntervalMs, handleClose]);

  useEffect(() => {
    if (timeLeft === 0) removePopup(id);
  }, [timeLeft, removePopup, id]);

  return (
    <motion.div
      className="popup"
      data-popup-color={color}
      variants={popupVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.3, ease: "easeIn" }}
      layout
      onHoverStart={() => setIsPaused(true)}
      onHoverEnd={() => setIsPaused(false)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <span className="popup-content">{children}</span>
      <Button
        type="button"
        className="popup-close-button"
        onClick={() => handleClose()}
        title="Close Popup"
        aria-label="Close Popup"
        aria-hidden="true"
        color="transparent"
        icon={true}
      >
        <FaXmark />
      </Button>
      <div
        className="popup-progress"
        style={{
          width: `${(timeLeft / popupDurationMs) * 100}%`
        }}
      >
      </div>
    </motion.div>
  );
}