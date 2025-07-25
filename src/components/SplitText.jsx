import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

// Fixed splitText function for words
const splitText = (text, splitType) => {
  if (splitType === "words") {
    const words = text.split(" ");
    return words.flatMap((word, idx) => [
      word,
      idx < words.length - 1 ? "\u00A0" : "", // non-breaking space
    ]);
  }
  if (splitType === "lines") return text.split("\n");
  return text.split("");
};

const SplitText = ({
  text,
  className = "",
  delay = 100,
  duration = 0.6,
  ease = "easeOut",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  onLetterAnimationComplete,
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef();
  const controls = useAnimation();

  useEffect(() => {
    if (!ref.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          controls.start("animate");
        }
      },
      { threshold }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [controls, threshold]);

  const items = splitText(text, splitType);
  const delaySec = delay / 1000;

  const variants = {
    initial: from,
    animate: to,
  };

  return (
    <p
      ref={ref}
      className={`split-parent overflow-hidden inline-block whitespace-normal ${className}`}
    >
      {items.map((item, i) => (
        <motion.span
          key={i}
          variants={variants}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          transition={{
            duration,
            ease,
            delay: i * delaySec,
          }}
          style={{
            display: "inline-block",
            willChange: "transform, opacity",
          }}
          onAnimationComplete={i === items.length - 1 ? onLetterAnimationComplete : undefined}
        >
          {splitType === "lines" ? (
            <>
              {item}
              <br />
            </>
          ) : (
            item
          )}
        </motion.span>
      ))}
    </p>
  );
};

export default SplitText;
