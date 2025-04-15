"use client";

import { useEffect, useState, type RefObject } from "react";
import { motion } from "framer-motion";

interface CustomCursorProps {
  containerRef: RefObject<HTMLDivElement>;
}

export default function CustomCursor({ containerRef }: CustomCursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Compute the current variant based on hover and click states
  const cursorVariant = (() => {
    if (isHovering && isClicking) return "hoverClick";
    if (isHovering) return "hover";
    if (isClicking) return "click";
    return "default";
  })();

  // Track mouse position
  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  // Track mouse clicks
  useEffect(() => {
    const mouseDown = () => {
      setIsClicking(true);
    };

    const mouseUp = () => {
      setIsClicking(false);
    };

    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mouseup", mouseUp);

    return () => {
      window.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mouseup", mouseUp);
    };
  }, []);

  // Track hover state
  useEffect(() => {
    if (!containerRef.current) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-hover-trigger")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const container = containerRef.current;
    container.addEventListener("mouseover", handleMouseOver);

    return () => {
      container.removeEventListener("mouseover", handleMouseOver);
    };
  }, [containerRef]);

  const variants = {
    default: {
      x: mousePosition.x,
      y: mousePosition.y,
      scale: 1,
      opacity: 0.8,
      transition: {
        type: "spring",
        mass: 0.1,
        damping: 22,
        stiffness: 800,
      },
    },
    hover: {
      x: mousePosition.x,
      y: mousePosition.y,
      height: 80,
      width: 80,
      scale: 1.2,
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      borderColor: "rgba(255, 255, 255, 0.8)",
      mixBlendMode: "difference" as const,
      transition: {
        type: "spring",
        mass: 0.1,
        damping: 22,
        stiffness: 800,
      },
    },
    click: {
      x: mousePosition.x,
      y: mousePosition.y,
      scale: 0.8,
      opacity: 0.7,
      transition: {
        type: "spring",
        mass: 0.1,
        damping: 15,
        stiffness: 800,
      },
    },
    hoverClick: {
      x: mousePosition.x,
      y: mousePosition.y,
      height: 80,
      width: 80,
      scale: 0.9,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      borderColor: "rgba(255, 255, 255, 0.9)",
      mixBlendMode: "difference" as const,
      transition: {
        type: "spring",
        mass: 0.1,
        damping: 15,
        stiffness: 800,
      },
    },
  };

  const dotVariants = {
    default: {
      x: mousePosition.x,
      y: mousePosition.y,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        mass: 0.1,
        damping: 30,
        stiffness: 800,
      },
    },
    hover: {
      x: mousePosition.x,
      y: mousePosition.y,
      opacity: 0.5,
      scale: 0.5,
      transition: {
        type: "spring",
        mass: 0.1,
        damping: 30,
        stiffness: 800,
      },
    },
    click: {
      x: mousePosition.x,
      y: mousePosition.y,
      opacity: 0.8,
      scale: 0.6,
      transition: {
        type: "spring",
        mass: 0.1,
        damping: 20,
        stiffness: 800,
      },
    },
    hoverClick: {
      x: mousePosition.x,
      y: mousePosition.y,
      opacity: 0.3,
      scale: 0.2,
      transition: {
        type: "spring",
        mass: 0.1,
        damping: 20,
        stiffness: 800,
      },
    },
  };

  return (
    <>
      <style jsx global>{`
        .cursor-outline {
          position: fixed;
          top: 0;
          left: 0;
          width: 40px;
          height: 40px;
          margin-left: -20px;
          margin-top: -20px;
          pointer-events: none;
          border-radius: 50%;
          z-index: 9999;
          border: 1.5px solid rgba(255, 255, 255, 0.6);
          background-color: rgba(255, 255, 255, 0.05);
          /* backdrop-filter: blur(2px); */
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
          transition: border-color 0.3s ease;
        }

        .cursor-outline::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 6px;
          height: 6px;
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          opacity: 0.6;
        }

        .cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 10px;
          height: 10px;
          margin-left: -4px;
          margin-top: -4px;
          pointer-events: none;
          border-radius: 50%;
          z-index: 9999;
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
        }

        html,
        body,
        button,
        a {
          cursor: none;
        }

        button:hover ~ .cursor-outline,
        a:hover ~ .cursor-outline {
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
      <motion.div
        className="cursor-outline"
        variants={variants}
        animate={cursorVariant}
      />
      <motion.div
        className="cursor-dot"
        variants={dotVariants}
        animate={cursorVariant}
      />
    </>
  );
}
