'use client'

import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { Menu, Bell, ChevronDown, User, LogOut } from 'lucide-react'
import Link from 'next/link'

interface Props {
  toggleSidebar: () => void
}

export default function Header({ toggleSidebar }: Props) {

  const router = useRouter();
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setOpen(!open)
  }

  // close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <header className="flex items-center justify-between bg-white shadow px-6 py-4">

      {/* LEFT SECTION */}

      <div className="flex items-center gap-4">

        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-200 rounded"
        >
          <Menu size={22} />
        </button>

        <h1 className="font-semibold text-lg text-orange-400">
          Railway Ticket System
        </h1>

      </div>

      {/* RIGHT SECTION */}

      <div className="flex items-center gap-6">

        {/* Search */}

        <input
          type="text"
          placeholder="Search..."
          className="hidden md:block border rounded-lg px-3 py-1 text-sm"
        />

        {/* Notification */}

        <button className="relative p-2 hover:bg-gray-200 rounded">

          <Bell size={20} className='hover:text-orange-400' />

          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded">
            10
          </span>

        </button>

        {/* Profile Dropdown */}

        <div
          className="relative flex items-center gap-2 cursor-pointer"
          onClick={toggleDropdown}
          ref={dropdownRef}
        >

          <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center">
            <User size={16} />
          </div>

          <ChevronDown size={18} className='hover:bg-green-50' />

          {/* Dropdown */}

          {open && (

            <div className="absolute right-0 top-12 w-40 bg-white shadow-lg rounded-lg border">

              <Link
                href="/dashboard/profile"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
              >
                <User size={16} />
                View Profile
              </Link>

              <button
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left text-red-500"
                onClick={() => router.push('/login')}>
                <LogOut size={16} />
                Logout
              </button>
              

            </div>

          )}

        </div>

      </div>

    </header>
  )
}