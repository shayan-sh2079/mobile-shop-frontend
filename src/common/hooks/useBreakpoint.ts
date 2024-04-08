import resolveConfig from "tailwindcss/resolveConfig";
import customTailwindConf from "../../../tailwind.config";
import { useEffect, useState } from "react";
import type { Screens } from "@/common/types/general";

const tailwindConf = resolveConfig(customTailwindConf);
const screens = tailwindConf.theme?.screens as Record<string, string>;

const useBreakpoint = (breakpoint: Screens = "lg") => {
  const [isDesktop, setIsDesktop] = useState(false);

  const handleWindowResize = () => {
    setIsDesktop(
      window.matchMedia(`(min-width: ${screens[breakpoint]})`).matches,
    );
  };

  useEffect(() => {
    handleWindowResize();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  });

  return isDesktop;
};

export default useBreakpoint;
