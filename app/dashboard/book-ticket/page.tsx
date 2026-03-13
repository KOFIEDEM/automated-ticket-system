'use client'

import { useState } from 'react'

import Stepper from '@/components/Stepper'
import TicketForm from '@/components/TicketForm'
import PassengerForm from '@/components/PassengerForm'
import SeatSelection from '@/components/SeatSelection'
import OrderSummary from '@/components/OrderSummary'

export default function BookTicketPage() {

  const [step, setStep] = useState(1)

  const nextStep = () => setStep((prev) => prev + 1)
  const prevStep = () => setStep((prev) => prev - 1)

  return (
    <div className="max-w-2xl mx-auto p-6">

      <Stepper step={step} />

      {step === 1 && <TicketForm nextStep={nextStep} />}
      {step === 2 && <PassengerForm nextStep={nextStep} prevStep={prevStep} />}
      {step === 3 && <SeatSelection nextStep={nextStep} prevStep={prevStep} />}
      {step === 4 && <OrderSummary prevStep={prevStep} />}

    </div>
  )
}