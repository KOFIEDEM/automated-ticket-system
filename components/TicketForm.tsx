'use client'

import { useEffect, useRef, useState } from 'react'
import { useTicket } from '@/context/TicketContext'
import { ArrowRight, ChevronDown } from 'lucide-react'
import {
  GHANA_CITIES,
  calculateTicketPrice,
} from '../src/lib/ghanaCities'

function CityAutocomplete({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const filteredCities = GHANA_CITIES.filter((city) =>
    city.name.toLowerCase().includes(value.toLowerCase())
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSelect = (city: string) => {
    onChange(city)
    setOpen(false)
  }

  return (
    <div
      ref={wrapperRef}
      className="relative"
    >
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <div className="relative">
        <input
          type="text"
          placeholder={label}
          value={value}
          autoComplete="off"
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            onChange(e.target.value)
            setOpen(true)
          }}
          className="w-full border border-orange-400 p-2 pr-10 rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
        />

        <ChevronDown
          size={20}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
        />
      </div>

      {open && (
        <div className="absolute z-50 mt-1 w-full max-h-60 overflow-y-auto rounded-lg border border-orange-300 bg-white shadow-lg">
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <button
                key={city.name}
                type="button"
                onClick={() => handleSelect(city.name)}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-orange-50 transition-colors"
              >
                <span className="text-gray-800">
                  {city.name}
                </span>

                <span className="text-sm text-gray-500">
                  GHS {city.price}
                </span>
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500">
              No city found
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function TicketForm({
  nextStep,
}: any) {
  const { ticket, updateTicket } = useTicket()

  const ticketPrice = calculateTicketPrice(
    ticket.departure,
    ticket.destination
  )

  const hasValidRoute =
    GHANA_CITIES.some(
      (city) => city.name === ticket.departure
    ) &&
    GHANA_CITIES.some(
      (city) => city.name === ticket.destination
    )

  return (
    <div className="backdrop-blur-xl bg-green-50 border border-orange-400 shadow-lg p-6 rounded-lg w-full">

      {/* Departure City */}
      <div className="p-5">
        <CityAutocomplete
          label="Departure City"
          value={ticket.departure}
          onChange={(value) =>
            updateTicket({
              departure: value,
            })
          }
        />
      </div>

      {/* Destination */}
      <div className="p-5">
        <CityAutocomplete
          label="Destination"
          value={ticket.destination}
          onChange={(value) =>
            updateTicket({
              destination: value,
            })
          }
        />
      </div>

      {/* Departure Date */}
      <div className="p-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Departure Date
        </label>

        <input
          type="date"
          className="w-full border border-orange-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
          value={ticket.date}
          onChange={(e) =>
            updateTicket({
              date: e.target.value,
            })
          }
        />
      </div>

      {/* Price Preview */}
      {hasValidRoute && (
        <div className="mx-5 mb-5 rounded-lg bg-white border border-orange-200 p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">
              Estimated Ticket Price
            </span>

            <span className="text-xl font-bold text-green-600">
              GHS {ticketPrice.toFixed(2)}
            </span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-end p-5">
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