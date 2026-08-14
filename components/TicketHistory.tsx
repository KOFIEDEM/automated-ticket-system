'use client'

import { useEffect, useState } from 'react'
import {
  CalendarDays,
  MapPin,
  Ticket as TicketIcon,
  Users,
  ArrowRight,
} from 'lucide-react'
import {
  getTickets,
  StoredTicket,
} from '@/src/lib/ticketStorage'

export default function Tickets() {
  const [tickets, setTickets] = useState<StoredTicket[]>([])

  useEffect(() => {
    setTickets(getTickets())
  }, [])

  return (
    <div className="w-full rounded-3xl border border-orange-200 bg-gradient-to-br from-green-50 via-white to-orange-50 p-4 shadow-xl sm:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-orange-500">
            YOUR JOURNEYS
          </p>

          <h2 className="text-2xl font-bold text-gray-800">
            Ticket History
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            View your previously generated tickets.
          </p>
        </div>

        <div className="hidden rounded-xl bg-orange-100 p-3 text-orange-500 sm:block">
          <TicketIcon size={24} />
        </div>
      </div>

      {tickets.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-orange-200 bg-white p-10 text-center">
          <TicketIcon
            size={40}
            className="mx-auto mb-3 text-orange-300"
          />

          <h3 className="font-semibold text-gray-700">
            No tickets yet
          </h3>

          <p className="mt-1 text-sm text-gray-400">
            Your generated tickets will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex flex-col gap-5 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                <div className="flex-1">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-600">
                      #{ticket.id}
                    </span>

                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      {ticket.classType}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div>
                      <p className="text-xs text-gray-400">
                        FROM
                      </p>

                      <p className="font-bold text-gray-800">
                        {ticket.departure}
                      </p>
                    </div>

                    <ArrowRight
                      size={18}
                      className="text-orange-400"
                    />

                    <div>
                      <p className="text-xs text-gray-400">
                        TO
                      </p>

                      <p className="font-bold text-gray-800">
                        {ticket.destination}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm sm:min-w-[280px]">
                  <div className="flex items-center gap-2">
                    <CalendarDays
                      size={17}
                      className="text-orange-500"
                    />

                    <div>
                      <p className="text-xs text-gray-400">
                        Date
                      </p>

                      <p className="font-medium">
                        {ticket.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users
                      size={17}
                      className="text-orange-500"
                    />

                    <div>
                      <p className="text-xs text-gray-400">
                        Passengers
                      </p>

                      <p className="font-medium">
                        {ticket.passengers}
                      </p>
                    </div>
                  </div>

                  <div className="col-span-2 border-t pt-3">
                    <p className="text-xs text-gray-400">
                      Total
                    </p>

                    <p className="text-lg font-bold text-orange-500">
                      ₵{ticket.totalPrice}
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