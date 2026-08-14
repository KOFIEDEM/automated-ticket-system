'use client'

import { useEffect, useState } from 'react'
import { CalendarDays, Ticket, User } from 'lucide-react'
import DashboardCard from '@/components/DashboardCard'
import TicketTable from '@/components/TicketTable'
import { supabase } from '@/lib/supabaseClient'
import {
  getTickets,
  StoredTicket,
} from '@/src/lib/ticketStorage'

export default function DashboardPage() {
  const [name, setName] = useState('User')
  const [tickets, setTickets] = useState<StoredTicket[]>([])

  useEffect(() => {
    const loadDashboard = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      const fullName =
        user?.user_metadata?.full_name ||
        user?.email?.split('@')[0] ||
        'User'

      setName(fullName)

      setTickets(getTickets())
    }

    loadDashboard()
  }, [])

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const upcomingTrips = tickets.filter((ticket) => {
    const tripDate = new Date(ticket.date)
    return tripDate >= today
  }).length

  const completedTrips = tickets.filter((ticket) => {
    const tripDate = new Date(ticket.date)
    return tripDate < today
  }).length

  return (
    <div className="w-full overflow-x-hidden">
      {/* Welcome */}
      <div className="mb-6 rounded-3xl bg-gradient-to-r from-orange-500 to-orange-400 p-6 text-white shadow-lg sm:p-8">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-white/20 p-3 backdrop-blur">
            <User size={28} />
          </div>

          <div>
            <p className="text-sm text-orange-100">
              Welcome back
            </p>

            <h1 className="text-2xl font-bold sm:text-3xl">
              {name}
            </h1>

            <p className="mt-1 text-sm text-orange-100">
              Ready for your next journey?
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Total Tickets"
          value={tickets.length}
          description="All tickets you've generated"
        />

        <DashboardCard
          title="Upcoming Trips"
          value={upcomingTrips}
          description="Your upcoming journeys"
        />

        <DashboardCard
          title="Completed Trips"
          value={completedTrips}
          description="Journeys you've completed"
        />
      </div>

      {/* Quick information */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
          <div className="mb-3 inline-flex rounded-xl bg-orange-100 p-3 text-orange-500">
            <Ticket size={21} />
          </div>

          <h3 className="font-bold text-gray-800">
            Book a Ticket
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Choose your Ghanaian departure and destination cities.
          </p>
        </div>

        <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
          <div className="mb-3 inline-flex rounded-xl bg-green-100 p-3 text-green-600">
            <CalendarDays size={21} />
          </div>

          <h3 className="font-bold text-gray-800">
            Plan Your Journey
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Keep track of your upcoming railway journeys.
          </p>
        </div>
      </div>

      {/* Recent Tickets */}
      <TicketTable />
    </div>
  )
}