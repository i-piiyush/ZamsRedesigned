import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const Footer = () => {
  // Map link labels to their routes
  const links = [
    { label: "contact us", path: "/" }, // Add this route if it exists or adjust
    { label: "products", path: "/products" },
    { label: "about us", path: "/about" },
    { label: "sign in", path: "/login" },
    { label: "home", path: "/" },
  ];

  return (
    <div className="bg-black w-full text-white h-[70%] relative">
      <div className="w-[75%] md:w-[50%] xl:w-[35%] bg-secondary absolute left-1/2 text-black h-44 md:h-64 -top-[20%] -translate-x-1/2 flex flex-col  justify-center items-center gap-5 -rotate-3 ">
        <h1 className="text-[6vw] md:text-5xl font-bold leading-[1]">
          For the fans,
          <br /> by the fans
        </h1>
        <Button text={"Explore now"} className="scale-75 md:scale-90" />
      </div>

      <div className="md:px-32 px-10 h-[90%] flex flex-col md:flex-row justify-center items-end ">
        <div className="justify-end w-full flex flex-col ">
          <h1 className="leading-[1] text-5xl xl:text-7xl font-bold">
            ZAMS
            <br />
            FASHION.
          </h1>
          <p className="opacity-70 font-light leading-[1]">
            for the fans who watch,
            <br /> read and breath it
          </p>
        </div>

        <div className="w-full py-5 flex flex-col justify-end md:items-end ">
          {links.map(({ label, path }, index) => (
            <div key={index}>
              <Link
                to={path}
                className="text-xl font-light hover:font-semibold hover:scale-125 underline cursor-pointer opacity-50 hover:opacity-100"
              >
                {label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
