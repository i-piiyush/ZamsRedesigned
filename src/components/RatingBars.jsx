import React from "react";
import { IoIosStar } from "react-icons/io";

const RatingBars = () => {
  const rating = [100, 35, 10, 40, 6];
  return (
    <div className="w-1/2 flex flex-col ">
      {rating.map((elem, index) => (
        <div key={index} className="flex gap-1 items-center">
          <IoIosStar />
          <div className="bg-black/10 w-44 h-2">
            <div className={`h-full  bg-black`}  style={{ width: `${elem}%` }}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RatingBars;
