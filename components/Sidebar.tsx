'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Ticket, PlusCircle, User, TrainFront } from 'lucide-react'
import { Pacifico} from "next/font/google"

const  pacifico =  Pacifico({
  subsets: ["latin"],
  weight: "400"
}) 

interface Props {
  isOpen: boolean
}

export default function Sidebar({ isOpen }: Props) {

  const pathname = usePathname()

  const menuItems = [
    {
      name: "Dashboard",
      icon: Home,
      path: "/dashboard",
    },
    {
      name: "My Tickets",
      icon: Ticket,
      path: "/dashboard/tickets",
    },
    {
      name: "Book Ticket",
      icon: PlusCircle,
      path: "/dashboard/book-ticket",
    },
    {
      name: "Profile",
      icon: User,
      path: "/dashboard/profile",
    },
  ]


   return (
    <div
      className={`
        fixed md:static top-0 left-0 h-full bg-orange-400 text-white
        transition-transform duration-300 z-50

        w-64 p-4 overflow-y-auto

        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}
    >

      {/* Logo */}
      <div className="mb-10">
        <h1 className={`${pacifico.className} text-3xl tracking-wider flex items-center justify-center gap-2`}>
          <TrainFront size={28} />
          RailPass
        </h1>
      </div>

      {/* Navigation */}
      <nav className="space-y-3">
        {menuItems.map((item, index) => {
          const Icon = item.icon
          const isActive = pathname === item.path

          return (
            <Link
              key={index}
              href={item.path}
              className={`
                flex items-center gap-3 p-3 rounded transition-colors
                ${isActive
                  ? "bg-green-200 text-orange-400 font-semibold"
                  : "hover:bg-white hover:text-orange-400"}
              `}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}