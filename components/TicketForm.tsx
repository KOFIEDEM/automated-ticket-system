'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, MapPin, Search } from 'lucide-react'
import { useTicket } from '@/context/TicketContext'
import { GHANA_CITIES } from '@/src/lib/cities'

interface Props {
  nextStep: () => void
}

interface CityDropdownProps {
  label: string
  value: string
  onChange: (value: string) => void
  excludeCity?: string
}

function CityDropdown({
  label,
  value,
  onChange,
  excludeCity,
}: CityDropdownProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState(value)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSearch(value)
  }, [value])

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

  const filteredCities = GHANA_CITIES.filter((city) => {
    const matchesSearch = city.name
      .toLowerCase()
      .includes(search.toLowerCase())

    const isNotExcluded =
      city.name.toLowerCase() !== excludeCity?.toLowerCase()

    return matchesSearch && isNotExcluded
  })

  const handleSelect = (city: string) => {
    onChange(city)
    setSearch(city)
    setOpen(false)
  }

  return (
    <div ref={wrapperRef} className="relative">
      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
        <MapPin size={16} className="text-orange-500" />
        {label}
      </label>

      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          value={search}
          placeholder={`Search ${label.toLowerCase()}...`}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setSearch(e.target.value)
            onChange(e.target.value)
            setOpen(true)
          }}
          className="w-full rounded-xl border border-orange-300 bg-white py-3 pl-10 pr-4 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
        />
      </div>

      {open && (
        <div className="absolute left-0 right-0 z-50 mt-2 max-h-60 overflow-y-auto rounded-xl border border-orange-100 bg-white shadow-xl">
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <button
                key={city.name}
                type="button"
                onClick={() => handleSelect(city.name)}
                className="flex w-full items-center justify-between px-4 py-3 text-left text-sm transition hover:bg-orange-50"
              >
                <span className="font-medium text-gray-700">
                  {city.name}
                </span>

                <span className="text-xs text-gray-400">
                  From ₵{city.price}
                </span>
              </button>
            ))
          ) : (
            <div className="px-4 py-4 text-sm text-gray-500">
              No matching Ghanaian city found.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function TicketForm({ nextStep }: Props) {
  const { ticket, updateTicket } = useTicket()

  const canContinue =
    ticket.departure &&
    ticket.destination &&
    ticket.departure.toLowerCase() !==
      ticket.destination.toLowerCase() &&
    ticket.date

  return (
    <div className="w-full overflow-visible rounded-2xl border border-orange-200 bg-gradient-to-br from-green-50 via-white to-orange-50 p-4 shadow-xl sm:p-6">
      <div className="mb-6">
        <p className="text-sm font-medium text-orange-500">
          STEP 1 OF 3
        </p>

        <h2 className="mt-1 text-2xl font-bold text-gray-800">
          Plan Your Journey
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Choose your departure city, destination and travel date.
        </p>
      </div>

      <div className="space-y-5">
        <CityDropdown
          label="Departure City"
          value={ticket.departure}
          onChange={(value) =>
            updateTicket({ departure: value })
          }
          excludeCity={ticket.destination}
        />

        <CityDropdown
          label="Destination"
          value={ticket.destination}
          onChange={(value) =>
            updateTicket({ destination: value })
          }
          excludeCity={ticket.departure}
        />

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Departure Date
          </label>

          <input
            type="date"
            min={new Date().toISOString().split('T')[0]}
            value={ticket.date}
            onChange={(e) =>
              updateTicket({ date: e.target.value })
            }
            className="w-full rounded-xl border border-orange-300 bg-white p-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
          />
        </div>
      </div>

      {ticket.departure &&
        ticket.destination &&
        ticket.departure.toLowerCase() ===
          ticket.destination.toLowerCase() && (
          <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            Departure and destination cannot be the same city.
          </p>
        )}

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          disabled={!canContinue}
          onClick={nextStep}
          className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white shadow-lg transition hover:bg-orange-600 hover:shadow-orange-200 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
        >
          Continue
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  )
}