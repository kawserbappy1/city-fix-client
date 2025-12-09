import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl z-50 group"
          aria-label="Scroll to top"
          style={{
            background: isHovered
              ? "linear-gradient(135deg, var(--color-primary), var(--color-accent))"
              : "linear-gradient(135deg, var(--color-accent), var(--color-primary))",
          }}
        >
          {/* Outer glow effect */}
          <div
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "linear-gradient(135deg, var(--color-accent), var(--color-secondary))",
              filter: "blur(10px)",
              zIndex: -1,
            }}
          ></div>

          {/* Main button with glass effect */}
          <div className="absolute inset-0 rounded-full backdrop-blur-sm bg-white/10 border border-white/20"></div>

          {/* Animated rings */}
          <motion.div
            animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full border-2 border-white/20"
          ></motion.div>

          {/* Arrow icon with animation */}
          <motion.div
            animate={{ y: isHovered ? [-2, 2, -2] : 0 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="relative z-10"
          >
            <FaArrowUp className="w-6 h-6 text-white" />
          </motion.div>

          {/* Pulse effect on hover */}
          {isHovered && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0.7 }}
              animate={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-white/30"
            ></motion.div>
          )}

          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-base-100 text-base-content text-sm font-medium px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap border border-base-300">
              Scroll to top
              {/* Tooltip arrow */}
              <div className="absolute top-1/2 left-full transform -translate-y-1/2">
                <div className="w-2 h-2 bg-base-100 border-r border-t border-base-300 transform rotate-45"></div>
              </div>
            </div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;
