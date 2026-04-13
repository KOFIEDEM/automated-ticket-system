'use client'

import TicketCard from '@/components/TicketCard'
import { useTicket } from '@/context/TicketContext'

export default function TicketSuccessPage() {

  const { ticket } = useTicket()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      <div className="w-full max-w-md sm:max-w-lg">
        <TicketCard ticket={ticket} />
      </div>

    </div>
  )
}