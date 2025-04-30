"use client";
import Image from "next/image"
import { ArrowLeft, Phone, Video } from "lucide-react"
import Link from "next/link"
import '@fontsource/roboto/700.css'; 
import CustomCursor from "@/components/shared/custom-cursor";
import {  useRef } from "react";

export default function HealthMate() {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
  <>
    <CustomCursor
          containerRef={containerRef as React.RefObject<HTMLDivElement>}
        />
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background image with pills */}
      <div className="absolute right-0 top-0 h-full w-full z-0 opacity-80">
        <Image
          src="/image 52.png"
          alt="Pills background"
          width={600}
          height={900}
          className="object-cover h-full w-full"
        />
      </div>

     <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header with back button */}
        <div className="flex justify-between items-center mb-8">
          <button className=" absolute top-[58px] left-[57px] h-48px w-48px bg-white bg-opacity-10 rounded-full p-3">
            <Link href="/">
            <ArrowLeft className="  text-black" />
            </Link>
          </button>
          
           {/* Title and subtitle */}
         <div className="absolute text-center top-[47px] left-[160px] right-[160px]  mb-16 gap-4">
          <h1 className="text-[#2563eb] text-5xl font-bold mb-2">HealthMate</h1>
          <p className=" top-[119px] font-roboto font-bold text-2xl leading-none tracking-normal text-center">AI Powered Personal Healthcare Companion</p>
         </div>


          <div className="absolute right-[159px] top-[115px]  flex gap-3">
            <button className="bg-[#16a34a] rounded-full p-3">
              <Phone className="h-41px w-41px text-white" />
            </button>
            <button className="bg-[#dc2626] rounded-full p-3">
              <Video className=" size-41px text-white" />
            </button>
          </div>
        </div>
        
        
        {/* Feature cards grid */}
       
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[282px] mt-[482px] justify-between p-2"
         style={{
             position: "absolute",
             top: "0",
             left: "50%",
             transform: "translate(-50%, -282px)",
             width: "1072px",
         }}>


          <FeatureCard title="Check Vital Signs" imagePath="/vital.svg" />
          <FeatureCard title="Monitor Health Trends" imagePath="/Monitor_health.svg" />
          <FeatureCard title="Receive Health Alerts" imagePath="/healthcare-alert.svg" />
          <FeatureCard title="Upload Health Reports" imagePath="/doctor-ext.svg" />
        </div>
      </div>
    </div>
    </>
  )
  
}

function FeatureCard({ title, imagePath }: { title: string; imagePath: string }) {
  return (
    <div className="bg-[#1f2937] bg-opacity-80 rounded-lg p-6 flex flex-col items-center">
      <div className="relative mb-4">
        <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-30"></div>
        <div className="relative  overflow-hidden w-[130px] h-[135px] rounded-[135px] " >
          <Image src={imagePath || "/placeholder.svg"} alt={title} width={130} height={135} className="object-cover"  />
        </div>
      </div>
      <h3 className="text-white text-lg font-medium mb-4">{title}</h3>
      <Link
        href="#"
        className="bg-white text-black rounded-full px-6 py-2 text-sm font-medium hover:bg-opacity-90 transition-colors"
      >
        Get Started
      </Link>
    </div>
   
  )
}