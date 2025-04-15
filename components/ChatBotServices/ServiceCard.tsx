import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  ITEM_VARIANTS,
} from "@/sections/ChatBotServices/chatbot-services";
import { SERVICES} from "../../contents/chatbot-services"
import { ServiceCardProps } from "../../types/service";
import Link from "next/link"
import type { Route } from 'next';
export const GradientBackground = () => (
  <div className="absolute inset-0 z-0">
    <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-gray-800/20 to-transparent opacity-30" />
    <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-gray-800/20 to-transparent opacity-30" />
  </div>
);

// Color schemes for different cards
const COLOR_SCHEMES = [
  {
    bgColor: "from-blue-500/20 to-blue-900/5",
    glowColor: "bg-blue-500/20",
    borderColor: "border-blue-500/20",
    accentColor: "bg-blue-500",
    buttonColor: "from-blue-400 to-blue-600"
  },
  {
    bgColor: "from-purple-500/20 to-purple-900/5",
    glowColor: "bg-purple-500/20",
    borderColor: "border-purple-500/20",
    accentColor: "bg-purple-500",
    buttonColor: "from-purple-400 to-purple-600"
  },
  {
    bgColor: "from-emerald-500/20 to-emerald-900/5",
    glowColor: "bg-emerald-500/20",
    borderColor: "border-emerald-500/20",
    accentColor: "bg-emerald-500",
    buttonColor: "from-emerald-400 to-emerald-600"
  },
  {
    bgColor: "from-rose-500/20 to-rose-900/5",
    glowColor: "bg-rose-500/20",
    borderColor: "border-rose-500/20",
    accentColor: "bg-rose-500",
    buttonColor: "from-rose-400 to-rose-600"
  },
  {
    bgColor: "from-amber-500/20 to-amber-900/5",
    glowColor: "bg-amber-500/20",
    borderColor: "border-amber-500/20",
    accentColor: "bg-amber-500",
    buttonColor: "from-amber-400 to-amber-600"
  },
  {
    bgColor: "from-sky-500/20 to-sky-900/5",
    glowColor: "bg-sky-500/20",
    borderColor: "border-sky-500/20",
    accentColor: "bg-sky-500",
    buttonColor: "from-sky-400 to-sky-600"
  },
  {
    bgColor: "from-teal-500/20 to-teal-900/5",
    glowColor: "bg-teal-500/20",
    borderColor: "border-teal-500/20",
    accentColor: "bg-teal-500",
    buttonColor: "from-teal-400 to-teal-600"
  },
  {
    bgColor: "from-indigo-500/20 to-indigo-900/5",
    glowColor: "bg-indigo-500/20",
    borderColor: "border-indigo-500/20",
    accentColor: "bg-indigo-500",
    buttonColor: "from-indigo-400 to-indigo-600"
  }
];

export function ServiceCard({
  service,
  index,
  isActive,
  setActive,
  variants,
}: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);
  const [isMobile, setIsMobile] = useState(false);
  const [isTapped, setIsTapped] = useState(false);

  // Each card gets a unique color scheme based on its index
  const colorScheme = COLOR_SCHEMES[index % COLOR_SCHEMES.length];
  const { bgColor, glowColor, borderColor, accentColor, buttonColor } = colorScheme;

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on initial load
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle mobile tap
  const handleTap = () => {
    if (isMobile) {
      setIsTapped(true);
      setActive(index);
      
      // Reset tap state after animation duration
      setTimeout(() => {
        setIsTapped(false);
      }, 1500);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    
    x.set(0);
    y.set(0);
    setActive(null);
  };

  // Determine if card should show active state (either hover on desktop or tap on mobile)
  const shouldShowActive = isActive || isTapped;

  return (
    <motion.div
      ref={cardRef}
      variants={variants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => !isMobile && setActive(index)}
      onClick={handleTap}
      className="cursor-hover-trigger"
    >
      <motion.div
        style={{
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
        transition={{ duration: 0.3 }}
        whileHover={{ z: 10 }}
        whileTap={isMobile ? { scale: 0.98 } : undefined}
      >
        <Card className="border-white/10 backdrop-blur-sm transition-all duration-300 h-full flex flex-col overflow-hidden relative">
          {/* Dynamic background that changes on hover/tap */}
          <motion.div 
            className="absolute inset-0 bg-black/50 z-0"
            animate={{ 
              opacity: shouldShowActive ? 0 : 1 
            }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Gradient background that appears on hover/tap */}
          <motion.div 
            className={`absolute inset-0 bg-gradient-to-br ${bgColor} z-0`}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: shouldShowActive ? 1 : 0 
            }}
            transition={{ duration: 0.5 }}
          />

          {/* Glow effect on hover/tap */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-5"
            animate={{ opacity: shouldShowActive ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Card border highlight on hover/tap */}
          <motion.div
            className={`absolute inset-0 border-2 rounded-lg ${borderColor} z-5`}
            initial={{ opacity: 0 }}
            animate={{ opacity: shouldShowActive ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Mobile glow pulse effect on tap */}
          {isMobile && (
            <motion.div
              className={`absolute inset-0 rounded-lg ${glowColor} z-4`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: isTapped ? [0, 0.3, 0] : 0,
                scale: isTapped ? [0.8, 1.1, 1.2] : 0.8
              }}
              transition={{ 
                duration: 1,
                times: [0, 0.5, 1]
              }}
            />
          )}

          <CardHeader className="pb-2 relative z-10">
            <motion.div
              className={`mb-4 p-3 rounded-full w-fit ${shouldShowActive ? glowColor : "bg-white/10"}`}
              animate={{
                scale: shouldShowActive ? 1.1 : 1,
                rotate: shouldShowActive ? [0, 5, -5, 0] : 0,
              }}
              transition={{
                duration: 0.5,
                rotate: {
                  repeat: shouldShowActive ? Number.POSITIVE_INFINITY : 0,
                  repeatType: "loop",
                  duration: 2,
                },
              }}
            >
              {service.icon}
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: shouldShowActive ? [1, 1.5, 1] : 0,
                  opacity: shouldShowActive ? [0.5, 0, 0] : 0,
                }}
                transition={{
                  duration: 1,
                  repeat: shouldShowActive ? Number.POSITIVE_INFINITY : 0,
                }}
              />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-white">
              {service.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow relative z-10">
            <CardDescription className="text-gray-400 text-base">
              {service.description}
            </CardDescription>
          </CardContent>
          <CardFooter className="relative z-10">
            <motion.button className="w-full">
              <Button
                className={`w-full bg-gradient-to-r ${service.color || buttonColor} hover:opacity-90 hover:text-black text-white border border-white/20 group overflow-hidden`}
              > 
                <Link  href ={service.href as Route}>
                <span className="relative z-10 hover:text-black text-white">Get Started</span>
                </Link>
                <motion.span
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.button>
          </CardFooter>

          <motion.div
            className={`absolute bottom-0 left-0 h-1 ${accentColor}`}
            initial={{ width: "0%" }}
            animate={{ width: shouldShowActive ? "100%" : "0%" }}
            transition={{ duration: 0.5 }}
          />
        </Card>
      </motion.div>
    </motion.div>
  );
}

// Example of how to use in a grid
export function ServiceCardGrid() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {SERVICES.map((service, index) => (
        <ServiceCard
          key={index}
          service={service}
          index={index}
          isActive={activeIndex === index}
          setActive={setActiveIndex}
          variants={ITEM_VARIANTS}
        />
      ))}
    </div>
  );
}