import './globals.css'
import { TicketProvider } from '@/context/TicketContext'
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={cn("font-sans", geist.variable)}>
      <body>
        <TicketProvider>
          {children}
        </TicketProvider>
      </body>
    </html>
  )
}