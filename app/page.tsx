'use client'

import { useRouter } from 'next/navigation'
import { TrainFront } from 'lucide-react'
import { Pacifico } from "next/font/google"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400"
})

export default function WelcomePage() {

  const router = useRouter();

  return (
    <div
      className="min-h-screen flex items-center justify-center p-3 sm:p-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/train-station.jpg')" }}
    >

      {/* Main container */}
      <div className="relative w-full max-w-6xl rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">

        {/* Overlay */}
        <div className="absolute inset-0 bg-orange-100/60 backdrop-blur-sm"></div>

        {/* Content */}
        <div className="relative flex flex-col min-h-[85vh]">

          {/* Navbar */}
          <div className="flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 md:px-10 py-4 gap-3">

            {/* Left links */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-5 text-xs sm:text-sm">
              <span className="cursor-pointer hover:text-orange-300">Services</span>
              <span className="cursor-pointer hover:text-orange-300">Pricing</span>
              <span className="cursor-pointer hover:text-orange-300">Help</span>
            </div>

            {/* Logo */}
            <h1 className={`${pacifico.className} text-xl sm:text-2xl md:text-3xl text-orange-400 tracking-wider flex items-center gap-2`}>
              <TrainFront size={20} className="sm:w-6 sm:h-6" />
              RailPass
            </h1>

            {/* Button */}
            <button
              className="w-full md:w-auto border px-4 md:px-5 py-2 rounded-lg bg-white/70 hover:bg-orange-300 transition text-sm sm:text-base"
              onClick={() => router.push('/signup')}
            >
              Sign Up
            </button>

          </div>

          {/* Hero Section */}
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6">

            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-snug md:leading-tight">
              Effortless <span className="italic font-light">Train Booking</span>,
              <br />
              Smarter Journeys
            </h1>

            {/* Search Box */}
            <div className="mt-6 sm:mt-8 bg-white p-3 sm:p-4 rounded-2xl shadow-lg flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-4 w-full max-w-xl">

              <div className="px-3 sm:px-4 py-2 text-left">
                <p className="text-xs text-gray-500">From</p>
                <p className="font-semibold text-sm sm:text-base">Accra</p>
              </div>

              <div className="px-3 sm:px-4 py-2 md:border-l text-left">
                <p className="text-xs text-gray-500">To</p>
                <p className="font-semibold text-sm sm:text-base">Kumasi</p>
              </div>

              <button
                className="bg-orange-400 hover:bg-orange-300 text-white px-4 sm:px-6 py-2 md:py-3 rounded-xl w-full md:w-auto text-sm sm:text-base"
                onClick={() => router.push('/login')}
              >
                Login
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}