'use client'

import { ArrowLeft, ArrowRight, Users } from 'lucide-react'
import { useTicket } from '@/context/TicketContext'

interface Props {
  nextStep: () => void
  prevStep: () => void
}

export default function PassengerForm({
  nextStep,
  prevStep,
}: Props) {
  const { ticket, updateTicket } = useTicket()

  const canContinue =
    ticket.name.trim().length > 0 &&
    ticket.passengers > 0

  return (
    <div className="w-full rounded-2xl border border-orange-200 bg-gradient-to-br from-green-50 via-white to-orange-50 p-4 shadow-xl sm:p-6">
      <div className="mb-6">
        <p className="text-sm font-medium text-orange-500">
          STEP 2 OF 3
        </p>

        <h2 className="mt-1 text-2xl font-bold text-gray-800">
          Passenger Details
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Tell us who will be travelling.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Passenger Name
          </label>

          <input
            type="text"
            placeholder="Enter passenger name"
            value={ticket.name}
            onChange={(e) =>
              updateTicket({ name: e.target.value })
            }
            className="w-full rounded-xl border border-orange-300 bg-white p-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
          />
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Users size={17} className="text-orange-500" />
            Number of Passengers
          </label>

          <input
            type="number"
            min="1"
            max="10"
            value={ticket.passengers || 1}
            onChange={(e) =>
              updateTicket({
                passengers: Math.max(
                  1,
                  Math.min(10, Number(e.target.value))
                ),
              })
            }
            className="w-full rounded-xl border border-orange-300 bg-white p-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
          />

          <p className="mt-1 text-xs text-gray-400">
            Maximum of 10 passengers per booking.
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Travel Class
          </label>

          <select
            value={ticket.classType}
            onChange={(e) =>
              updateTicket({
                classType: e.target.value,
              })
            }
            className="w-full rounded-xl border border-orange-300 bg-white p-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
          >
            <option value="Economy">Economy</option>
            <option value="Business">Business</option>
          </select>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={prevStep}
          className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 font-semibold text-gray-600 transition hover:bg-gray-50"
        >
          <ArrowLeft size={19} />
          Back
        </button>

        <button
          type="button"
          disabled={!canContinue}
          onClick={nextStep}
          className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white shadow-lg transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          Review
          <ArrowRight size={19} />
        </button>
      </div>
    </div>
  )
}