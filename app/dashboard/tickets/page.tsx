'use client'

import AllTickets from '@/components/TicketHistory'

export default function TicketsPage() {
  return (
    <div className="p-3 sm:p-6">

      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">
        My Tickets
      </h1>

      <div className="w-full overflow-x-auto rounded-lg p-3 sm:p-4">
        <AllTickets />
      </div>

    </div>
  )
}