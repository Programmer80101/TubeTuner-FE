"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React, { useRef, useState, useEffect } from "react";

export default function Hero({ children }) {
  const [beams, setBeams] = useState([]);

  const containerRef = useRef(null);
  const parentRef = useRef(null);

  useEffect(() => {
    const generateBeam = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const newBeams = Array.from({ length: Math.ceil(Math.random() * 2) }).map(() => ({
        id: Date.now() + Math.random(),
        initialX: Math.random() * containerWidth,
        duration: Math.random() * 25 + 10,
        height: Math.floor(Math.random() * 30 + 20),
        delay: Math.random() * 5,
      }));

      setBeams((prevBeams) => [...prevBeams, ...newBeams]);
    };

    const beamInterval = setInterval(generateBeam, 1000);

    return () => clearInterval(beamInterval);
  }, []);

  useEffect(() => {
    const cleanupBeams = () => {
      setBeams((prevBeams) =>
        prevBeams.filter((beam) => {
          const beamElement = document.querySelector(`[data-id="${beam.id}"]`);
          if (beamElement) {
            const rect = beamElement.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();
            return rect.top <= containerRect.bottom;
          }
          return false;
        })
      );
    };

    const cleanupInterval = setInterval(cleanupBeams, 1000);

    return () => clearInterval(cleanupInterval);
  }, [beams]);

  return (
    <div
      ref={parentRef}
      className={cn(
        "bg-gradient-to-b from-0% from-sky-100 via-10% via-white to-100% to-purple-200 relative overflow-hidden"
      )}>
      {beams.map((beam) => (
        <Beam
          key={beam.id}
          beamOptions={beam}
          containerRef={containerRef}
          parentRef={parentRef} />
      ))}
      {children}
      <div
        ref={containerRef}
        className="absolute bottom-0 bg-neutral-100 w-full inset-x-0 pointer-events-none"
        style={{
          boxShadow:
            "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
        }}></div>
    </div>
  );
};

function Beam({ beamOptions = {} }) {
  const beamRef = useRef(null);

  return (
    <motion.div
      ref={beamRef}
      data-id={beamOptions.id}
      animate="animate"
      initial={{
        translateY: "-200px",
        translateX: beamOptions.initialX || "0px",
        height: beamOptions.height,
      }}
      variants={{
        animate: {
          translateY: "2500px",
        },
      }}
      transition={{
        duration: beamOptions.duration,
        delay: beamOptions.delay,
        ease: "linear",
      }}
      className={cn(
        "absolute left-0 top-20 m-auto h-14 w-px rounded-full bg-gradient-to-t from-indigo-500 via-purple-500 to-transparent"
      )} />
  );
}

Beam.displayName = "Beam";
