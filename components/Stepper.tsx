interface Props {
  step: number
}

export default function Stepper({ step }: Props) {

  const steps = [
    "Trip Details",
    "Passenger Info",
    "Seat Selection",
    "Summary"
  ]

  return (
    <div className="flex justify-between mb-8">

      {steps.map((s, index) => (
        <div
          key={index}
          className={`flex-1 text-center 
          ${step === index + 1 ? "font-bold text-white bg-orange-400 rounded" : "text-gray-400"}`}
        >
          {s}
        </div>
      ))}

    </div>
  )
}