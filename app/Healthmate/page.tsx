"use client";
import { useRef } from "react";

import { ThemeProvider } from "next-themes";
import ParticlesBackground from "@/components/shared/particle-background";

import NoiseTexture from "@/components/shared/noise-texture";

import Healthmate from "@/components/Healthmate";
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <main
        ref={containerRef}
        className="relative min-h-screen bg-gradient-to-b from-black to-gray-900 dark:from-black dark:to-gray-900 text-white overflow-hidden"
      >
        
        <NoiseTexture />
        <ParticlesBackground />
          <>
           <Healthmate/>
          </>
      </main>
    </ThemeProvider>
  );
}
