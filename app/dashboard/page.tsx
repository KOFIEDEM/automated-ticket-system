import DashboardCard from '@/components/DashboardCard'
import TicketTable from '@/components/TicketTable'

export default function DashboardPage() {

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Welcome, KOFI EDEM
      </h1>

      {/* Stats Cards */}

      <div className="grid grid-cols-3 gap-6 mb-10">

        <DashboardCard
          title="Total Tickets"
          value="12"
        />

        <DashboardCard
          title="Upcoming Trips"
          value="3"
        />

        <DashboardCard
          title="Completed Trips"
          value="9"
        />

      </div>

      {/* Ticket Table */}

      <TicketTable />

    </div>
  )
}