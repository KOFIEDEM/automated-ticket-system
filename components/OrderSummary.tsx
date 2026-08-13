'use client'

import { useRouter } from 'next/navigation'
import { useTicket } from '@/context/TicketContext'
import { ArrowLeft } from 'lucide-react'
import { calculateTicketPrice } from '../src/lib/ghanaCities'
import { saveTicket } from '../src/lib/ticketStorage'

export default function OrderSummary({ prevStep }: any) {
  const { ticket } = useTicket()
  const router = useRouter()

  const pricePerPassenger = calculateTicketPrice(
    ticket.departure,
    ticket.destination
  )

  const passengers = Number(ticket.passengers) || 1

  const totalPrice =
    pricePerPassenger * passengers

  const handleGenerateTicket = () => {
    const savedTicket = saveTicket(ticket)

    // Save the generated ticket ID so the success
    // page/ticket card can use the same ID.
    localStorage.setItem(
      'latestTicket',
      JSON.stringify(savedTicket)
    )

    router.push('/dashboard/ticket-success')
  }

  return (
    <div className="backdrop-blur-xl bg-green-50 border border-orange-400 shadow-lg p-6 rounded-2xl w-full">

      <div className="space-y-5 p-5">

        {/* Header */}
        <div>
          <p className="text-sm font-medium text-orange-500">
            Final Review
          </p>

          <h2 className="text-2xl font-bold text-gray-800">
            Ticket Summary
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Review your journey details before generating your ticket.
          </p>
        </div>

        {/* Journey */}
        <div className="rounded-xl bg-white border border-orange-200 p-5">

          <p className="text-xs uppercase tracking-wider text-gray-400 mb-4">
            Journey
          </p>

          <div className="flex items-center justify-between gap-4">

            <div>
              <p className="text-xs text-gray-400">
                From
              </p>

              <p className="text-lg font-bold text-gray-800">
                {ticket.departure || 'N/A'}
              </p>
            </div>

            <div className="h-9 w-9 shrink-0 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
              →
            </div>

            <div className="text-right">
              <p className="text-xs text-gray-400">
                To
              </p>

              <p className="text-lg font-bold text-gray-800">
                {ticket.destination || 'N/A'}
              </p>
            </div>

          </div>

          <div className="mt-4 pt-4 border-t border-dashed border-gray-200">

            <p className="text-xs text-gray-400">
              Departure Date
            </p>

            <p className="font-semibold text-gray-800">
              {ticket.date || 'N/A'}
            </p>

          </div>

        </div>

        {/* Passenger Details */}
        <div className="rounded-xl bg-white border border-orange-200 p-5">

          <p className="text-xs uppercase tracking-wider text-gray-400 mb-4">
            Passenger Details
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <p className="text-xs text-gray-400">
                Passenger
              </p>

              <p className="font-semibold text-gray-800">
                {ticket.name || 'N/A'}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Number of Passengers
              </p>

              <p className="font-semibold text-gray-800">
                {passengers}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Class
              </p>

              <p className="font-semibold text-gray-800 capitalize">
                {ticket.classType || 'Economy'}
              </p>
            </div>

          </div>

        </div>

        {/* Price */}
        <div className="rounded-xl bg-green-700 text-white p-5">

          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-green-100">
              Price per passenger
            </span>

            <span className="font-medium">
              ₵{pricePerPassenger.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-green-100">
              Passengers
            </span>

            <span className="font-medium">
              × {passengers}
            </span>
          </div>

          <div className="border-t border-green-500 pt-4 flex justify-between items-center">
            <span className="font-semibold">
              Total Fare
            </span>

            <span className="text-2xl font-bold">
              ₵{totalPrice.toFixed(2)}
            </span>
          </div>

        </div>

      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center p-5">

        <button
          type="button"
          onClick={prevStep}
          className="px-4 py-2 text-red-400 hover:text-red-500 transition-transform hover:scale-110 flex items-center gap-2"
        >
          <ArrowLeft size={28} />
          Back
        </button>

        <button
          type="button"
          onClick={handleGenerateTicket}
          className="bg-orange-400 hover:bg-orange-500 text-white px-5 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all"
        >
          Generate Ticket
        </button>

      </div>

    </div>
  )
}