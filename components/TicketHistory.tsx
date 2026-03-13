export default function Tickets() {

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
    {
      id: "TK2075",
      from: "Accra",
      to: "Tema",
      date: "2026-03-12",
      class: "Business",
    },
    {
      id: "TK2085",
      from: "Accra",
      to: "Tema",
      date: "2026-03-12",
      class: "Business",
    },
    {
      id: "TK2095",
      from: "Accra",
      to: "Tema",
      date: "2026-03-12",
      class: "Business",
    },
    {
      id: "TK2046",
      from: "Accra",
      to: "Tema",
      date: "2026-03-12",
      class: "Business",
    },
    {
      id: "TK2047",
      from: "Accra",
      to: "Tema",
      date: "2026-03-12",
      class: "Business",
    },
    {
      id: "TK2048",
      from: "Accra",
      to: "Tema",
      date: "2026-03-12",
      class: "Business",
    },
    {
      id: "TK2049",
      from: "Accra",
      to: "Tema",
      date: "2026-03-12",
      class: "Business",
    },
  ]

  return (
    <div className="bg-green-50 p-6 rounded-lg shadow-orange-400/50 border border-orange-400 hover:shadow-lg transition-shadow">

      <h2 className="text-xl font-bold mb-4">
        Ticket History
      </h2>

      <table className="w-full">

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

            <tr
              key={ticket.id}
              className="border-b"
            >

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
  )
}