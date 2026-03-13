'use client'

import { useTicket } from '@/context/TicketContext'
import { ArrowRight, ArrowLeft } from 'lucide-react'

export default function SeatSelection({ nextStep, prevStep }: any) {

  const { ticket, updateTicket } = useTicket()

  return (
    <div className="backdrop-blur-xl bg-green-50 border border-orange-400 shadow-lg p-6 rounded-lg w-full">

      <div className='p-5'>
        <label className="block text-sm font-medium text-gray-700">Select Seat:</label>
      <select
        className="w-full border border-orange-400 p-2 rounded"
        value={ticket.classType}
        onChange={(e) =>
          updateTicket({ classType: e.target.value })
        }
      >

        <option value="">Select Class</option>
        <option value="Economy">Economy</option>
        <option value="Business">Business</option>
        <option value="First Class">First Class</option>

      </select>
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
          onClick={nextStep}
          className="px-4 py-2 text-green-400 hover:text-green-400 transition-transform hover:scale-120"
        >
          <ArrowRight size={30} className="rounded-3xl" />
          Next
        </button>

      </div>

    </div>
  )
}