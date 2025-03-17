"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  description: string;
}

export default function TeamMembersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
  });
  const router=useRouter();

  const handleMeet=()=>{
     router.push('/team');
  }
 // console.log(screenSize);
  // Enhanced viewport size detection
  useEffect(() => {
    const checkScreenSize = () => {
      setScreenSize({
        isMobile: window.innerWidth < 640,
        isTablet: window.innerWidth >= 640 && window.innerWidth < 1024,
      });
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const teamMembers: TeamMember[] = [
    //leadership
    {
      id: "founder",
      name: "Kavali Deekshith",
      role: "Founder & Chairman",
      description:
        "Kavali Deekshith is the Founder & Chairman of NirveonX, an AI-powered healthcare ecosystem revolutionizing healthcare accessibility, mental wellness, elder care, and veterinary support. With a strong background in Artificial Intelligence, Machine Learning, and Business Strategy, he is committed to leveraging advanced technology to drive innovation in healthcare and improve lives. Currently pursuing a B.Tech in AI & ML at JNTUH, Deekshith has gained extensive experience in business development, AI-driven analytics, and strategic growth through key roles at organizations such as Furno Xpress, Evident, and Triaaright Solutions LLP. He has also made significant contributions as a Wellness Advisor and Senior Team Leader at Ayuzera, playing a pivotal role in health and wellness initiatives. Beyond his technical and entrepreneurial pursuits, Deekshith is an accomplished artist and singer, blending creativity with analytical thinking to drive meaningful impact. His vision for NirveonX is to create an all-encompassing AI-driven healthcare ecosystem that empowers individuals through cutting-edge innovation and personalized solutions.",
      avatar:
        "https://res.cloudinary.com/dqqyuvg1v/image/upload/v1742072034/kavali_c7yr5a.jpg",
    },
    {
      id: "advisor",
      name: "Nikhil Sanka",
      role: "Advisory Board Member",
      description:
        "With over 8 years of experience in AI-driven solutions, business analytics, and technical leadership, Nikhil Sanka has been at the forefront of software development, cloud infrastructure, and process automation. As a Senior Business Analyst, AI Solutions Leader, and Technical Team Lead, he has successfully developed and deployed scalable AI-powered solutions that enhance operational efficiency and drive business growth. His expertise spans across AI/ML, automation, cloud computing, and data-driven architecture, with a strong technical background in C#, .NET Core, React, AWS, and Power BI. He has led the development of AI-powered knowledge management tools, predictive analytics models, and scalable reporting solutions, significantly improving user engagement and decision-making processes. Throughout his career at Parsons Corporation and Index Web Marketing, he has played a key role in mentoring cross-functional teams, optimizing workflows, and delivering cutting-edge AI and business intelligence solutions. His ability to bridge technology and business strategy makes him a valuable asset in guiding NirveonX's AI-driven healthcare innovations and digital transformation efforts.",
      avatar:
        "https://res.cloudinary.com/dqqyuvg1v/image/upload/v1742072035/nikhil_redxth.jpg",
    },
    {
      id: "CEO",
      name: "Ayush Kumar Sahoo",
      role: "CEO",
      description:
        "Ayush Kumar Sahoo is the CEO & Co-Founder of NirveonX, an AI-driven healthcare innovation company dedicated to transforming healthcare accessibility, patient outcomes, and digital solutions. With expertise in Artificial Intelligence, Business Analytics, and Strategic Consulting, he is passionate about leveraging cutting-edge technology to create impactful and scalable solutions in the healthcare sector. Currently pursuing a B.Tech in Chemical Engineering at NIT Rourkela, he has collaborated with leading organizations such as Redient Security, Innomatics Research Labs, and IIT Guwahati, contributing to business development, AI-driven data analytics, and strategic decision-making. His leadership, innovation mindset, and expertise in AI-powered solutions position him at the forefront of advancing healthcare through intelligent automation and predictive analytics. An avid Swimmer and Team Leader, he brings the same discipline, resilience, and strategic mindset from his sports journey to entrepreneurship—developing high-impact AI solutions that bridge the gap between technology and real-world healthcare challenges.",
      avatar:
        "https://res.cloudinary.com/dqqyuvg1v/image/upload/v1742072033/ayush_ds1dbl.jpg",
    },
    {
      id: "cto",
      name: "Shaik Ashraf",
      role: "CTO & Co-Founder",
      description:
        "Shaik Ashraf is the Chief Technical Officer & Co-Founder of NirveonX, a cutting-edge organization specializing in Machine Learning, Deep Learning, and Data Analytics. With a passion for leveraging AI-driven insights, he is committed to transforming industries through data-driven innovation and intelligent automation. Certified in Machine Learning, Deep Learning, and Data Analytics by SAP and TASK, he possesses expertise in building predictive models, AI-powered solutions, and scalable data-driven applications. His technical acumen extends to big data processing, model optimization, and AI strategy, driving impactful business solutions. With experience in data analytics, AI development, and strategic decision-making, he has contributed to renowned organizations, excelling in business intelligence, AI model deployment, and analytical problem-solving. Beyond technology, he is an avid cricket and football enthusiast, balancing his analytical mindset with a passion for sports. His dedication to both data science and athletics reflects his drive for continuous improvement, teamwork, and strategic thinking, making him a visionary leader in the AI and data analytics space.",
      avatar:
        "https://res.cloudinary.com/dqqyuvg1v/image/upload/v1742072031/ashraf_fi67fu.jpg",
    },
    {
      id: "Co-founder",
      name: "Sumedha Musunuri",
      role: "CWO & Co-Founder",
      description:
        "Sumedha Musunuri is the Co-Founder and Chief Wellness Officer at NirveonX, an AI-powered healthcare ecosystem dedicated to transforming healthcare accessibility, mental wellness, elder care, and veterinary support. Currently pursuing her MBBS at Great Eastern Medical School and Hospital, Sumedha has developed a strong academic foundation with specialization in Human Physiology, Biochemistry, Pathology, and Microbiology, and has gained valuable clinical exposure, further enhancing her hands-on experience in patient care and medical practice. Recognized for her academic excellence, she was awarded the prestigious Pratibha Award for her outstanding performance in the 10th Board exams. Beyond her medical expertise, Sumedha is a passionate artist, singer, dancer, and fashion designer. She has garnered numerous awards for her creativity, demonstrating her diverse talent and commitment to the arts. With a unique blend of scientific knowledge, clinical experience, and artistic passion, Sumedha is driven to make a significant impact in the healthcare and wellness sectors.",
      avatar:
        "https://res.cloudinary.com/dqqyuvg1v/image/upload/v1742072032/sumedha_kfh7lh.jpg",
    },
  ];

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? teamMembers.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev === teamMembers.length - 1 ? 0 : prev + 1));
  };

  // Enhanced animation variants with smoother transitions for all devices
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.8,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.8,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  // Enhanced TypewriterText for both mobile and desktop
  // const TypewriterText = ({ text }: { text: string }) => {
  //   return (
  //     <motion.p
  //       className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed"
  //       initial={{ opacity: 0 }}
  //       animate={{ opacity: 1 }}
  //       transition={{ duration: 0.5 }}
  //     >
  //       {text.split("").map((char, i) => (
  //         <motion.span
  //           key={i}
  //           initial={{ opacity: 0, y: 5 }}
  //           animate={{
  //             opacity: 1,
  //             y: 0,
  //             transition: {
  //               delay: i * (screenSize.isMobile ? 0.04 : 0.01),
  //               duration: 0.2,
  //             },
  //           }}
  //         >
  //           {char}
  //         </motion.span>
  //       ))}
  //     </motion.p>
  //   );
  // };

  return (
    <section
      id="founding"
      className="py-8 sm:py-12 md:py-16 lg:py-24 px-2 sm:px-4 relative overflow-hidden"
      ref={ref}
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-gray-800/20 to-transparent opacity-30" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-gray-800/20 to-transparent opacity-30" />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-6 text-white">
            Our Leadership Team
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto px-2">
            Meet the visionaries behind NIRVEON&apos;S who are dedicated to
            revolutionizing healthcare through innovation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative"
        >
          {/* Card container with proper height for all devices */}
          <div className="flex justify-center overflow-hidden relative h-[600px] xs:h-[620px] sm:h-[550px] md:h-[500px] lg:h-[550px]">
            <AnimatePresence custom={direction} initial={false}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute w-full max-w-[320px] xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl"
              >
                <Card className="bg-black/50 border-white/10 backdrop-blur-sm shadow-lg overflow-hidden">
                  <CardContent className="p-0">
                    {/* Modified layout for better responsiveness */}
                    <div className="flex flex-col sm:flex-row">
                      {/* Left side - Image with fixed dimensions */}
                      <motion.div
                        className="w-full sm:w-2/5 relative overflow-hidden h-[250px] sm:h-[500px]"
                        initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                      >
                        <img
                          src={teamMembers[activeIndex].avatar}
                          alt={teamMembers[activeIndex].name}
                          className="object-cover w-full h-full"
                        />
                      </motion.div>

                      {/* Right side - Content with scrollable description */}
                      <div className="w-full sm:w-3/5 p-4 xs:p-5 sm:p-5 md:p-6 lg:p-8 flex flex-col">
                        <motion.div
                          className="mb-2 sm:mb-2 md:mb-3 lg:mb-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.3 }}
                        >
                          <h3 className="text-lg xs:text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 md:mb-2">
                            {teamMembers[activeIndex].name}
                          </h3>
                          <p className="text-sm xs:text-base sm:text-base md:text-lg lg:text-xl text-white/80 font-medium mb-2 sm:mb-2 md:mb-3">
                            {teamMembers[activeIndex].role}
                          </p>
                        </motion.div>

                        {/* Description container with scrollbar and text animation */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3, duration: 0.3 }}
                          className="overflow-y-auto pr-2 max-h-[180px] sm:max-h-[350px]"
                          style={{ scrollbarWidth: "thin" }}
                        >
                          {/* Animated text with staggered character reveal */}
                          <motion.p
                            className="text-sm sm:text-base text-gray-300"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                          >
                            {teamMembers[activeIndex].description
                              .split(" ")
                              .map((word, wordIndex) => (
                                <motion.span
                                  key={wordIndex}
                                  className="inline-block mr-1"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{
                                    delay: wordIndex * (screenSize.isMobile? 0.03:0.02),
                                    duration: 0.3,
                                    ease: "easeOut",
                                  }}
                                >
                                  {word}{" "}
                                </motion.span>
                              ))}
                          </motion.p>
                        </motion.div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation controls */}
          <div className="flex justify-center mt-4 sm:mt-4 md:mt-6 lg:mt-8 space-x-2 sm:space-x-2 md:space-x-3 lg:space-x-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrev}
                className="rounded-full border-white/20 hover:bg-white/10 h-8 w-8 sm:h-8 sm:w-8 md:h-10 md:w-10 p-0"
              >
                <ChevronLeft className="h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5" />
              </Button>
            </motion.div>

            {/* Indicator dots */}
            <div className="flex items-center space-x-1 md:space-x-2">
              {teamMembers.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  className={`w-2 h-2 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 rounded-full transition-all duration-300 ${
                    activeIndex === index ? "bg-white scale-125" : "bg-gray-700"
                  }`}
                  whileHover={{ scale: 1.5 }}
                  aria-label={`Go to team member ${index + 1}`}
                />
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNext}
                className="rounded-full border-white/20 hover:bg-white/10 h-8 w-8 sm:h-8 sm:w-8 md:h-10 md:w-10 p-0"
              >
                <ChevronRight className="h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5" />
              </Button>
            </motion.div>
          </div>
          <div className="space h-12 w-full"></div>
      <div className="w-full h-2 flex flex-row justify-center items-center">
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="lg"
                onClick={handleMeet}
                className="bg-[#8F00FF]"
              >
                Meet Our Team
              </Button>
            </motion.div>
      </div>
        </motion.div>
      </div>
     
    </section>
  );
}
