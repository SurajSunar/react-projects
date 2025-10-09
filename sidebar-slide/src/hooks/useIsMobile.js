import { useState, useEffect } from "react";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    function handleResize() {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      setIsMobile(/android|ipad|iphone|ipod|windows phone/i.test(userAgent));
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};
