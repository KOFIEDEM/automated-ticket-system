import DashboardCard from '@/components/DashboardCard'
import TicketTable from '@/components/TicketTable'

export default function DashboardPage() {

  return (
    <div className="p-4 sm:p-6">

      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Welcome, KOFI EDEM
      </h1>

      {/* Stats Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">

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

      <div className="overflow-x-auto">
        <TicketTable />
      </div>

    </div>
  )
}