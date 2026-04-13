import DashboardCard from '@/components/DashboardCard'
import TicketTable from '@/components/TicketTable'

export default function DashboardPage() {
  return (
    <div className="p-3 sm:p-6">

      {/* Heading */}
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">
        Welcome, KOFI EDEM
      </h1>

      {/* Stats Cards */}
      <div className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3 
        gap-3 sm:gap-6 
        mb-6 sm:mb-10
      ">
        <DashboardCard title="Total Tickets" value="12" />
        <DashboardCard title="Upcoming Trips" value="3" />
        <DashboardCard title="Completed Trips" value="9" />
      </div>

      {/* Ticket Table */}
      <div className="w-full overflow-x-auto rounded-lg bg-white shadow">
        <div className="min-w-[600px]">
          <TicketTable />
        </div>
      </div>

    </div>
  )
}