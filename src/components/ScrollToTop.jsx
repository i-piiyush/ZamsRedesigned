import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto"  // or "smooth" if you want smooth scrolling
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
