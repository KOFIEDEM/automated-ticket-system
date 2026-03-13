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
      className={`bg-orange-400 text-white transition-all duration-300
      ${isOpen ? "w-64" : "w-20"} h-screen p-4`}
    >

      {/* Logo */}

      <div className="mb-10 ">

        {isOpen ? (
          <h1 className={`${pacifico.className} text-3xl tracking-wider flex items-center justify-center`}>
          <TrainFront size={28} />
             RailPass
          </h1>
        ) : (
          <span className="text-xl font-bold flex items-center justify-center">
            <TrainFront size={28} />
          </span>
        )}

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
                flex items-center p-3 rounded transition-colors
                ${isOpen ? "gap-3" : "justify-center"}
                ${isActive
                  ? "bg-green-200 text-orange-400 font-semibold"
                  : "hover:bg-white hover:text-orange-400"}
              `}
            >

              <Icon size={20} />

              {isOpen && <span>{item.name}</span>}

            </Link>
          )
        })}

      </nav>

    </div>
  )
}