'use client'

import {
  Ticket,
  CalendarCheck,
  CheckCircle2,
  LucideIcon,
} from 'lucide-react'

interface Props {
  title: string
  value: string
}

const cardConfig: Record<
  string,
  {
    icon: LucideIcon
    iconBg: string
    iconColor: string
    accent: string
    description: string
  }
> = {
  'Total Tickets': {
    icon: Ticket,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-500',
    accent: 'bg-orange-400',
    description: 'All tickets booked',
  },

  'Upcoming Trips': {
    icon: CalendarCheck,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-500',
    accent: 'bg-blue-500',
    description: 'Trips coming up',
  },

  'Completed Trips': {
    icon: CheckCircle2,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    accent: 'bg-green-600',
    description: 'Journeys completed',
  },
}

export default function DashboardCard({
  title,
  value,
}: Props) {
  const config =
    cardConfig[title] ?? cardConfig['Total Tickets']

  const Icon = config.icon

  return (
    <div className="
      group
      relative
      overflow-hidden
      rounded-2xl
      border
      border-gray-200
      bg-white
      p-5
      sm:p-6
      shadow-sm
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
    ">

      {/* Decorative background */}
      <div className="
        absolute
        -right-8
        -top-8
        h-24
        w-24
        rounded-full
        bg-green-50
        transition-transform
        duration-500
        group-hover:scale-150
      " />

      {/* Top */}
      <div className="relative flex items-start justify-between">

        {/* Icon */}
        <div
          className={`
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            ${config.iconBg}
            ${config.iconColor}
            transition-transform
            duration-300
            group-hover:scale-110
          `}
        >
          <Icon size={23} />
        </div>

        {/* Status dot */}
        <span
          className={`
            h-2.5
            w-2.5
            rounded-full
            ${config.accent}
            shadow-sm
          `}
        />

      </div>

      {/* Content */}
      <div className="relative mt-5">

        <p className="text-sm font-medium text-gray-500">
          {title}
        </p>

        <div className="mt-1 flex items-end justify-between">

          <h2 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">
            {value}
          </h2>

        </div>

        <p className="mt-2 text-xs text-gray-400">
          {config.description}
        </p>

      </div>

      {/* Bottom accent */}
      <div
        className={`
          absolute
          bottom-0
          left-0
          h-1
          w-full
          ${config.accent}
          origin-left
          scale-x-30
          transition-transform
          duration-300
          group-hover:scale-x-100
        `}
      />

    </div>
  )
}