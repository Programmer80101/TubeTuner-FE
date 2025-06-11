"use client";

import { FiChevronDown, FiCheck } from "react-icons/fi";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useId } from 'react';
import useClickOutside from "@/hooks/useClickOutside";
import Button from "@/components/Button";
import "@/css/Dropdown.css";

const containerVariants = {
  hidden: {
    y: -10,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0 }
};

export default function Dropdown({
  label = "",
  value = 0,
  setValue,
  width,
  options = [],
  disabled = false,
  ariaLabel = "label",
  inlineLabel = false
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const id = useId();

  const controlId = `dropdown-control-${id}`;
  const labelId = `dropdown-label-${id}`;

  const toggleOpen = () => {
    if (!isOpen) {
      document.getElementById(`dropdown-item-${id}-${value}`)?.focus();
    }

    setIsOpen(prev => !prev);
    buttonRef.current?.focus();
  };

  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <div
      className="dropdown-wrapper"
      ref={containerRef}
    >
      {!inlineLabel && (
        <div className="dropdown-label">
          <label htmlFor={labelId}>
            {label}
          </label>
        </div>
      )}
      <Button
        id={labelId}
        ref={buttonRef}
        type="button"
        title={label}
        onClick={toggleOpen}
        className="dropdown-button"
        clickAnimation={false}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={controlId}
        aria-disabled={disabled}
        disabled={disabled}
      >
        {(inlineLabel && label) && `: ${label}`}
        {options[value]}
        <FiChevronDown className={isOpen ? "rotate-180" : ""} />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            id={controlId}
            tabIndex={-1}
            className="dropdown-list"
            style={{ width: width }}
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={containerVariants}
            transition={{ duration: 0.2, ease: 'easeIn' }}
            aria-labelledby={labelId}
            role="listbox"
          >
            {options.map((option, index) => (
              <motion.li
                key={index}
                tabIndex={0}
                id={`dropdown-item-${id}-${index}`}
                className="dropdown-item"
                variants={itemVariants}
                transition={{ duration: 0.2, ease: 'easeIn' }}
                onClick={() => {
                  setValue && setValue(index);
                  setIsOpen(false);
                }}
                aria-selected={value === index}
                role="option"
              >
                {option}
                {option === options[value] && (
                  <FiCheck aria-hidden={true} className="dropdown-check" />
                )}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
