import {  ArrowUpIcon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="scroll-to-top bottom-4 right-4 border-orange-500/50 bg-black/40 hover:bg-orange-500 hover:text-black fixed z-50 p-3 text-orange-500 transition-colors duration-200 border-2 rounded-full"
      >
        <ArrowUpIcon width={20} height={20} />
      </button>
    )
  );
};

export default ScrollToTopButton;
