'use client'

import { useRouter } from 'next/navigation'
import { TrainFront } from 'lucide-react'
import { Pacifico} from "next/font/google"

const  pacifico =  Pacifico({
  subsets: ["latin"],
  weight: "400"
})

export default function WelcomePage() {

  const router = useRouter();

  return (
    <div className="min-h-screen  flex items-center justify-center p-6 bg-contain"
    style={{ backgroundImage: "url('/train-station.jpg')" }}
    >

      {/* Main container */}
      <div
        className="relative w-full max-w-6xl h-[80vh] rounded-3xl overflow-hidden shadow-2xl"
        
      >

        {/* Overlay */}
        <div className="absolute inset-0 bg-orange-100/60 backdrop-blur-sm"></div>

        {/* Content */}
        <div className="relative h-full flex flex-col">

          {/* Navbar */}
          <div className="flex justify-between items-center px-10 py-6">
            
            <div className="flex gap-6 text-sm">
              <span className="cursor-pointer hover:text-orange-300">Services</span>
              <span className="cursor-pointer hover:text-orange-300">Pricing</span>
              <span className="cursor-pointer hover:text-orange-300">Help</span>
            </div>

            <h1 className={`${pacifico.className} text-3xl text-orange-400 tracking-wider flex items-center justify-center`}>
          <TrainFront size={28} />
             RailPass
          </h1>

            <button className="border px-5 py-2 rounded-lg bg-white/70 hover:bg-orange-300 transition"
            onClick={() => router.push('/signup')}>
              Sign Up
            </button>

          </div>

          {/* Hero Section */}
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">

            <h1 className="text-5xl font-bold leading-tight">
              Effortless <span className="italic font-light">Train Booking</span>,
              <br />
              Smarter Journeys
            </h1>

            {/* Search Box */}
            <div className="mt-10 bg-white p-3 rounded-2xl shadow-lg flex items-center gap-4">

              <div className="px-4 py-3">
                <p className="text-xs text-gray-500">From</p>
                <p className="font-semibold">Accra</p>
              </div>

              <div className="px-4 py-3 border-l">
                <p className="text-xs text-gray-500">To</p>
                <p className="font-semibold">Kumasi</p>
              </div>

              <button className="bg-orange-400 hover:bg-orange-300 text-white px-8 py-3 rounded-xl"
              onClick={() => router.push('/login')}>
                Login
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}