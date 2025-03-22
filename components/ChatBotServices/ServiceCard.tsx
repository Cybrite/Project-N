import React, {useState, useRef } from "react";
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
  SERVICES,
} from "@/sections/ChatBotServices/chatbot-services";
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

// ServiceCard Component
interface ServiceCardProps {
  service: (typeof SERVICES)[number];
  index: number;
  isActive: boolean;
  setActive: (index: number | null) => void;
  variants: typeof ITEM_VARIANTS;
}

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

  // Each card gets a unique color scheme based on its index
  const colorScheme = COLOR_SCHEMES[index % COLOR_SCHEMES.length];
  const { bgColor, glowColor, borderColor, accentColor, buttonColor } = colorScheme;

  // Function to detect if device has hover capability
  const isDesktop = () => {
    return typeof window !== 'undefined' && window.matchMedia("(hover: hover)").matches;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isDesktop()) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Apply a multiplier for smoother movement like in FeatureCard
    x.set((e.clientX - centerX) * 0.8);
    y.set((e.clientY - centerY) * 0.8);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    // Only reset active state on desktop devices
    if (isDesktop()) {
      setActive(null);
    }
  };

  // Handle click/tap for both desktop and mobile
  const handleClick = () => {
    // Toggle active state on click/tap
    setActive(isActive ? null : index);
  };

  return (
    <motion.div
      ref={cardRef}
      variants={variants}
      transition={{
        delay: index * 0.1, // Staggered animation like in FeatureCard
        duration: 0.7,
        ease: [0.33, 1, 0.68, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => {
        // Only set active on hover for desktop devices
        if (isDesktop()) {
          setActive(index);
        }
      }}
      onClick={handleClick} // Handle click for both desktop and mobile
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      className="cursor-pointer" // Better indicator for mobile
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
        className="h-full"
      >
        <Card className="bg-black/50 border-white/10 backdrop-blur-sm transition-all duration-300 h-full flex flex-col overflow-hidden relative">
          {/* Dynamic background that changes on hover/active */}
          <motion.div 
            className="absolute inset-0 bg-black/50 z-0"
            animate={{ 
              opacity: isActive ? 0 : 1 
            }}
            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
          />
          
          {/* Gradient background that appears on hover/active - similar to FeatureCard */}
          <motion.div 
            className={`absolute inset-0 bg-gradient-to-br ${bgColor} z-0`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: isActive ? 0.15 : 0,
              scale: isActive ? 1 : 0.95
            }}
            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
          />

          {/* Glow effect on hover/active */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-5"
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
          />

          {/* Card border highlight on hover/active */}
          <motion.div
            className={`absolute inset-0 border-2 rounded-lg ${borderColor} z-5`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
          />

          <CardHeader className="pb-2 relative z-10">
            <motion.div
              className={`mb-4 p-3 rounded-full w-fit bg-black/50 relative overflow-hidden ${isActive ? glowColor : ""}`}
              animate={{
                scale: isActive ? 1.1 : 1,
                rotate: isActive ? [0, 5, -5, 0] : 0,
              }}
              transition={{
                duration: 0.5,
                ease: [0.33, 1, 0.68, 1],
                rotate: {
                  repeat: isActive ? Number.POSITIVE_INFINITY : 0,
                  repeatType: "loop",
                  duration: 2,
                  ease: "easeInOut",
                },
              }}
            >
              {service.icon}
              <motion.div
                className={`absolute inset-0 ${glowColor} rounded-full`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: isActive ? [1, 1.5, 1] : 0,
                  opacity: isActive ? [0.5, 0, 0] : 0,
                }}
                transition={{
                  duration: 1.5,
                  repeat: isActive ? Number.POSITIVE_INFINITY : 0,
                  ease: "easeInOut",
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
                className={`w-full bg-gradient-to-r ${service.color || `from-${buttonColor.split('-')[1]} to-${buttonColor.split('-')[3]}`} hover:opacity-90 hover:text-black text-white border border-white/20 group overflow-hidden`}
              >
                <span className="relative z-10 hover:text-black text-white">Get Started</span>
                <motion.span
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.button>
          </CardFooter>

          {/* Animated border - using the smoother animation from FeatureCard */}
          <motion.div
            className={`absolute bottom-0 left-0 h-1 ${accentColor}`}
            initial={{ width: "0%" }}
            animate={{ width: isActive ? "100%" : "0%" }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
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