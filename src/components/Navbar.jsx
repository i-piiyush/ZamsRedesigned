import React, { useState } from "react";
import { motion, spring } from "../../node_modules/motion/react";
import { Spin } from "hamburger-react";
import { h1 } from "motion/react-client";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const heading = ["Products" , "Sign In" , "About us","Contact us"]
  return (
    <div className="bg-white w-70 h-full rounded-full flex justify-between  items-center  relative  ">
      <motion.div
        className="bg-white absolute h-72 bottom-0 w-full rounded-3xl origin-bottom"
        initial={{ scale: 0 }}
        animate={{ scale: nav ? 1.5 : 0 }}
        transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
      >
        <button
          className="bg-red-200 "
          onClick={() => {
            setNav((prev)=> !prev);
            console.log(nav);
          }}
        >
          close
        </button>

        {heading.map((e,i)=>(
             <h1 className="bg-red-300">{e}</h1>
        ))}
      </motion.div>

      <div className="h-full w-full rounded-full flex justify-between px-5 items-center">
        <motion.span initial={{ y: 0, opacity: 1 }}
          animate={{ y: nav ? 30 : 0, opacity: nav ? 0 : 1 }}
          transition={{ type: spring, duration: 0.3, ease: "easeInOut" }} >
        <Spin
        toggled={nav}
          onToggle={() => {
            
            setNav((prev)=>!prev);
            console.log(nav);
          }}
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
