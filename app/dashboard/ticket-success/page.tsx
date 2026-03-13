'use client'

import TicketCard from '@/components/TicketCard'
import { useTicket } from '@/context/TicketContext'

export default function TicketSuccessPage() {

  const { ticket } = useTicket()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <TicketCard ticket={ticket} />

    </div>
  )
}