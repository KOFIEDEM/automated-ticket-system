'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Menu,
  Bell,
  ChevronDown,
  User,
  LogOut,
  TrainFront,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

interface Props {
  toggleSidebar: () => void
}

export default function Header({ toggleSidebar }: Props) {
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [name, setName] = useState('User')
  const [email, setEmail] = useState('')

  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        setName(
          user.user_metadata?.full_name ||
            user.email?.split('@')[0] ||
            'User'
        )

        setEmail(user.email || '')
      }
    }

    loadUser()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      )
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-100 bg-white/90 px-4 shadow-sm backdrop-blur-xl sm:px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="rounded-xl p-2.5 text-gray-600 transition hover:bg-orange-50 hover:text-orange-500"
        >
          <Menu size={23} />
        </button>

        <div className="hidden items-center gap-2 sm:flex">
          <div className="rounded-lg bg-orange-100 p-2 text-orange-500">
            <TrainFront size={19} />
          </div>

          <div>
            <h1 className="font-bold text-gray-800">
              Railway Ticket System
            </h1>

            <p className="text-xs text-gray-400">
              Travel smarter with RailPass
            </p>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Notification */}
        <button className="relative rounded-xl p-2.5 text-gray-500 transition hover:bg-orange-50 hover:text-orange-500">
          <Bell size={21} />

          <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[9px] font-bold text-white">
            10
          </span>
        </button>

        {/* Profile */}
        <div
          ref={dropdownRef}
          className="relative"
        >
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-gray-50"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 text-white shadow-sm">
              <User size={18} />
            </div>

            <div className="hidden text-left sm:block">
              <p className="max-w-[130px] truncate text-sm font-semibold text-gray-700">
                {name}
              </p>

              <p className="max-w-[130px] truncate text-xs text-gray-400">
                {email}
              </p>
            </div>

            <ChevronDown
              size={17}
              className={`text-gray-400 transition ${
                open ? 'rotate-180' : ''
              }`}
            />
          </button>

          {open && (
            <div className="absolute right-0 top-14 w-60 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">
              <div className="border-b border-gray-100 bg-orange-50 p-4">
                <p className="font-semibold text-gray-800">
                  {name}
                </p>

                <p className="mt-1 truncate text-xs text-gray-500">
                  {email}
                </p>
              </div>

              <div className="p-2">
                <Link
                  href="/dashboard/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-600 transition hover:bg-orange-50 hover:text-orange-500"
                >
                  <User size={18} />
                  View Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-red-500 transition hover:bg-red-50"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}