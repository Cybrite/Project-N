import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function Fitarth() {
  return (
    <div className="flex flex-col sm:flex-row gap-1 justify-center items-center sm:mb-10 mb-20">
      <Card className="border border-white/20 hover:bg-white/10 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8 transition-all duration-300 relative overflow-hidden group cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="w-full max-w-md no-underline mx-4 sm:mx-0">
          <div className="flex flex-col items-center text-center relative z-10">
            <h3 className="text-2xl font-bold mb-4">FitronX</h3>
            <p className="text-gray-300 mb-6">Built for people, Backed by tech.</p>
            <Link href="/fitronx">
              <div className="flex items-center justify-center border border-white/20 rounded-full px-8 py-3 text-lg">
                <span>Explore FitronX</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
