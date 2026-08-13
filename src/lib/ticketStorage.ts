import { calculateTicketPrice } from './ghanaCities'

export const TICKETS_STORAGE_KEY = 'railwayTickets'

export type SavedTicket = {
  id: string
  name: string
  departure: string
  destination: string
  date: string
  classType: string
  passengers: number
  pricePerPassenger: number
  totalPrice: number
  createdAt: string
}

export function getTickets(): SavedTicket[] {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const storedTickets = localStorage.getItem(
      TICKETS_STORAGE_KEY
    )

    if (!storedTickets) {
      return []
    }

    return JSON.parse(storedTickets)
  } catch (error) {
    console.error('Failed to load tickets:', error)
    return []
  }
}

export function saveTicket(ticket: any): SavedTicket {
  const pricePerPassenger = calculateTicketPrice(
    ticket.departure,
    ticket.destination
  )

  const passengers = Number(ticket.passengers) || 1

  const newTicket: SavedTicket = {
    id: `TK${Math.floor(100000 + Math.random() * 900000)}`,
    name: ticket.name,
    departure: ticket.departure,
    destination: ticket.destination,
    date: ticket.date,
    classType: ticket.classType || 'Economy',
    passengers,
    pricePerPassenger,
    totalPrice: pricePerPassenger * passengers,
    createdAt: new Date().toISOString(),
  }

  const existingTickets = getTickets()

  const updatedTickets = [
    newTicket,
    ...existingTickets,
  ]

  localStorage.setItem(
    TICKETS_STORAGE_KEY,
    JSON.stringify(updatedTickets)
  )

  return newTicket
}