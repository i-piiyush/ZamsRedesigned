import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import BlurText from "./BlurText";

const PageTransitions = ({text,animateBy,delay}) => {
  const [show, setShow] = useState(true);
  const lineRef = useRef(null);

  useEffect(() => {
    // Animate line grow
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: "power3.inOut", delay: 0.6 }
      );
    }
    // Hide transition after 2.1s
    const t = setTimeout(() => setShow(false), 2100);
    return () => clearTimeout(t);
  }, []);

  const handleAnimationComplete = () => {
  console.log('Animation completed!');
};

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-zinc-700 overflow-hidden z-[9999] flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Text without animation */}
          <BlurText
            text={text}
            delay={delay}
            animateBy={animateBy}
            direction="bottom"
            onAnimationComplete={handleAnimationComplete}
            className="text-7xl font-bold tracking-tighter mb-8 text-white"
          />
          {/* Animated Line */}
          <div
            className="w-24 h-1 bg-white origin-left scale-x-0"
            ref={lineRef}
            style={{ transformOrigin: "left" }}
          />
          {/* Minimal Label */}
          <div className="uppercase text-xs tracking-widest text-neutral-400 mt-4 font-mono">
            Zams Fashion
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageTransitions;
