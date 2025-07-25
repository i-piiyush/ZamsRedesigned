import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const TextSlidingOpacity = ({ text, className }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "start 0.3"],
  });

  // Split into words & preserve whitespace
  const words = text.split(/(\s+)/);

  return (
    <div ref={ref} className={className} style={{ lineHeight: "1" }}>
      {words.map((word, i) => {
        const total = words.length;
        const step = 1 / total;
        const start = i * step;
        const end = start + step;

        const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);

        return (
          <motion.span
            key={i}
            style={{
              opacity,
              display: "inline",
              whiteSpace: "normal", // prevents overflow
            }}
          >
            {word}
          </motion.span>
        );
      })}
    </div>
  );
};

export default TextSlidingOpacity;
