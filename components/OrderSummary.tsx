'use client'

import { useRouter } from 'next/navigation'
import { useTicket } from '@/context/TicketContext'
import { ArrowLeft } from 'lucide-react'

export default function OrderSummary({ prevStep }: any) {

  const { ticket } = useTicket()
  const router = useRouter()

  const totalPrice = ticket.passengers * 40

  return (
    <div className="backdrop-blur-xl bg-green-50 border border-orange-400 shadow-lg p-6 rounded-lg w-full ">

      <div className='space-y-3 p-5'>
      <h2 className="text-xl font-bold">
        Ticket Summary
      </h2>

      <p>From: {ticket.departure}</p>
      <p>To: {ticket.destination}</p>
      <p>Date: {ticket.date}</p>
      <p>Name: {ticket.name}</p>
      <p>Passengers: {ticket.passengers}</p>
      <p>Class: {ticket.classType}</p>

      <p className="font-bold">
        Total: ${totalPrice}
      </p>
      </div>

      <div className="flex justify-between p-5">

        <button
          onClick={prevStep}
          className="px-4 py-2 text-red-400 hover:text-red-400 transition-transform hover:scale-120"
        >
          <ArrowLeft size={30} className="rounded-3xl" />
          Back
        </button>

        <button
          onClick={() => router.push('/dashboard/ticket-success')}
          className="bg-orange-400 text-white px-4 py-2 rounded"
        >
          Generate Ticket
        </button>

      </div>

    </div>
  )
}