import React, { useState } from "react";
import { motion, spring } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Spin } from "hamburger-react";
import { RxCross1 } from "react-icons/rx";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  const headingLinks = [
    { title: "Home", path: "/" },
    { title: "Products", path: "/products" },
    { title: "Sign Up", path: "/signup" },
    { title: "About us", path: "/about" },
    // Update this path if needed
  ];

  const STAGGER = 0.015;
  const DURATION = 0.25;

  return (
    <div className="bg-white w-64 md:w-72 2xl:w-80 h-full rounded-full flex justify-between items-center relative drp">
      {/* Animated Menu */}
      <motion.div
        className="bg-white fixed h-80 bottom-0 left-1/2 transform -translate-x-1/2 w-60 md:w-70 2xl:w-96 rounded-2xl origin-bottom flex justify-between py-10 items-center flex-col"
        initial={{ scale: 0 }}
        animate={{ scale: nav ? 1.5 : 0 }}
        transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
      >
        <motion.div
          className="text-center"
          initial={{ y: 0, opacity: 1 }}
          animate={{
            y: nav === false ? 30 : 0,
            opacity: nav === false ? 0 : 1,
          }}
          transition={{ type: spring, duration: 0.3, ease: "easeInOut" }}
        >
          {headingLinks.map((item, i) => (
            <motion.div
              key={i}
              initial="initial"
              whileHover="hovered"
              variants={{ initial: {}, hovered: {} }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => {
                setNav(false);
                navigate(item.path);
              }}
              className="relative overflow-hidden cursor-pointer"
            >
              {/* Top layer: animate out */}
              <h1
                className={`text-3xl font-extrabold transition-colors duration-300 ${
                  hoveredIndex !== null && hoveredIndex !== i
                    ? "text-zinc-300"
                    : "text-black"
                }`}
              >
                {item.title.split("").map((char, index) => (
                  <motion.span
                    key={`top-${i}-${index}`}
                    className="inline-block"
                    variants={{
                      initial: { y: 0 },
                      hovered: { y: "-100%" },
                    }}
                    transition={{
                      duration: DURATION,
                      delay: STAGGER * index,
                      ease: "easeInOut",
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </h1>

              {/* Bottom layer: animate in */}
              <h1 className="text-black text-3xl font-extrabold absolute inset-0 top-0 left-0 pointer-events-none">
                {item.title.split("").map((char, index) => (
                  <motion.span
                    key={`bottom-${i}-${index}`}
                    className="inline-block"
                    variants={{
                      initial: { y: "100%" },
                      hovered: { y: 0 },
                    }}
                    transition={{
                      duration: DURATION,
                      delay: STAGGER * index,
                      ease: "easeInOut",
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </h1>
            </motion.div>
          ))}
        </motion.div>

        {/* Close Button */}
        <motion.div
          className="inline-block"
          whileHover="hover"
          initial={{ y: 0, opacity: 1 }}
          animate={{
            y: nav === false ? 30 : 0,
            opacity: nav === false ? 0 : 1,
          }}
          transition={{ type: spring, duration: 0.3, ease: "easeInOut" }}
          variants={{ rest: {}, hover: {} }}
        >
          <motion.span
            className="bg-zinc-300 h-16 w-16 rounded-full inline-block"
            variants={{ rest: { scale: 1 }, hover: { scale: 1 } }}
          >
            <motion.span
              className="bg-zinc-900 h-full w-full rounded-full flex justify-center items-center cursor-pointer"
              variants={{
                rest: { rotate: 0 },
                hover: { rotate: 90, scale: 0.8 },
              }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => setNav((prev) => !prev)}
            >
              <RxCross1 color="white" size={"1.2rem"} />
            </motion.span>
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Nav button + Logo */}
      <div className="h-full w-full rounded-full flex justify-between px-10 items-center">
        <motion.span
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: nav ? 30 : 0, opacity: nav ? 0 : 1 }}
          transition={{ type: spring, duration: 0.3, ease: "easeInOut" }}
        >
          <Spin
            toggled={nav}
            onToggle={() => setNav((prev) => !prev)}
            size={20}
          />
        </motion.span>

        <motion.img
          src="https://www.zamsfashion.in/cdn/shop/files/zams_logo_400_x_200_aba8dcf1-2b09-4e42-9a50-7a3fa8c31f56.png?v=1724076868&width=400"
          alt="logo"
          className="h-[90%]"
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: nav ? 30 : 0, opacity: nav ? 0 : 1 }}
          transition={{ type: spring, duration: 0.3, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

export default Navbar;
