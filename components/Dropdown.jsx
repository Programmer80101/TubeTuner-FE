"use client";

import { FiChevronDown, FiCheck } from "react-icons/fi";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useId } from 'react';
import { createPortal } from "react-dom";

import useClickOutside from "@/hooks/useClickOutside";
import Button from "@/components/Button";
import "@/css/Dropdown.css";

const containerVariants = {
  hidden: {
    y: -10,
    scale: 0.9,
    opacity: 0,
  },

  show: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: -16 },
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
  cols = 1,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState(null);
  const containerRef = useRef(null);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const id = useId();

  const controlId = `dropdown-control-${id}`;
  const labelId = `dropdown-label-${id}`;

  const dropdownRoot = typeof document !== "undefined"
    ? document.getElementById("dropdown-root")
    : null

  const toggleOpen = () => {
    if (!isOpen) {
      document.getElementById(`dropdown-item-${id}-${value}`)?.focus();
    }

    const rect = buttonRef.current?.getBoundingClientRect();
    setCoords({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
    setIsOpen(prev => !prev);
    buttonRef.current?.focus();
  };

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const dropdownList = (
    <motion.ul
      ref={dropdownRef}
      id={controlId}
      tabIndex={-1}
      className="dropdown-list"
      initial="hidden"
      animate="show"
      exit="hidden"
      style={{
        position: 'absolute',
        top: coords?.top,
        left: coords?.left,
        width: width,
      }}
      variants={containerVariants}
      transition={{ duration: 0.2, ease: 'easeIn' }}
      aria-labelledby={labelId}
      role="listbox"
      data-cols={cols}
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
  )

  return (
    <div className="dropdown-wrapper" ref={containerRef}>
      <div className="dropdown-label">
        <label htmlFor={labelId}>
          {label}
        </label>
      </div>
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
        {options[value]}
        <FiChevronDown className={isOpen ? "rotate-180" : ""} />
      </Button>
      {
        dropdownRoot
        && createPortal(
          <AnimatePresence>
            {isOpen && dropdownList}
          </AnimatePresence>,
          dropdownRoot
        )
      }
    </div>
  );
}
