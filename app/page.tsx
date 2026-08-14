'use client'

import { useRouter } from 'next/navigation'
import {
  TrainFront,
  ArrowRight,
  MapPin,
  ShieldCheck,
  Clock3,
  Ticket,
  ChevronRight,
} from 'lucide-react'
import { Pacifico } from 'next/font/google'

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: '400',
})

export default function WelcomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-950">

      {/* Background */}
      <div
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/train-station.jpg')",
        }}
      >

        {/* Background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-950/90 via-green-900/70 to-orange-950/60" />

        {/* Main content */}
        <div className="relative min-h-screen px-4 py-5 sm:px-6 lg:px-10">

          <div className="mx-auto flex min-h-[calc(100vh-40px)] max-w-7xl flex-col">

            {/* Navbar */}
            <header className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/10 px-4 py-3 shadow-xl backdrop-blur-xl sm:px-6">

              {/* Logo */}
              <button
                onClick={() => router.push('/')}
                className="flex items-center gap-2"
              >

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-400 text-white shadow-lg">
                  <TrainFront size={22} />
                </div>

                <span
                  className={`${pacifico.className} text-2xl text-white sm:text-3xl`}
                >
                  RailPass
                </span>

              </button>

              {/* Navigation */}
              <nav className="hidden items-center gap-8 text-sm text-white/80 md:flex">

                <button className="transition hover:text-white">
                  Services
                </button>

                <button className="transition hover:text-white">
                  Pricing
                </button>

                <button className="transition hover:text-white">
                  Help
                </button>

              </nav>

              {/* Auth buttons */}
              <div className="flex items-center gap-2 sm:gap-3">

                <button
                  onClick={() => router.push('/login')}
                  className="hidden rounded-xl px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 sm:block"
                >
                  Login
                </button>

                <button
                  onClick={() => router.push('/signup')}
                  className="rounded-xl bg-orange-400 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-orange-300 hover:shadow-orange-400/30"
                >
                  Sign Up
                </button>

              </div>

            </header>

            {/* Hero */}
            <main className="flex flex-1 items-center justify-center py-12">

              <div className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-16">

                {/* Hero text */}
                <div className="text-center lg:text-left">

                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-md">

                    <span className="h-2 w-2 rounded-full bg-orange-400" />

                    Simple. Fast. Reliable train booking.

                  </div>

                  <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">

                    Your journey
                    <br />

                    <span className="text-orange-300">
                      starts here.
                    </span>

                  </h1>

                  <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/75 sm:text-base lg:mx-0">

                    Book your railway tickets across Ghana with ease.
                    Choose your route, select your travel date and
                    get your digital ticket in just a few steps.

                  </p>

                  {/* Features */}
                  <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:max-w-xl">

                    <div className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-3 text-xs text-white backdrop-blur-md lg:justify-start">

                      <ShieldCheck size={17} className="text-orange-300" />

                      Secure Booking

                    </div>

                    <div className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-3 text-xs text-white backdrop-blur-md lg:justify-start">

                      <Clock3 size={17} className="text-orange-300" />

                      Fast & Easy

                    </div>

                    <div className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-3 text-xs text-white backdrop-blur-md lg:justify-start">

                      <Ticket size={17} className="text-orange-300" />

                      Digital Tickets

                    </div>

                  </div>

                </div>

                {/* Booking Card */}
                <div className="mx-auto w-full max-w-md">

                  <div className="rounded-3xl border border-white/20 bg-white/95 p-5 shadow-2xl backdrop-blur-xl sm:p-7">

                    <div className="mb-6">

                      <div className="mb-2 flex items-center gap-2">

                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-100 text-green-700">
                          <TrainFront size={19} />
                        </div>

                        <p className="text-sm font-semibold text-gray-800">
                          Plan your journey
                        </p>

                      </div>

                      <p className="text-xs text-gray-500">
                        Start your railway booking in seconds.
                      </p>

                    </div>

                    {/* From */}
                    <div className="mb-3 rounded-2xl border border-gray-200 bg-gray-50 p-4 transition focus-within:border-orange-400">

                      <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-600">
                          <MapPin size={17} />
                        </div>

                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                            From
                          </p>

                          <p className="text-sm font-bold text-gray-800">
                            Accra
                          </p>
                        </div>

                      </div>

                    </div>

                    {/* To */}
                    <div className="mb-5 rounded-2xl border border-gray-200 bg-gray-50 p-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                          <MapPin size={17} />
                        </div>

                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                            To
                          </p>

                          <p className="text-sm font-bold text-gray-800">
                            Kumasi
                          </p>
                        </div>

                      </div>

                    </div>

                    {/* Route display */}
                    <div className="mb-5 flex items-center gap-3">

                      <div className="h-px flex-1 bg-gray-200" />

                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50 text-green-600">
                        <ArrowRight size={17} />
                      </div>

                      <div className="h-px flex-1 bg-gray-200" />

                    </div>

                    {/* Login button */}
                    <button
                      onClick={() => router.push('/login')}
                      className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-green-800 hover:shadow-green-700/30"
                    >

                      Book Your Ticket

                      <ChevronRight
                        size={18}
                        className="transition-transform group-hover:translate-x-1"
                      />

                    </button>

                    <p className="mt-4 text-center text-[11px] text-gray-400">
                      Login or create an account to continue
                    </p>

                  </div>

                </div>

              </div>

            </main>

            {/* Footer */}
            <footer className="border-t border-white/10 py-4 text-center text-xs text-white/50">

              © {new Date().getFullYear()} RailPass · Ghana Railway Ticketing

            </footer>

          </div>

        </div>

      </div>

    </div>
  )
}