'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Ticket,
  Users,
  User,
  CheckCircle,
} from 'lucide-react'

import { useTicket } from '@/context/TicketContext'
import { getTicketPrice } from '@/src/lib/cities'
import { saveTicket } from '@/src/lib/ticketStorage'
import { supabase } from '@/lib/supabaseClient'

interface Props {
  prevStep: () => void
}

export default function OrderSummary({ prevStep }: Props) {
  const { ticket } = useTicket()
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  /*
   * Calculate the journey price in ONE place.
   * This value will also be saved to the generated ticket.
   */
  const basePrice = getTicketPrice(
    ticket.departure,
    ticket.destination
  )

  const classMultiplier =
    ticket.classType === 'Business' ? 1.5 : 1

  const pricePerPassenger =
    Math.round(basePrice * classMultiplier * 100) / 100

  const passengers = Number(ticket.passengers) || 1

  const totalPrice =
    Math.round(pricePerPassenger * passengers * 100) / 100

  const generateTicket = async () => {
    setLoading(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      const ticketId = `TK${Date.now()
        .toString()
        .slice(-8)}`

      /*
       * Save the EXACT calculated price.
       *
       * TicketCard will use these values instead of
       * calculating the fare again.
       */
      saveTicket({
        id: ticketId,

        name: ticket.name,

        email: user?.email ?? '',

        phone: user?.user_metadata?.phone ?? '',

        departure: ticket.departure,

        destination: ticket.destination,

        date: ticket.date,

        passengers,

        classType: ticket.classType,

        price: pricePerPassenger,

        totalPrice,
        
        createdAt: new Date().toISOString(),
      })

      router.push(
        `/dashboard/ticket-success?id=${ticketId}`
      )
    } catch (error) {
      console.error('Unable to generate ticket:', error)

      alert(
        'Unable to generate ticket. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full rounded-2xl border border-orange-200 bg-gradient-to-br from-green-50 via-white to-orange-50 p-4 shadow-xl sm:p-6">

      {/* Header */}
      <div className="mb-6">
        <p className="text-sm font-medium text-orange-500">
          STEP 3 OF 3
        </p>

        <h2 className="mt-1 text-2xl font-bold text-gray-800">
          Review Your Ticket
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Check your journey details and fare before generating your ticket.
        </p>
      </div>

      {/* Ticket Preview */}
      <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm">

        {/* Preview Header */}
        <div className="border-b border-orange-100 bg-gradient-to-r from-green-700 to-green-600 p-5 text-white">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-white/20 p-3">
              <Ticket size={24} />
            </div>

            <div>
              <h3 className="font-bold">
                RailPass Journey
              </h3>

              <p className="text-sm text-green-100">
                Ticket preview
              </p>
            </div>

          </div>

        </div>

        {/* Journey Details */}
        <div className="space-y-5 p-5">

          <div className="grid gap-5 sm:grid-cols-2">

            {/* Departure */}
            <div className="flex items-start gap-3">

              <MapPin
                className="mt-1 text-orange-500"
                size={19}
              />

              <div>
                <p className="text-xs text-gray-400">
                  Departure
                </p>

                <p className="font-semibold text-gray-800">
                  {ticket.departure || 'N/A'}
                </p>
              </div>

            </div>

            {/* Destination */}
            <div className="flex items-start gap-3">

              <MapPin
                className="mt-1 text-green-600"
                size={19}
              />

              <div>
                <p className="text-xs text-gray-400">
                  Destination
                </p>

                <p className="font-semibold text-gray-800">
                  {ticket.destination || 'N/A'}
                </p>
              </div>

            </div>

            {/* Date */}
            <div className="flex items-start gap-3">

              <CalendarDays
                className="mt-1 text-orange-500"
                size={19}
              />

              <div>
                <p className="text-xs text-gray-400">
                  Departure Date
                </p>

                <p className="font-semibold text-gray-800">
                  {ticket.date || 'N/A'}
                </p>
              </div>

            </div>

            {/* Passenger */}
            <div className="flex items-start gap-3">

              <User
                className="mt-1 text-orange-500"
                size={19}
              />

              <div>
                <p className="text-xs text-gray-400">
                  Passenger
                </p>

                <p className="font-semibold text-gray-800">
                  {ticket.name || 'N/A'}
                </p>
              </div>

            </div>

            {/* Number of passengers */}
            <div className="flex items-start gap-3">

              <Users
                className="mt-1 text-orange-500"
                size={19}
              />

              <div>
                <p className="text-xs text-gray-400">
                  Passengers
                </p>

                <p className="font-semibold text-gray-800">
                  {passengers}
                </p>
              </div>

            </div>

            {/* Class */}
            <div className="flex items-start gap-3">

              <Ticket
                className="mt-1 text-orange-500"
                size={19}
              />

              <div>
                <p className="text-xs text-gray-400">
                  Class
                </p>

                <p className="font-semibold text-gray-800">
                  {ticket.classType || 'Economy'}
                </p>
              </div>

            </div>

          </div>

          {/* Price */}
          <div className="border-t border-dashed border-gray-200 pt-5">

            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Price per passenger</span>

              <span className="font-medium text-gray-700">
                ₵{pricePerPassenger.toFixed(2)}
              </span>
            </div>

            <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
              <span>Passengers</span>

              <span>
                × {passengers}
              </span>
            </div>

            <div className="mt-4 rounded-xl bg-green-50 p-4">

              <div className="flex items-center justify-between">

                <span className="font-semibold text-gray-700">
                  Total Fare
                </span>

                <span className="text-2xl font-bold text-green-700">
                  ₵{totalPrice.toFixed(2)}
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Buttons */}
      <div className="mt-6 flex items-center justify-between gap-4">

        <button
          type="button"
          onClick={prevStep}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
        >
          <ArrowLeft size={19} />
          Back
        </button>

        <button
          type="button"
          onClick={generateTicket}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white shadow-lg transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {loading ? (
            'Generating...'
          ) : (
            <>
              <CheckCircle size={19} />
              Generate Ticket
            </>
          )}
        </button>

      </div>

    </div>
  )
}