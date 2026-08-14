'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  ArrowRight,
  CalendarDays,
  Ticket as TicketIcon,
} from 'lucide-react'
import {
  getTickets,
  StoredTicket,
} from '@/src/lib/ticketStorage'

export default function TicketTable() {
  const [tickets, setTickets] = useState<StoredTicket[]>([])

  useEffect(() => {
    setTickets(getTickets().slice(0, 5))
  }, [])

  return (
    <Link href="/dashboard/tickets" className="block w-full">
      <div className="w-full overflow-hidden rounded-3xl border border-orange-200 bg-gradient-to-br from-green-50 via-white to-orange-50 p-4 shadow-lg transition hover:shadow-xl sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-500">
              Activity
            </p>

            <h2 className="text-xl font-bold text-gray-800">
              Recent Tickets
            </h2>
          </div>

          <div className="rounded-xl bg-orange-100 p-3 text-orange-500">
            <TicketIcon size={21} />
          </div>
        </div>

        {tickets.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-orange-200 bg-white p-8 text-center">
            <TicketIcon
              size={35}
              className="mx-auto mb-3 text-orange-300"
            />

            <p className="font-medium text-gray-600">
              No recent tickets
            </p>

            <p className="mt-1 text-sm text-gray-400">
              Book a journey to see it here.
            </p>
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-orange-100 text-left text-xs uppercase tracking-wide text-gray-400">
                    <th className="p-3">Ticket</th>
                    <th className="p-3">Journey</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Class</th>
                    <th className="p-3">Total</th>
                  </tr>
                </thead>

                <tbody>
                  {tickets.map((ticket) => (
                    <tr
                      key={ticket.id}
                      className="border-b border-gray-100 transition last:border-0 hover:bg-orange-50/50"
                    >
                      <td className="p-3">
                        <span className="font-mono text-sm font-semibold text-gray-700">
                          #{ticket.id}
                        </span>
                      </td>

                      <td className="p-3">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-semibold">
                            {ticket.departure}
                          </span>

                          <ArrowRight
                            size={15}
                            className="text-orange-400"
                          />

                          <span className="font-semibold">
                            {ticket.destination}
                          </span>
                        </div>
                      </td>

                      <td className="p-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CalendarDays
                            size={15}
                            className="text-orange-400"
                          />

                          {ticket.date}
                        </div>
                      </td>

                      <td className="p-3">
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                          {ticket.classType}
                        </span>
                      </td>

                      <td className="p-3 font-bold text-orange-500">
                        ₵{ticket.totalPrice}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-3 md:hidden">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-gray-600">
                      #{ticket.id}
                    </span>

                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">
                      {ticket.classType}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <span className="font-bold">
                      {ticket.departure}
                    </span>

                    <ArrowRight
                      size={16}
                      className="text-orange-400"
                    />

                    <span className="font-bold">
                      {ticket.destination}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      {ticket.date}
                    </span>

                    <span className="font-bold text-orange-500">
                      ₵{ticket.totalPrice}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Link>
  )
}