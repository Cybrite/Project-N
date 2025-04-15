// components/MindEase/MindEaseLanding.tsx
"use client"
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";

import CustomCursor from "@/components/shared/custom-cursor";
import {  use, useRef } from "react"; 

const MindEaseLanding = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-black text-white min-h-screen">
      <HeroSection />
      <FeaturesSection />

      <CustomCursor
          containerRef={containerRef as React.RefObject<HTMLDivElement>}
        />

    </div>
  );
};
export default MindEaseLanding;
