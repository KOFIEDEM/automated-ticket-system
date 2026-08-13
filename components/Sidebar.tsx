'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Ticket,
  PlusCircle,
  User,
  TrainFront,
  ChevronRight,
  Map,
} from 'lucide-react'
import { Pacifico } from 'next/font/google'

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: '400',
})

interface Props {
  isOpen: boolean
}

export default function Sidebar({ isOpen }: Props) {
  const pathname = usePathname()

  const menuItems = [
    {
      name: 'Dashboard',
      icon: Home,
      path: '/dashboard',
    },
    {
      name: 'My Tickets',
      icon: Ticket,
      path: '/dashboard/tickets',
    },
    {
      name: 'Book Ticket',
      icon: PlusCircle,
      path: '/dashboard/book-ticket',
    },
    {
      name: 'Profile',
      icon: User,
      path: '/dashboard/profile',
    },
  ]

  return (
    <aside
      className={`
        fixed md:static
        top-0 left-0
        z-50
        h-screen
        w-72
        shrink-0
        overflow-hidden
        text-white
        bg-gradient-to-b from-green-800 via-green-700 to-green-900
        shadow-2xl
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}
    >
      <div className="flex h-full flex-col">

        {/* ================= LOGO ================= */}
        <div className="border-b border-white/10 px-6 py-7">

          <div className="flex items-center justify-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-400 shadow-lg shadow-orange-900/30">
              <TrainFront
                size={27}
                className="text-white"
              />
            </div>

            <div>
              <h1
                className={`${pacifico.className} text-3xl tracking-wide`}
              >
                RailPass
              </h1>

              <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-green-200">
                Travel • Connect • Explore
              </p>
            </div>

          </div>

        </div>

        {/* ================= NAVIGATION ================= */}
        <div className="flex-1 overflow-y-auto px-4 py-7">

          <p className="mb-4 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-green-200">
            Main Menu
          </p>

          <nav className="space-y-2">

            {menuItems.map((item) => {
              const Icon = item.icon

              const isActive =
                pathname === item.path ||
                (
                  item.path !== '/dashboard' &&
                  pathname.startsWith(`${item.path}/`)
                )

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`
                    group relative flex items-center gap-3
                    rounded-xl px-3 py-3
                    transition-all duration-200
                    ${
                      isActive
                        ? 'bg-white text-green-800 shadow-lg'
                        : 'text-green-50 hover:bg-white/10 hover:text-white'
                    }
                  `}
                >

                  {/* Active indicator */}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-orange-400" />
                  )}

                  {/* Icon */}
                  <span
                    className={`
                      flex h-10 w-10 shrink-0 items-center justify-center rounded-xl
                      transition-all duration-200
                      ${
                        isActive
                          ? 'bg-orange-100 text-orange-500'
                          : 'bg-white/10 text-green-100 group-hover:bg-orange-400 group-hover:text-white'
                      }
                    `}
                  >
                    <Icon size={20} />
                  </span>

                  {/* Name */}
                  <span className="flex-1 text-sm font-medium">
                    {item.name}
                  </span>

                  {/* Arrow */}
                  <ChevronRight
                    size={17}
                    className={`
                      transition-transform duration-200
                      ${
                        isActive
                          ? 'text-green-600'
                          : 'text-green-300 group-hover:translate-x-1'
                      }
                    `}
                  />

                </Link>
              )
            })}

          </nav>

          {/* ================= QUICK BOOKING ================= */}
          <div className="mt-10">

            <p className="mb-4 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-green-200">
              Quick Access
            </p>

            <Link
              href="/dashboard/book-ticket"
              className="group block overflow-hidden rounded-2xl border border-orange-300/30 bg-gradient-to-br from-orange-400 to-orange-500 p-4 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-orange-950/30"
            >

              <div className="mb-3 flex items-center justify-between">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20">
                  <Map size={19} />
                </div>

                <PlusCircle
                  size={20}
                  className="transition-transform duration-300 group-hover:rotate-90"
                />

              </div>

              <p className="text-sm font-bold">
                Plan your next trip
              </p>

              <p className="mt-1 text-xs text-orange-100">
                Book your railway ticket quickly.
              </p>

            </Link>

          </div>

        </div>

        {/* ================= FOOTER ================= */}
        <div className="border-t border-white/10 p-4">

          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-400">
                <TrainFront size={17} />
              </div>

              <div className="min-w-0">

                <p className="text-sm font-semibold">
                  Safe Travels
                </p>

                <p className="truncate text-xs text-green-200">
                  Enjoy your journey with RailPass
                </p>

              </div>

            </div>

          </div>

          <p className="mt-3 text-center text-[10px] text-green-300">
            © 2026 RailPass
          </p>

        </div>

      </div>
    </aside>
  )
}