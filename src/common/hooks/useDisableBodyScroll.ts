import { useEffect } from "react";

const useDisableBodyScroll = (isOpen?: boolean) => {
  useEffect(() => {
    if (isOpen !== false) {
      const scrollbarWidth = window.innerWidth - document.body.offsetWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    };
  }, [isOpen]);
};

export default useDisableBodyScroll;
