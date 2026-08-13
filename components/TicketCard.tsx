'use client'

import { useEffect, useState } from 'react'
import {
  TrainFront,
  MapPin,
  CalendarDays,
  User,
  Users,
  Ticket,
  ArrowRight,
} from 'lucide-react'

export default function TicketCard({ ticket }: any) {
  const [ticketId, setTicketId] = useState('')

  useEffect(() => {
    const id = Math.floor(100000 + Math.random() * 900000)
    setTicketId(String(id))
  }, [])

  const pricePerPassenger = ticket.pricePerPassenger ?? 0
  const passengers = ticket.passengers ?? 1
  const totalPrice = pricePerPassenger * passengers

  return (
    <div className="w-full max-w-lg mx-auto">

      {/* Ticket */}
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl border border-orange-200">

        {/* Header */}
        <div className="relative bg-gradient-to-r from-green-700 to-green-600 px-6 py-5 text-white">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <TrainFront size={25} />
              </div>

              <div>
                <h2 className="text-lg font-bold">
                  Railway Ticket
                </h2>

                <p className="text-xs text-green-100">
                  Digital Travel Pass
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs text-green-100">
                Ticket ID
              </p>

              <p className="font-mono font-bold">
                #{ticketId || '--------'}
              </p>
            </div>

          </div>
        </div>

        {/* Route */}
        <div className="px-6 pt-6">

          <div className="flex items-center justify-between gap-4">

            <div className="min-w-0">
              <p className="text-xs uppercase tracking-wider text-gray-400">
                Departure
              </p>

              <h3 className="mt-1 truncate text-xl font-bold text-gray-800">
                {ticket.departure || 'N/A'}
              </h3>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                <ArrowRight size={18} />
              </div>

              <div className="mt-1 h-px w-12 bg-orange-200" />
            </div>

            <div className="min-w-0 text-right">
              <p className="text-xs uppercase tracking-wider text-gray-400">
                Destination
              </p>

              <h3 className="mt-1 truncate text-xl font-bold text-gray-800">
                {ticket.destination || 'N/A'}
              </h3>
            </div>

          </div>

        </div>

        {/* Perforated divider */}
        <div className="relative my-6 flex items-center">

          <div className="h-px flex-1 border-t border-dashed border-gray-300" />

          <div className="mx-3 text-xs font-medium uppercase tracking-widest text-gray-400">
            Journey Details
          </div>

          <div className="h-px flex-1 border-t border-dashed border-gray-300" />

          {/* Cut-out circles */}
          <div className="absolute -left-3 h-6 w-6 rounded-full bg-green-50" />
          <div className="absolute -right-3 h-6 w-6 rounded-full bg-green-50" />

        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-4 px-6">

          {/* Passenger */}
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
              <User size={17} />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-gray-400">
                Passenger
              </p>

              <p className="truncate text-sm font-semibold text-gray-800">
                {ticket.name || 'N/A'}
              </p>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
              <CalendarDays size={17} />
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Travel Date
              </p>

              <p className="text-sm font-semibold text-gray-800">
                {ticket.date || 'N/A'}
              </p>
            </div>
          </div>

          {/* Passengers */}
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
              <Users size={17} />
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Passengers
              </p>

              <p className="text-sm font-semibold text-gray-800">
                {passengers}
              </p>
            </div>
          </div>

          {/* Class */}
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-500">
              <Ticket size={17} />
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Class
              </p>

              <p className="text-sm font-semibold capitalize text-gray-800">
                {ticket.classType || 'Standard'}
              </p>
            </div>
          </div>

        </div>

        {/* Price */}
        <div className="mx-6 mt-6 rounded-xl bg-gray-50 p-4">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs text-gray-400">
                Total Fare
              </p>

              <p className="text-sm text-gray-500">
                {passengers} passenger
                {passengers !== 1 ? 's' : ''}
              </p>
            </div>

            <p className="text-2xl font-bold text-green-700">
              ₵{totalPrice.toFixed(2)}
            </p>

          </div>

        </div>

        {/* Footer */}
        <div className="mt-6 border-t border-gray-100 px-6 py-4">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2 text-xs text-gray-400">
              <MapPin size={14} />
              Ghana Railway
            </div>

            <div className="font-mono text-xs tracking-widest text-gray-400">
              VALID TICKET
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}