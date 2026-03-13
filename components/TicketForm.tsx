'use client'

import { useTicket } from '@/context/TicketContext'
import { ArrowRight } from 'lucide-react'

export default function TicketForm({ nextStep }: any) {

  const { ticket, updateTicket } = useTicket()

  return (
    <div className="backdrop-blur-xl bg-green-50 border border-orange-400 shadow-lg p-6 rounded-lg w-full">

      <div className='p-5'>
        <label className="block text-sm font-medium text-gray-700">Departure City:</label>
      <input
        type="text"
        placeholder="Departure City"
        className="w-full border border-orange-400 p-2 rounded"
        value={ticket.departure}
        onChange={(e) =>
          updateTicket({ departure: e.target.value })
        }
      />
      </div>

      <div className='p-5'>
      <label className="block text-sm font-medium text-gray-700">Destination:</label>
      <input
        type="text"
        placeholder="Destination"
        className="w-full border border-orange-400 p-2 rounded"
        value={ticket.destination}
        onChange={(e) =>
          updateTicket({ destination: e.target.value })
        }
      />
      </div>

      <div className='p-5'>
      <label className="block text-sm font-medium text-gray-700">Departure Date:</label>
      <input
        type="date"
        className="w-full border border-orange-400 p-2 rounded"
        value={ticket.date} 
        onChange={(e) =>
          updateTicket({ date: e.target.value })
        }
      />
      </div>

      
      <div className=''>
        <button
          onClick={nextStep}
          className="px-4 py-2 text-green-400 hover:text-green-400 transition-transform hover:scale-120"
        >
          <ArrowRight size={30} className="rounded-3xl" />
          Next
        </button>
      </div>
      

      

    </div>
  )
}