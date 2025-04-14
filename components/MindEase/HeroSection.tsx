// components/MindEase/HeroSection.tsx
import { Phone, Video, ArrowLeft } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="text-center py-8 relative bg-black">
      {/* Left Arrow Icon */}
      <div className="absolute top-8 left-8">
        <button
          className="bg-white text-black p-2 rounded-full shadow-lg flex items-center justify-center w-8 h-8"
          aria-label="Back"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
      </div>

      <h1 className="text-4xl font-bold text-white">MindEase</h1>
      <p className="text-lg mt-2 font-medium text-white">Mental Wellness & Lifestyle Coach</p>

      {/* Background image with text at the bottom */}
      <div
        className="relative mx-auto my-6 w-[320px] h-[180px] bg-cover bg-center"
        style={{ backgroundImage: "url('/darkMeditation.png')" }}
      >
        <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm italic text-white font-semibold">
          Relax your thoughts, transform your life.
        </p>
      </div>

      {/* Icons for Phone and Video Call */}
      <div className="absolute top-8 right-8 flex gap-2">
        <button
          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-lg w-8 h-8"
          aria-label="Phone Call"
        >
          <Phone className="h-4 w-4" />
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg w-8 h-8"
          aria-label="Video Call"
        >
          <Video className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
