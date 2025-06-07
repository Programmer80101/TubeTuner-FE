"use client";

import { FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useId } from "react";
import useToggle from "@/hooks/useToggle";
import Button from "@/components/Button";
import "@/css/Accordion.css";

const contentVariants = {
  hidden: { opacity: 0, y: -5, height: 0 },
  visible: { opacity: 1, y: 0, height: "auto" }
}

export default function Accordion({ title, children }) {
  const [isOpen, toggleOpen] = useToggle(false);
  const id = useId();

  const controlId = `accordion-control-${id}`
  const buttonId = `accordion-button-${id}`

  return (
    <div className="accordion-wrapper">
      <Button
        id={buttonId}
        title={title}
        className="accordion-button"
        onClick={() => toggleOpen()}
        clickAnimation={false}
        aria-label={title}
        aria-expanded={isOpen}
        aria-controls={controlId}
      >
        {title}
        <motion.span
          className="accordion-icon"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeIn" }}
          aria-hidden={true}
        >
          <FiChevronDown className="icon text-xl" aria-hidden={true} />
        </motion.span>
      </Button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={controlId}
            className="accordion-content"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3, ease: "easeIn" }}
            aria-labelledby={buttonId}
            role="region"
          >
            <div className="accordion-children">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
