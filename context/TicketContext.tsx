'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface TicketData {
  departure: string
  destination: string
  date: string
  passengers: number
  name: string
  classType: string
}

interface TicketContextType {
  ticket: TicketData
  updateTicket: (data: Partial<TicketData>) => void
}

const TicketContext = createContext<TicketContextType | undefined>(undefined)

export function TicketProvider({ children }: { children: ReactNode }) {

  const [ticket, setTicket] = useState<TicketData>({
    departure: '',
    destination: '',
    date: '',
    passengers: 1,
    name: '',
    classType: ''
  })

  const updateTicket = (data: Partial<TicketData>) => {
    setTicket((prev) => ({ ...prev, ...data }))
  }

  return (
    <TicketContext.Provider value={{ ticket, updateTicket }}>
      {children}
    </TicketContext.Provider>
  )
}

export function useTicket() {
  const context = useContext(TicketContext)

  if (!context) {
    throw new Error('useTicket must be used within TicketProvider')
  }

  return context
}