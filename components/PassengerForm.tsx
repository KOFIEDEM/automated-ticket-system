'use client'

import { useTicket } from '@/context/TicketContext'
import { ArrowRight, ArrowLeft } from 'lucide-react'

export default function PassengerForm({
  nextStep,
  prevStep,
}: any) {
  const { ticket, updateTicket } = useTicket()

  return (
    <div className="backdrop-blur-xl bg-green-50 border border-orange-400 shadow-lg p-6 rounded-lg w-full">

      {/* Passenger Name */}
      <div className="p-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Passenger Name
        </label>

        <input
          type="text"
          placeholder="Passenger Name"
          className="w-full border border-orange-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
          value={ticket.name}
          onChange={(e) =>
            updateTicket({
              name: e.target.value,
            })
          }
        />
      </div>

      {/* Number of Passengers */}
      <div className="p-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of Passengers
        </label>

        <input
          type="number"
          min="1"
          placeholder="Number of Passengers"
          className="w-full border border-orange-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
          value={ticket.passengers}
          onChange={(e) => {
            const value = Number(e.target.value)

            updateTicket({
              passengers: value < 1 ? 1 : value,
            })
          }}
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between p-5">

        <button
          type="button"
          onClick={prevStep}
          className="px-4 py-2 text-red-400 hover:text-red-500 transition-transform hover:scale-110 flex items-center gap-2"
        >
          <ArrowLeft size={30} />
          Back
        </button>

        <button
          type="button"
          onClick={nextStep}
          className="px-4 py-2 text-green-400 hover:text-green-500 transition-transform hover:scale-110 flex items-center gap-2"
        >
          Next
          <ArrowRight size={30} />
        </button>

      </div>

    </div>
  )
}