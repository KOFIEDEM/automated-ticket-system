export default function TicketCard({ ticket }: any) {

  const ticketId = Math.floor(Math.random() * 100000)

  return (
    <div className="backdrop-blur-xl bg-orange-200 border border-orange-400 shadow-lg p-6 rounded-lg w-96">

      <h2 className="text-xl font-bold mb-4">
        Railway Ticket
      </h2>

      <p><strong>Passenger:</strong> {ticket.name}</p>
      <p><strong>From:</strong> {ticket.departure}</p>
      <p><strong>To:</strong> {ticket.destination}</p>
      <p><strong>Date:</strong> {ticket.date}</p>
      <p><strong>Class:</strong> {ticket.classType}</p>

      <div className="mt-4 text-gray-500">
        Ticket ID: #{ticketId}
      </div>

    </div>
  )
}