"use client";

import { FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useId, useState, useRef } from 'react';
import useClickOutside from "@/hooks/useClickOutside";
import Button from "@/components/Button";
import "@/css/Popover.css";

const containerVariants = {
  hidden: {
    y: -10,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
  }
};

export default function Popover({ trigger, className = "", children, ...props }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const id = useId();

  const labelId = `popover-label-${id}`;
  const controlId = `popover-controls-${id}`;

  useClickOutside(containerRef, () => setIsOpen(false));

  const togglePopover = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className="popover-wrapper"
      ref={containerRef}
    >
      <Button
        id={labelId}
        ref={triggerRef}
        color="blue"
        title="Popover"
        className="popover-button"
        onClick={togglePopover}
        aria-label="Popover"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={controlId}
      >
        {trigger}
        <FiChevronDown className={isOpen ? "rotate-180" : ""} />
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={controlId}
            tabIndex={-1}
            role="dialog"
            className={"popover-content " + className}
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={containerVariants}
            transition={{ duration: 0.2, ease: 'easeIn' }}
            aria-labelledby={labelId}
            aria-modal="true"
            {...props}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
