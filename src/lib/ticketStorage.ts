export interface StoredTicket {
  id: string
  name: string
  email?: string
  phone?: string
  departure: string
  destination: string
  date: string
  passengers: number
  classType: string
  price: number
  totalPrice: number
  createdAt: string
}

const STORAGE_KEY = "railpass_tickets"

export function getTickets(): StoredTicket[] {
  if (typeof window === "undefined") {
    return []
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY)

    if (!stored) {
      return []
    }

    return JSON.parse(stored)
  } catch (error) {
    console.error("Unable to read tickets:", error)
    return []
  }
}

export function saveTicket(ticket: StoredTicket): void {
  if (typeof window === "undefined") {
    return
  }

  const tickets = getTickets()

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([ticket, ...tickets])
  )
}

export function clearTickets(): void {
  if (typeof window === "undefined") {
    return
  }

  localStorage.removeItem(STORAGE_KEY)
}