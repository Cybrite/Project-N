import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { menuItems, socialLinks, footerLinks } from './navbarData';

// Safe hooks with error handling
const useSafeRouter = () => {
  const [currentPath, setCurrentPath] = useState('/');
  const [routerError, setRouterError] = useState(false);

  useEffect(() => {
    // Try to get current path from window location as fallback
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  const push = (path: string) => {
    if (typeof window !== 'undefined') {
      window.location.href = path;
    }
  };

  // Try to use Next.js router hooks
  let nextRouter = null;
  let nextPathname = null;

  try {
    // Try App Router first
    const { useRouter } = require('next/navigation');
    const { usePathname } = require('next/navigation');
    nextRouter = useRouter();
    nextPathname = usePathname();
  } catch (error) {
    try {
      // Fallback to Pages Router
      const { useRouter } = require('next/router');
      const router = useRouter();
      nextRouter = router;
      nextPathname = router.pathname;
    } catch (error) {
      // If both fail, use our fallback
      setRouterError(true);
    }
  }

  return {
    push: nextRouter?.push || push,
    pathname: nextPathname || currentPath,
    routerError
  };
};

const LeftNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  const { push, pathname, routerError } = useSafeRouter();
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const currentImageRef = useRef<HTMLImageElement>(null);

  // Check if device is desktop
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);

    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  // ESC key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setHoveredItem(null);
  };

  // Handle navigation
  const handleNavigation = (path: string) => {
    setIsMenuOpen(false);
    push(path);
  };

  // Handle hover effects
  const handleItemHover = (itemName: string) => {
    setHoveredItem(itemName);
    
    if (currentImageRef.current && imageContainerRef.current) {
      const newImage = menuItems.find(item => item.name === itemName)?.image;
      
      if (newImage) {
        currentImageRef.current.src = newImage;
        
        // Show image container with smooth transition
        imageContainerRef.current.style.opacity = '1';
        imageContainerRef.current.style.transform = 'scale(1)';
      }
    }
  };

  const handleItemLeave = () => {
    setHoveredItem(null);
    
    if (imageContainerRef.current) {
      // Hide image container
      imageContainerRef.current.style.opacity = '0';
      imageContainerRef.current.style.transform = 'scale(0.95)';
    }
  };

  // Animation variants
  const menuVariants = {
    closed: {
      x: '-100%',
    },
    open: {
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.33, 1, 0.68, 1],
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      x: '-100%',
      transition: {
        duration: 0.4,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      x: -50,
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

  // Hamburger line animations
  const topLineVariants = {
    initial: {
      width: 0,
      x: -12,
      rotate: 0,
      y: 0
    },
    animate: {
      width: "24px",
      x: 0,
      rotate: 0,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1],
        repeat: isMenuOpen ? Number.POSITIVE_INFINITY : 0,
        repeatType: "loop" as const,
        repeatDelay: 2
      }
    },
    closed: {
      rotate: 0,
      y: 0,
      width: "24px",
      x: 0,
      transition: {
        duration: 0.3,
        ease: [0.76, 0, 0.24, 1]
      }
    },
    open: {
      rotate: 45,
      y: 6,
      width: "24px",
      x: 0,
      transition: {
        duration: 0.3,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  const middleLineVariants = {
    initial: {
      width: 0,
      x: -12,
      opacity: 1
    },
    animate: {
      width: "24px",
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1],
        repeat: isMenuOpen ? Number.POSITIVE_INFINITY : 0,
        repeatType: "loop" as const,
        repeatDelay: 2
      }
    },
    closed: {
      opacity: 1,
      x: 0,
      width: "24px",
      transition: {
        duration: 0.3,
        ease: [0.76, 0, 0.24, 1]
      }
    },
    open: {
      opacity: 0,
      x: 0,
      width: "24px",
      transition: {
        duration: 0.3,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  const bottomLineVariants = {
    initial: {
      width: 0,
      x: -12,
      rotate: 0,
      y: 0
    },
    animate: {
      width: "24px",
      x: 0,
      rotate: 0,
      y: 0,
      transition: {
        delay: 0.4,
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1],
        repeat: isMenuOpen ? Number.POSITIVE_INFINITY : 0,
        repeatType: "loop" as const,
        repeatDelay: 2
      }
    },
    closed: {
      rotate: 0,
      y: 0,
      width: "24px",
      x: 0,
      transition: {
        duration: 0.3,
        ease: [0.76, 0, 0.24, 1]
      }
    },
    open: {
      rotate: -45,
      y: -6,
      width: "24px",
      x: 0,
      transition: {
        duration: 0.3,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  // Only render on desktop devices
  if (!isDesktop) {
    return null;
  }

  return (
    <>
      {/* Left Navbar*/}
      <motion.div 
        className={`fixed left-0 top-0 h-full w-12 lg:w-16 xl:w-20 z-50 flex flex-col items-center py-4 lg:py-8 transition-all duration-500 ${
          isMenuOpen 
            ? 'border-r-0 bg-black' 
            : 'border-r border-white/10 bg-black/20 backdrop-blur-sm'
        }`}
        transition={{ duration: 0.3 }}
      >
        {/* Logo */}
        <Link href="/" className='flex items-center space-x-5 cursor-hover-trigger'>
          <motion.div
            className="w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12  bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center relative overflow-hidden shadow-lg"
            whileHover={{
              rotate: 180,
              scale: 1.05,
              backgroundColor: "rgba(255,255,255,1)",
              transition: { duration: 0.5, ease: "circOut" },
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br  from-white/80 to-gray-300/80"
              animate={{ rotate: 360 }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
            <img
              src="https://res.cloudinary.com/dqqyuvg1v/image/upload/v1741948683/Vector_z4x9e1.png"
              alt="NirveonX Logo"
              className="w-4 h-4 lg:w-6 lg:h-6 xl:w-7 xl:h-7 relative z-10"
            />
          </motion.div>
        </Link>

        {/* Hamburger Button */}
        <motion.button
          onClick={toggleMenu}
          animate={{
            position: "absolute",
            top: isMenuOpen ? "1rem" : "50%",
            right: isMenuOpen ? "1rem" : "auto",
            left: isMenuOpen ? "auto" : "50%",
            x: isMenuOpen ? "calc(100vw - 5rem)" : "-50%",
            y: isMenuOpen ? 0 : "-50%",
          }}
          className="relative w-8 h-10 lg:w-10 lg:h-12 xl:w-12 xl:h-14 rounded-lg flex items-center justify-center cursor-pointer shadow-lg bg-black/20 backdrop-blur-sm border border-white/10"
          whileHover={{ 
            scale: 1.05, 
            backgroundColor: "rgba(255,255,255,0.1)",
            borderColor: "rgba(255,255,255,0.3)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex flex-col items-center justify-center space-y-1 lg:space-y-1.5">
            <motion.div
              className="h-0.5  bg-white rounded-full shadow-sm origin-center"
              variants={topLineVariants}
              initial="initial"
              animate={isMenuOpen ? "open" : ["animate", "closed"]}
            />
            <motion.div
              className="h-0.5  bg-white rounded-full shadow-sm origin-center"
              variants={middleLineVariants}
              initial="initial"
              animate={isMenuOpen ? "open" : ["animate", "closed"]}
            />
            <motion.div
              className="h-0.5  bg-white rounded-full shadow-sm origin-center"
              variants={bottomLineVariants}
              initial="initial"
              animate={isMenuOpen ? "open" : ["animate", "closed"]}
            />
          </div>
        </motion.button>
      </motion.div>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed bg-black/95 backdrop-blur-xl z-30 flex flex-col overflow-hidden"
            style={{ 
              left: window.innerWidth >= 1280 ? '80px' : window.innerWidth >= 1024 ? '64px' : '48px', 
              top: 0, 
              right: 0, 
              bottom: 0 
            }}
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="exit"
          >
            {/* Background Image Container - Only visible on hover */}
            <div 
              ref={imageContainerRef}
              className="absolute inset-0 opacity-0 transition-all duration-500 ease-out"
              style={{ 
                zIndex: 1,
                transform: 'scale(0.95)'
              }}
            >
              <img
                ref={currentImageRef}
                src=""
                alt="Background"
                className="w-full h-full object-cover"
                style={{ 
                  filter: 'brightness(0.6) contrast(1.1) saturate(1.3)',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
            </div>

            {/* Main Menu Content */}
            <div className="flex-1 flex items-center justify-center relative z-10">
              <motion.div
                className="text-center"
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="exit"
              >
                <div className="space-y-6 lg:space-y-10 flex flex-col lg:flex-row gap-8 lg:gap-16">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      variants={itemVariants}
                      className="overflow-hidden"
                    >
                      <motion.button
                        className={`text-3xl lg:text-5xl xl:text-6xl font-bold transition-all duration-300 relative group cursor-pointer ${
                          pathname === item.path 
                            ? 'text-white' 
                            : 'text-white hover:text-gray-200'
                        }`}
                        onClick={() => handleNavigation(item.path)}
                        onMouseEnter={() => handleItemHover(item.name)}
                        onMouseLeave={handleItemLeave}
                        whileHover={{ 
                          scale: 1.05,
                          textShadow: "0px 0px 20px rgba(255,255,255,0.8)"
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.name}
                        
                        {/* Active route indicator */}
                        {pathname === item.path && (
                          <motion.div
                            className="absolute left-0 bottom-0 h-1 bg-white shadow-lg rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                          />
                        )}
                        
                        {/* Hover underline effect */}
                        {pathname !== item.path && (
                          <motion.div
                            className="absolute left-0 bottom-0 h-1 bg-white shadow-lg rounded-full"
                            initial={{ width: 0 }}
                            whileHover={{ width: "100%" }}
                            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                          />
                        )}
                        
                        {/* Hover glow effect */}
                        <motion.div
                          className="absolute inset-0 bg-white/5 rounded-lg -z-10 backdrop-blur-sm"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileHover={{ opacity: 1, scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Bottom Section - Get in Touch */}
            <motion.div
              className="border-t border-white/20 px-4 lg:px-8 py-4 lg:py-6 relative z-10 backdrop-blur-md bg-black/40"
              variants={itemVariants}
            >
              <div className="flex flex-col lg:flex-row items-center justify-between max-w-screen-xl mx-auto gap-4 lg:gap-0">
                {/* Get in Touch Button */}
                <motion.button
                  className="px-4 lg:px-6 py-2 lg:py-3 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm text-sm lg:text-base"
                  whileHover={{ 
                    scale: 1.05,
                    borderColor: "rgba(255,255,255,0.6)",
                    boxShadow: "0 0 20px rgba(255,255,255,0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get in touch
                </motion.button>

                {/* Social Media Icons */}
                <div className="flex items-center space-x-3 lg:space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center text-white hover:text-gray-300 transition-colors duration-300 rounded-full hover:bg-white/10 backdrop-blur-sm"
                      whileHover={{ 
                        scale: 1.2, 
                        y: -2,
                        boxShadow: "0 4px 20px rgba(255,255,255,0.2)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { delay: 0.5 + index * 0.1 }
                      }}
                    >
                      <svg
                        className="w-4 h-4 lg:w-5 lg:h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d={social.icon} />
                      </svg>
                      <span className="sr-only">{social.name}</span>
                    </motion.a>
                  ))}
                </div>

                {/* Footer Links */}
                <div className="flex items-center space-x-4 lg:space-x-6">
                  {footerLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-xs lg:text-sm hover:drop-shadow-lg"
                      whileHover={{ 
                        y: -1,
                        textShadow: "0px 0px 10px rgba(255,255,255,0.8)"
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { delay: 0.8 + index * 0.1 }
                      }}
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Click outside to close */}
            <motion.div
              className="absolute inset-0 -z-10"
              onClick={() => setIsMenuOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LeftNavbar;