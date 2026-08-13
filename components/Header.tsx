'use client'

import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import {
  Menu,
  Bell,
  ChevronDown,
  User,
  LogOut,
  Search,
  TrainFront,
} from 'lucide-react'
import Link from 'next/link'

interface Props {
  toggleSidebar: () => void
}

export default function Header({ toggleSidebar }: Props) {
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const notificationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setOpen(false)
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(target)
      ) {
        setNotificationsOpen(false)
      }
    }

    document.addEventListener(
      'mousedown',
      handleClickOutside
    )

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      )
    }
  }, [])

  const handleLogout = () => {
    setOpen(false)
    router.push('/login')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-xl">

      <div className="flex h-[76px] items-center justify-between px-3 sm:px-5 lg:px-7">

        {/* ================= LEFT ================= */}
        <div className="flex items-center gap-3 sm:gap-5">

          {/* Mobile Menu */}
          <button
            type="button"
            onClick={toggleSidebar}
            className="
              flex h-10 w-10 items-center justify-center
              rounded-xl
              border border-gray-200
              bg-gray-50
              text-gray-600
              transition-all
              hover:border-orange-200
              hover:bg-orange-50
              hover:text-orange-500
              active:scale-95
            "
            aria-label="Toggle sidebar"
          >
            <Menu size={21} />
          </button>

          {/* Brand */}
          <div className="hidden sm:flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-700 shadow-md shadow-green-900/20">
              <TrainFront
                size={21}
                className="text-white"
              />
            </div>

            <div>
              <h1 className="text-sm font-bold text-gray-800 sm:text-base">
                Railway Ticket System
              </h1>

              <p className="hidden text-[11px] text-gray-400 sm:block">
                Manage your journeys with ease
              </p>
            </div>

          </div>

          {/* Mobile Brand */}
          <div className="flex items-center gap-2 sm:hidden">

            <TrainFront
              size={21}
              className="text-green-700"
            />

            <span className="font-bold text-gray-800">
              RailPass
            </span>

          </div>

        </div>

        {/* ================= RIGHT ================= */}
        <div className="flex items-center gap-2 sm:gap-4">

          {/* Search */}
          <div className="relative hidden md:block">

            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search tickets..."
              className="
                h-10
                w-48 lg:w-64
                rounded-xl
                border border-gray-200
                bg-gray-50
                pl-9 pr-4
                text-sm
                text-gray-700
                placeholder:text-gray-400
                outline-none
                transition-all
                focus:border-orange-300
                focus:bg-white
                focus:ring-2
                focus:ring-orange-100
              "
            />

          </div>

          {/* Notifications */}
          <div
            ref={notificationRef}
            className="relative"
          >

            <button
              type="button"
              onClick={() =>
                setNotificationsOpen(!notificationsOpen)
              }
              className="
                relative
                flex h-10 w-10
                items-center justify-center
                rounded-xl
                border border-gray-200
                bg-gray-50
                text-gray-600
                transition-all
                hover:border-orange-200
                hover:bg-orange-50
                hover:text-orange-500
              "
              aria-label="Notifications"
            >

              <Bell size={19} />

              {/* Notification Badge */}
              <span className="
                absolute
                -right-1
                -top-1
                flex
                h-5
                min-w-5
                items-center
                justify-center
                rounded-full
                border-2
                border-white
                bg-orange-500
                px-1
                text-[9px]
                font-bold
                text-white
              ">
                10
              </span>

            </button>

            {/* Notification Dropdown */}
            {notificationsOpen && (
              <div className="
                absolute
                right-0
                top-14
                w-72
                overflow-hidden
                rounded-2xl
                border
                border-gray-200
                bg-white
                shadow-2xl
              ">

                <div className="border-b border-gray-100 px-4 py-4">

                  <div className="flex items-center justify-between">

                    <h3 className="font-semibold text-gray-800">
                      Notifications
                    </h3>

                    <span className="rounded-full bg-orange-100 px-2 py-1 text-[10px] font-semibold text-orange-600">
                      10 New
                    </span>

                  </div>

                </div>

                <div className="p-3">

                  <div className="rounded-xl bg-green-50 p-3">

                    <div className="flex gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-700 text-white">
                        <TrainFront size={17} />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          Welcome to RailPass
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          Your railway dashboard is ready.
                        </p>
                      </div>

                    </div>

                  </div>

                </div>

                <button
                  type="button"
                  className="w-full border-t border-gray-100 px-4 py-3 text-center text-xs font-medium text-green-700 hover:bg-gray-50"
                  onClick={() =>
                    setNotificationsOpen(false)
                  }
                >
                  Mark all as read
                </button>

              </div>
            )}

          </div>

          {/* Profile */}
          <div
            ref={dropdownRef}
            className="relative"
          >

            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-gray-200
                bg-gray-50
                p-1.5
                pr-2
                transition-all
                hover:border-orange-200
                hover:bg-orange-50
              "
            >

              <div className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                bg-gradient-to-br
                from-orange-400
                to-orange-500
                text-white
                shadow-sm
              ">
                <User size={17} />
              </div>

              <div className="hidden text-left sm:block">

                <p className="text-xs font-semibold text-gray-800">
                  KOFI EDEM
                </p>

                <p className="text-[10px] text-gray-400">
                  Passenger
                </p>

              </div>

              <ChevronDown
                size={16}
                className={`
                  hidden
                  text-gray-400
                  transition-transform
                  sm:block
                  ${open ? 'rotate-180' : ''}
                `}
              />

            </button>

            {/* Profile Dropdown */}
            {open && (
              <div className="
                absolute
                right-0
                top-14
                w-56
                overflow-hidden
                rounded-2xl
                border
                border-gray-200
                bg-white
                shadow-2xl
              ">

                {/* User */}
                <div className="border-b border-gray-100 bg-green-50 px-4 py-4">

                  <p className="text-sm font-bold text-gray-800">
                    KOFI EDEM
                  </p>

                  <p className="text-xs text-gray-500">
                    Railway Passenger
                  </p>

                </div>

                <div className="p-2">

                  <Link
                    href="/dashboard/profile"
                    onClick={() => setOpen(false)}
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-2.5
                      text-sm
                      text-gray-700
                      transition-colors
                      hover:bg-green-50
                      hover:text-green-700
                    "
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-700">
                      <User size={16} />
                    </span>

                    <span>
                      View Profile
                    </span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-2.5
                      text-left
                      text-sm
                      text-red-500
                      transition-colors
                      hover:bg-red-50
                    "
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500">
                      <LogOut size={16} />
                    </span>

                    <span>
                      Logout
                    </span>
                  </button>

                </div>

              </div>
            )}

          </div>

        </div>

      </div>

    </header>
  )
}