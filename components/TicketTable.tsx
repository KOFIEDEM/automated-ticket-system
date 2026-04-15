'use client'

import Link from 'next/link';

export default function TicketTable() {

  const tickets = [
    {
      id: "TK1023",
      from: "Accra",
      to: "Kumasi",
      date: "2026-03-10",
      class: "Economy",
    },
    {
      id: "TK2045",
      from: "Accra",
      to: "Tema",
      date: "2026-03-12",
      class: "Business",
    },
  ]

  return (
    <Link href="/dashboard/tickets" className="block w-full">

      <div className="w-full max-w-full overflow-hidden bg-green-50 p-4 sm:p-6 rounded-lg shadow-orange-400/50 border border-orange-400 hover:shadow-lg transition-shadow">

        <h2 className="text-lg sm:text-xl font-bold mb-4">
          Recent Tickets
        </h2>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full min-w-[500px] text-sm">

            <thead>
              <tr className="text-left border-b">
                <th className="p-2">Ticket ID</th>
                <th className="p-2">From</th>
                <th className="p-2">To</th>
                <th className="p-2">Date</th>
                <th className="p-2">Class</th>
              </tr>
            </thead>

            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="border-b">
                  <td className="p-2">{ticket.id}</td>
                  <td className="p-2">{ticket.from}</td>
                  <td className="p-2">{ticket.to}</td>
                  <td className="p-2">{ticket.date}</td>
                  <td className="p-2">{ticket.class}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">

          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white rounded-lg p-3 shadow border"
            >
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">ID</span>
                <span className="font-medium">{ticket.id}</span>
              </div>

              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-500">From</span>
                <span>{ticket.from}</span>
              </div>

              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-500">To</span>
                <span>{ticket.to}</span>
              </div>

              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-500">Date</span>
                <span>{ticket.date}</span>
              </div>

              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-500">Class</span>
                <span className="font-medium">{ticket.class}</span>
              </div>
            </div>
          ))}

        </div>

      </div>

    </Link>
  )
}