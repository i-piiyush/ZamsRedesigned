import Navbar from "../components/Navbar";
import ActionMenu from "../components/ActionMenu";

import Section1 from "../sections/Section1";
import Section2 from "../sections/Section2";
import Section3 from "../sections/Section3";
import Magnet from "../components/Magnet";
import Section4 from "../sections/Section4";
import Section5 from "../sections/Section5";

const Home = () => {
  return (
    <div className="w-full bg-primary min-h-screen relative">
      <div className="w-full h-12 fixed top-3 flex justify-end items-center px-8 z-50">
        <Magnet magnetStrength={9}>
          <ActionMenu />
        </Magnet>
      </div>
      <div className="w-full h-16 fixed bottom-3 flex justify-center z-50">
        <Navbar />
      </div>

      {/* SECTIONS */}
      <Section1 />
      {/* <Section2 /> */}
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
    </div>
  );
};

export default Home;
