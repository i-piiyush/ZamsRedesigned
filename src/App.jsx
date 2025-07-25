import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import AppRoute from "./routes/AppRoute";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.1, // interpolation intensity (between 0 and 1), default 0.1
      wheelMultiplier: 1.2, // speed scaling for wheel events, default 1
      smoothTouch: true,
    }); // enable smooth scrolling on touch, default false });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <>
      <ScrollToTop />

      <AppRoute />
    </>
  );
};

export default App;
