export default function TicketCard({ ticket }: any) {

  const ticketId = Math.floor(Math.random() * 100000)

  return (
    <div className="
      backdrop-blur-xl bg-orange-200 border border-orange-400 shadow-lg 
      p-4 sm:p-6 rounded-lg 
      w-full max-w-sm sm:max-w-md mx-auto
    ">

      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
        Railway Ticket
      </h2>

      <div className="space-y-1 text-sm sm:text-base">
        <p><strong>Passenger:</strong> {ticket.name}</p>
        <p><strong>From:</strong> {ticket.departure}</p>
        <p><strong>To:</strong> {ticket.destination}</p>
        <p><strong>Date:</strong> {ticket.date}</p>
        <p><strong>Class:</strong> {ticket.classType}</p>
      </div>

      <div className="mt-3 sm:mt-4 text-gray-500 text-xs sm:text-sm">
        Ticket ID: #{ticketId}
      </div>

    </div>
  )
}