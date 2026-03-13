'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }



  return (
    <div className="flex h-screen">

      <Sidebar isOpen={sidebarOpen} />

      <div className="flex flex-col flex-1">

        <Header toggleSidebar={toggleSidebar} />

        <main className="p-8 bg-gray-100 flex-1">
          {children}
        </main>

      </div>

    </div>
  )
}