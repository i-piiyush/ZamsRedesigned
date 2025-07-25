import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Button = ({ text, className = "" }) => {
  const navigate = useNavigate()
  // Each arrow: 40px wide. Center text: 100px wide. Gap: 6px between items.
  const arrowWidth = 40;
  const textWidth = 100;
  const gap = 6; // px
  const paddingX = 4; // px
  const buttonHeight = 48;

  // BUTTON total: contents width + padding on both sides
  const buttonWidth = arrowWidth + gap + textWidth + paddingX * 2;
  const slidesWidth = arrowWidth + gap + textWidth + gap + arrowWidth;

  const [hovered, setHovered] = useState(false);

  return (
    <button
      className={`relative flex items-center bg-zinc-800 rounded-full overflow-hidden focus:outline-none cursor-pointer ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: buttonWidth,
        height: buttonHeight,
        paddingLeft: paddingX,
        paddingRight: paddingX,
      }}
      onClick={()=>{
        navigate("/products")
      }}
    >
      <motion.div
        className="flex items-center"
        initial={false}
        animate={{ x: hovered ? -(arrowWidth + gap) : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        style={{
          width: slidesWidth,
          height: buttonHeight,
        }}
      >
        {/* Left Arrow */}
        <motion.span
          className="flex-none flex items-center justify-center bg-white rounded-full"
          style={{
            width: arrowWidth,
            height: arrowWidth,
          }}
          initial={{ rotate: 0 }}
          animate={{ rotate: hovered ? 90 : 0 }}
        >
          <IoIosArrowForward size={22} className="text-black" />
        </motion.span>

        {/* Gap */}
        <span style={{ width: gap }} />

        {/* Center Text */}
        <div
          className="flex-none flex items-center justify-center text-white font-medium"
          style={{
            width: textWidth,
            height: buttonHeight,
            fontSize: "1rem",
            lineHeight: 1,
          }}
        >
          {text}
        </div>

        {/* Gap */}
        <span style={{ width: gap }} />

        {/* Right Arrow */}
        <motion.span
          className="flex-none flex items-center justify-center bg-white rounded-full"
          style={{
            width: arrowWidth,
            height: arrowWidth,
          }}
          initial={{ rotate: 90 }}
          animate={{ rotate: hovered ? 0 : 90 }}
        >
          <IoIosArrowForward size={22} className="text-black" />
        </motion.span>
      </motion.div>
    </button>
  );
};

export default Button;
