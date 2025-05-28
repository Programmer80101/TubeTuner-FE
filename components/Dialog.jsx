"use client";

import { FaXmark } from "react-icons/fa6";
import React, { useCallback, useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FocusTrap } from "focus-trap-react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/Button";
import "@/css/Dialog.css";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const dialogVariants = {
  hidden: { opacity: 0, scale: 0.90 },
  visible: { opacity: 1, scale: 1 },
};

const MemoizedContent = React.memo(({ title, children, onClose, showCornerCloseButton }) => (
  <motion.div
    className="dialog-box"
    variants={dialogVariants}
    initial="hidden"
    animate="visible"
    exit="hidden"
    transition={{ duration: 0.3 }}
  >
    {showCornerCloseButton && (
      <Button
        type="button"
        className="dialog-close-button"
        onClick={onClose}
        aria-label="Close Dialog"
        color="transparent"
      >
        <FaXmark />
      </Button>
    )}
    <h2 className="dialog-title">{title}</h2>
    {children}
  </motion.div>
));

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

  const handleKey = useCallback(
    (e) => e.key === "Escape" && (e.stopPropagation(), onClose()),
    [onClose]
  );

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

  if (typeof document === "undefined") return null;

  return createPortal(
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
            <MemoizedContent
              title={title}
              onClose={onClose}
              showCornerCloseButton={showCornerCloseButton}
              children={children}
            />
            <motion.div
              className="dialog-overlay"
              onClick={closeOnOverlayClick ? onClose : undefined}
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
    </AnimatePresence>,
    document.body
  );
}
