import React from "react";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <nav className="bg-green-400 w-full h-screen flex justify-end items-end py-5">
      <div className="bg-red-400 w-full h-16 flex items-center justify-center ">
        <Navbar />
      </div>
    </nav>
  );
};

export default App;
