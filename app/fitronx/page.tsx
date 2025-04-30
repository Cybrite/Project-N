"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import CustomCursor from "@/components/shared/custom-cursor";
import {  useRef } from "react";
import { ThemeProvider } from "next-themes";
import ParticlesBackground from "@/components/shared/particle-background";
import NoiseTexture from "@/components/shared/noise-texture";
import { useState } from "react"

function ContactInfo() {
  const [showContact, setShowContact] = useState(false)

  return (
    <div className="relative">
      <Button
        variant="outline" 
        className="border-white/20 hover:bg-white/10 text-white px-8 py-6 text-lg relative overflow-hidden group"
        onClick={() => setShowContact(!showContact)}
      >
        Get in Touch
      </Button>





  {showContact && (
    <Card className="absolute bottom-full mb-2 p-4 bg-gray-900 border-gray-700 shadow-lg w-full md:w-72 z-10 rounded-lg">
      <div className="flex flex-col gap-3">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-green-400 mr-3"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <span className="text-gray-300">+917993953138</span>
        </div>
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-green-400 mr-3"
          >
            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
          </svg>
          <span className="text-gray-300 text-sm">kavalivishal22032003@gmail.com</span>
        </div>
      </div>
    </Card>
  )}
</div>
)
}




export default function FitarthPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <main
        ref={containerRef}
        className="relative min-h-screen bg-gradient-to-b from-black to-gray-900 dark:from-black dark:to-gray-900 text-white overflow-hidden"
      >
    <CustomCursor
          containerRef={containerRef as React.RefObject<HTMLDivElement>}
        />
         <NoiseTexture />
         <ParticlesBackground />
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 dark:from-black dark:to-gray-900 text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-10">
        <div className="container mx-auto px-4 md:px-8">

          <div className="relative w-full h-[550px] sm:h-[450px]   rounded-xl overflow-hidden">
            <Image
              src="/hero_image.jpg"
              alt="FitronX - Built for people. Backed by tech."
              fill
              className="sm:object-cover   sm:object-top  object-fit "
              priority
            />
          </div>
          
        </div>
       
      </section>

      {/* About Section */}
      <section className="py-0 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              FitronX is a smart, community-driven fitness subscription service
            </h2>
            <p className="text-lg mb-8 max-w-3xl mx-auto text-gray-300">
              Built for corporates and apartment communities who care about wellbeing and togetherness. We bring the
              energy right to your doorstep — organizing engaging fitness competitions that are fun, inclusive, and
              tech-powered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <Card className="p-8 shadow-lg hover:shadow-xl transition-shadow bg-gray-800 border-gray-700">
              <div className="flex items-center mb-4">
                <div className="bg-black/50 p-3 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M6.5 6.5 17.5 17.5"></path>
                    <path d="M5 20c0-5 7-5 7-10s-7-5-7-10h14c0 5-7 5-7 10s7 5 7 10H5Z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">What We Do</h3>
              </div>
              <p className="text-gray-300">
                Our team visits residential communities and hosts interactive challenges for all age groups (7–50).
                Participants take part in beginner-friendly movements like push-ups, squats, planks, and curls — no gym
                required!
              </p>
            </Card>

            <Card className="p-8 shadow-lg hover:shadow-xl transition-shadow bg-gray-800 border-gray-700">
              <div className="flex items-center mb-4">
                <div className="bg-black/50 p-3 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                    <path d="M12 2a8 8 0 0 0-8 8c0 1.892.402 3.13 1.5 4.5L12 22l6.5-7.5c1.098-1.37 1.5-2.608 1.5-4.5a8 8 0 0 0-8-8Z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">How It Works</h3>
              </div>
              <p className="text-gray-300">
                Using Media-Pipe AI-based body tracking, our software captures movements in real-time through your
                device camera. It automatically counts reps, tracks posture, and times your performance — all
                hands-free.
              </p>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <Card className="p-8 shadow-lg hover:shadow-xl transition-shadow bg-gray-800 border-gray-700">
              <div className="flex items-center mb-4">
                <div className="bg-black/50 p-3 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">What You Get</h3>
              </div>
              <p className="text-gray-300 mb-2">
                In just 1 minute, participants receive an instant personalized report via email, including:
              </p>
              <ul className="list-disc ml-6 text-gray-300">
                <li>Performance summary</li>
                <li>Suggested exercises (based on age, experience & gender)</li>
                <li>Diet plans (Veg/Non-Veg options)</li>
                <li>Friendly tips to stay consistent</li>
              </ul>
            </Card>

            <Card className="p-8 shadow-lg hover:shadow-xl transition-shadow bg-gray-800 border-gray-700">
              <div className="flex items-center mb-4">
                <div className="bg-black/50 p-3 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Why It Works</h3>
              </div>
              <p className="text-gray-300">
                We combine gamification, real-time feedback, and health analytics to create an environment where people
                feel motivated to take the first step toward a healthier life — without needing fancy gear or gym
                memberships.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Google Form Section */}
      <section id="contact-form" className="py-16 mt-35 bg-gray-800">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join FitronX Today</h2>
            <p className="text-lg text-gray-300">Fill out the form below to get started with FitronX</p>
          </div>
          <div className="bg-gray-900 rounded-lg shadow-xl p-4 md:p-8">
            <iframe
              src="https://forms.gle/b18XQ48bp2pV56PR6"
              width="100%"
              height="700"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              className="mx-auto"
            >
              Loading…
            </iframe>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 px-4 ">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-300">The minds behind Fitarth</p>
          </div>

          <Card className="p-8 shadow-lg hover:shadow-xl transition-shadow bg-gray-800 border-gray-700 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3">
                <div className="relative w-64 h-64 rounded-lg overflow-hidden border-2 ">
                  <Image src="/Vishal_sir.jpg" alt="Vishal Kavali" fill className="object-cover" />
                </div>
              </div>
              <div className="md:w-2/3 text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-1">Vishal Kavali</h3>
                <p className="text-white-400 hover:text-blue-400 transition-all duration-300 font-medium mb-4">Head of Product & Community Innovation, NirveonX</p>
                <p className="text-gray-300 mb-6">
                  Vishal Kavali leads the design and execution of NirveonX's AI-powered community wellness programs. He
                  specializes in building scalable health-tech products that fuse computer vision, automation, and
                  real-world engagement — making fitness accessible for both corporate and middle-class communities.
                  With a keen eye for strategy and strong on-ground insight, Vishal bridges the gap between innovation
                  and impact.
                </p>
                <ContactInfo />
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} FitronX by NirveonX. All rights reserved.</p>
        </div>
      </footer>
    </div>
    </main>
    </ThemeProvider>
  )
}
