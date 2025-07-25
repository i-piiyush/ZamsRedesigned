import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

const Loader = () => {
  const [loading, setLoading] = useState(true);
  const textRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    // Text split letter animation
    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.07,
          delay: 0.25,
        }
      );
    }
    // Line expand animation
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: "power3.inOut", delay: 0.6 }
      );
    }
    // End loader after 2.1s
    const t = setTimeout(() => setLoading(false), 2100);
    return () => clearTimeout(t);
  }, []);

  // Helper: split text to spans for kinetic animation
  const BrandText = ({ text }) => (
    <span ref={textRef} className="inline-flex">
      {[...text].map((char, i) => (
        <span key={i} className="inline-block">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 bg-black z-[9998] flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Kinetic brand text */}
          <div className="text-white font-extrabold text-4xl md:text-6xl tracking-tight mb-3 select-none">
            <BrandText text="ZAMS" />
          </div>
          {/* Animated line */}
          <div className="w-24 h-1 bg-white origin-left scale-x-0" ref={lineRef} />
          {/* Minimal Loading Label */}
          <div className="uppercase text-xs tracking-widest text-neutral-400 mt-4 font-mono">
            Loading
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
