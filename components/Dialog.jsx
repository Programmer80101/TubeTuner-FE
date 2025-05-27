"use client";

import { FaXmark } from "react-icons/fa6";
import { useCallback, useEffect, useId, useRef } from 'react';
import { FocusTrap } from "focus-trap-react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/Button";
import "@/css/Dialog.css";

const backdropVariants = {
  hidden: { opacity: 0, filter: "blur(0px)" },
  visible: { opacity: 1, filter: "blur(2px)" },
};

const dialogVariants = {
  hidden: { opacity: 0, scale: 0.90 },
  visible: { opacity: 1, scale: 1 },
};


export default function Dialog({
  isOpen,
  onClose,
  title,
  children,
  showCornerCloseButton = true,
  closeOnOverlayClick = true,
}) {
  const id = useId();
  const labelId = `dialog-label=${id}`;
  const lastFocusedRef = useRef(null);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleKey = (e) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      handleClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      lastFocusedRef.current = document.activeElement;
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKey);
    } else {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
      lastFocusedRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <FocusTrap
          focusTrapOptions={{ clickOutsideDeactivates: closeOnOverlayClick }}
        >
          <div
            className="dialog-wrapper"
            data-open={isOpen}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelId}
          >
            <motion.div
              className="dialog-box"
              variants={dialogVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.3 }}
              key="dialog"
            >
              {showCornerCloseButton && (
                <Button
                  type="button"
                  title="Close Dialog"
                  className="dialog-close-button"
                  onClick={handleClose}
                  aria-label="Close Dialog"
                  aria-hidden="true"
                  tabIndex={0}
                  color="transparent"
                >
                  <FaXmark />
                </Button>
              )}
              <h2 id={labelId} className="dialog-title">{title}</h2>
              {children}
            </motion.div>
            <motion.div
              className="dialog-overlay"
              onClick={closeOnOverlayClick ? handleClose : undefined}
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.3 }}
              key="overlay"
            >
            </motion.div>
          </div>
        </FocusTrap>
      )}
    </AnimatePresence>
  );
}
