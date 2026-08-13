'use client'

import { useEffect, useState } from 'react'
import {
  TrainFront,
  CalendarDays,
  Users,
  Ticket,
  ArrowRight,
  ReceiptText,
} from 'lucide-react'

import {
  getTickets,
  SavedTicket,
} from '../src/lib/ticketStorage'

export default function Tickets() {
  const [tickets, setTickets] = useState<SavedTicket[]>([])

  useEffect(() => {
    setTickets(getTickets())
  }, [])

  return (
    <div className="w-full">

      {/* Header */}
      <div className="mb-6">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700">
            <ReceiptText size={23} />
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              Ticket History
            </h2>

            <p className="text-sm text-gray-500">
              View all your previous railway tickets.
            </p>
          </div>

        </div>

      </div>

      {/* Empty State */}
      {tickets.length === 0 && (
        <div className="rounded-2xl border border-dashed border-orange-300 bg-green-50 p-10 text-center">

          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-500">
            <Ticket size={26} />
          </div>

          <h3 className="font-semibold text-gray-800">
            No tickets yet
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Your generated tickets will appear here.
          </p>

        </div>
      )}

      {/* Desktop */}
      {tickets.length > 0 && (
        <div className="hidden md:block">

          <div className="overflow-hidden rounded-2xl border border-orange-200 bg-white shadow-lg">

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>
                  <tr className="bg-green-700 text-white text-left">
                    <th className="px-5 py-4 text-sm font-medium">
                      Ticket
                    </th>

                    <th className="px-5 py-4 text-sm font-medium">
                      Journey
                    </th>

                    <th className="px-5 py-4 text-sm font-medium">
                      Date
                    </th>

                    <th className="px-5 py-4 text-sm font-medium">
                      Class
                    </th>

                    <th className="px-5 py-4 text-sm font-medium">
                      Passengers
                    </th>

                    <th className="px-5 py-4 text-sm font-medium">
                      Fare
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {tickets.map((ticket, index) => (
                    <tr
                      key={ticket.id}
                      className={`border-b border-gray-100 hover:bg-orange-50/50 transition-colors ${
                        index % 2 === 0
                          ? 'bg-white'
                          : 'bg-gray-50/50'
                      }`}
                    >

                      <td className="px-5 py-4">
                        <p className="font-mono text-sm font-bold text-green-700">
                          #{ticket.id}
                        </p>

                        <p className="text-xs text-gray-400 mt-1">
                          {ticket.name}
                        </p>
                      </td>

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-800">
                            {ticket.departure}
                          </span>

                          <ArrowRight
                            size={15}
                            className="text-orange-400"
                          />

                          <span className="font-semibold text-gray-800">
                            {ticket.destination}
                          </span>
                        </div>

                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CalendarDays size={16} />
                          {ticket.date}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700 capitalize">
                          {ticket.classType}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users size={16} />
                          {ticket.passengers}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="font-bold text-green-700">
                          ₵{ticket.totalPrice.toFixed(2)}
                        </span>
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>
      )}

      {/* Mobile */}
      {tickets.length > 0 && (
        <div className="md:hidden space-y-4">

          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="overflow-hidden rounded-2xl border border-orange-200 bg-white shadow-lg"
            >

              {/* Card Header */}
              <div className="bg-gradient-to-r from-green-700 to-green-600 px-4 py-4 text-white">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20">
                      <TrainFront size={19} />
                    </div>

                    <div>
                      <p className="text-xs text-green-100">
                        Railway Ticket
                      </p>

                      <p className="font-mono font-bold">
                        #{ticket.id}
                      </p>
                    </div>

                  </div>

                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs capitalize">
                    {ticket.classType}
                  </span>

                </div>

              </div>

              {/* Route */}
              <div className="p-5">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-xs text-gray-400">
                      From
                    </p>

                    <p className="font-bold text-gray-800">
                      {ticket.departure}
                    </p>
                  </div>

                  <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                    <ArrowRight size={16} />
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-400">
                      To
                    </p>

                    <p className="font-bold text-gray-800">
                      {ticket.destination}
                    </p>
                  </div>

                </div>

                {/* Details */}
                <div className="mt-5 grid grid-cols-2 gap-4 border-t border-dashed border-gray-200 pt-5">

                  <div>
                    <p className="text-xs text-gray-400">
                      Passenger
                    </p>

                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {ticket.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Date
                    </p>

                    <p className="text-sm font-semibold text-gray-800">
                      {ticket.date}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Passengers
                    </p>

                    <p className="text-sm font-semibold text-gray-800">
                      {ticket.passengers}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Total Fare
                    </p>

                    <p className="text-sm font-bold text-green-700">
                      ₵{ticket.totalPrice.toFixed(2)}
                    </p>
                  </div>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  )
}