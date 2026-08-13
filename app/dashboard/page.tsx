'use client'

import { useEffect, useState } from 'react'
import DashboardCard from '@/components/DashboardCard'
import TicketTable from '@/components/TicketTable'
import { getTickets, SavedTicket } from '@/src/lib/ticketStorage'

export default function DashboardPage() {
  const [tickets, setTickets] = useState<SavedTicket[]>([])

  useEffect(() => {
    setTickets(getTickets())
  }, [])

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const upcomingTrips = tickets.filter((ticket) => {
    const travelDate = new Date(ticket.date)
    travelDate.setHours(0, 0, 0, 0)

    return travelDate >= today
  }).length

  const completedTrips = tickets.filter((ticket) => {
    const travelDate = new Date(ticket.date)
    travelDate.setHours(0, 0, 0, 0)

    return travelDate < today
  }).length

  return (
    <div className="w-full max-w-full overflow-x-hidden p-3 sm:p-6">

      {/* Heading */}
      <div className="mb-6 sm:mb-8">

        <p className="text-sm font-medium text-green-600 mb-1">
          Railway Dashboard
        </p>

        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
          Welcome, KOFI EDEM
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your railway tickets and upcoming journeys.
        </p>

      </div>

      {/* Stats */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-3
          sm:gap-6
          mb-6
          sm:mb-10
          w-full
        "
      >

        <DashboardCard
          title="Total Tickets"
          value={String(tickets.length)}
        />

        <DashboardCard
          title="Upcoming Trips"
          value={String(upcomingTrips)}
        />

        <DashboardCard
          title="Completed Trips"
          value={String(completedTrips)}
        />

      </div>

      {/* Recent Tickets */}
      <div className="w-full">

        <TicketTable />

      </div>

    </div>
  )
}