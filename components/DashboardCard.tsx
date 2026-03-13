interface Props {
  title: string
  value: string
}

export default function DashboardCard({ title, value }: Props) {

  return (
    <div className="bg-orange-50 p-6 rounded-lg shadow-orange-400/50 border border-orange-400 hover:shadow-lg transition-shadow">

      <p className="text-gray-500">
        {title}
      </p>

      <h2 className="text-3xl font-bold">
        {value}
      </h2>

    </div>
  )
}