import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Section2 = () => {
  const navigate = useNavigate()
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Conservative animations that won't affect layout
  const containerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const containerY = useTransform(scrollYProgress, [0, 1], [40, 0]);

  // Text animation (doesn't affect layout)
  const firstLineY = useTransform(scrollYProgress, [0, 0.3], [30, 0]);
  const secondLineY = useTransform(scrollYProgress, [0, 0.4], [40, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  // Image animation (doesn't affect layout)
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);

  return (
    <div
      ref={sectionRef}
      className="w-full flex justify-center items-center relative h-[60vh]"
    >
      <motion.div 
        className="w-[90%] h-full absolute -top-[20%] z-[30] flex flex-col"
        style={{
          opacity: containerOpacity,
          y: containerY
        }}
      >
        {/* Text Section - EXACTLY matches your original */}
        <div className="w-full flex justify-end h-[40%] bg-secondary">
          <div className="w-full md:w-[70%] h-full flex justify-center md:justify-start items-center md:items-end px-5">
            <div className="font-extrabold text-3xl md:text-[5vw] xl:text-[4rem] text-center md:text-left leading-[1] tracking-tight">
              <motion.div 
                style={{ y: firstLineY, opacity: textOpacity }}
                className="block"
              >
                BROWSE OUR
              </motion.div>
              <motion.div 
                style={{ y: secondLineY, opacity: textOpacity }}
                className="block"
              >
                LATEST COLLECTIONS
              </motion.div>
            </div>
          </div>
        </div>

        {/* Image Section - EXACT original structure */}
        <div className="w-full h-[60%] flex flex-col bg-secondary justify-center items-center gap-5">
          <div className="w-[90%] h-[70%] relative bg-primary">
            <motion.img
              src="src/assets/micky.png"
              alt="image"
              style={{ scale: imageScale }}
              className="object-cover absolute left-0 bottom-0 h-[140%] md:h-[190%] img-filter"
            />

            <Button
              text={"shop now"}
              className="hidden md:block md:absolute top-1/2 -translate-y-1/2 right-[25%] scale-120 xl:scale-150"
            />
          </div>
          <Button text={"shop now"} className="md:hidden" />
        </div>
      </motion.div>
    </div>
  );
};

export default Section2;