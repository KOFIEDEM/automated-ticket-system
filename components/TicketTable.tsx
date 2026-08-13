'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  CalendarDays,
  ReceiptText,
  Ticket as TicketIcon,
} from 'lucide-react'

import {
  getTickets,
  SavedTicket,
} from '../src/lib/ticketStorage'

export default function TicketTable() {
  const [tickets, setTickets] = useState<SavedTicket[]>([])

  useEffect(() => {
    const storedTickets = getTickets()

    // Only show the latest 5 tickets
    setTickets(storedTickets.slice(0, 5))
  }, [])

  return (
    <Link
      href="/dashboard/tickets"
      className="block w-full"
    >

      <div className="w-full overflow-hidden rounded-2xl border border-orange-200 bg-green-50 shadow-lg hover:shadow-xl transition-shadow">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-orange-200 p-5 sm:p-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-500">
              <ReceiptText size={21} />
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                Recent Tickets
              </h2>

              <p className="text-xs sm:text-sm text-gray-500">
                Your latest railway journeys
              </p>
            </div>

          </div>

          <span className="hidden sm:block text-sm font-medium text-green-600">
            View all →
          </span>

        </div>

        {/* Empty State */}
        {tickets.length === 0 && (
          <div className="p-10 text-center">

            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-500">
              <TicketIcon size={23} />
            </div>

            <p className="font-medium text-gray-700">
              No recent tickets
            </p>

            <p className="mt-1 text-sm text-gray-400">
              Generated tickets will appear here.
            </p>

          </div>
        )}

        {/* Desktop */}
        {tickets.length > 0 && (
          <div className="hidden md:block overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="text-left border-b border-orange-200 text-xs uppercase tracking-wider text-gray-400">

                  <th className="px-5 py-4">
                    Ticket
                  </th>

                  <th className="px-5 py-4">
                    Journey
                  </th>

                  <th className="px-5 py-4">
                    Date
                  </th>

                  <th className="px-5 py-4">
                    Class
                  </th>

                  <th className="px-5 py-4">
                    Fare
                  </th>

                </tr>
              </thead>

              <tbody>

                {tickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="border-b border-gray-100 last:border-0 hover:bg-white/70 transition-colors"
                  >

                    <td className="px-5 py-4">
                      <p className="font-mono text-sm font-bold text-green-700">
                        #{ticket.id}
                      </p>

                      <p className="text-xs text-gray-400">
                        {ticket.name}
                      </p>
                    </td>

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-semibold text-gray-800">
                          {ticket.departure}
                        </span>

                        <ArrowRight
                          size={14}
                          className="text-orange-400"
                        />

                        <span className="font-semibold text-gray-800">
                          {ticket.destination}
                        </span>
                      </div>

                    </td>

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <CalendarDays size={15} />
                        {ticket.date}
                      </div>

                    </td>

                    <td className="px-5 py-4">

                      <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700 capitalize">
                        {ticket.classType}
                      </span>

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
        )}

        {/* Mobile */}
        {tickets.length > 0 && (
          <div className="md:hidden p-4 space-y-3">

            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="rounded-xl border border-orange-100 bg-white p-4 shadow-sm"
              >

                <div className="flex items-center justify-between mb-3">

                  <div>
                    <p className="font-mono text-sm font-bold text-green-700">
                      #{ticket.id}
                    </p>

                    <p className="text-xs text-gray-400">
                      {ticket.name}
                    </p>
                  </div>

                  <span className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-semibold text-purple-700 capitalize">
                    {ticket.classType}
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-xs text-gray-400">
                      From
                    </p>

                    <p className="font-semibold text-gray-800">
                      {ticket.departure}
                    </p>
                  </div>

                  <ArrowRight
                    size={17}
                    className="text-orange-400"
                  />

                  <div className="text-right">
                    <p className="text-xs text-gray-400">
                      To
                    </p>

                    <p className="font-semibold text-gray-800">
                      {ticket.destination}
                    </p>
                  </div>

                </div>

                <div className="mt-4 flex justify-between border-t border-gray-100 pt-3">

                  <div>
                    <p className="text-xs text-gray-400">
                      Date
                    </p>

                    <p className="text-sm font-medium text-gray-700">
                      {ticket.date}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-400">
                      Fare
                    </p>

                    <p className="font-bold text-green-700">
                      ₵{ticket.totalPrice.toFixed(2)}
                    </p>
                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </Link>
  )
}