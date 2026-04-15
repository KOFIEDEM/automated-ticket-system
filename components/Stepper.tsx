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
    <div className="w-full overflow-x-auto mb-6 sm:mb-8">
      
      <div className="flex min-w-[100px] sm:min-w-0 justify-between gap-2">

        {steps.map((s, index) => {
          const isActive = step === index + 1
          const isCompleted = step > index + 1

          return (
            <div
              key={index}
              className="flex-1 flex flex-col items-center text-center"
            >

              {/* Circle */}
              <div
                className={`
                  w-8 h-8 flex items-center justify-center rounded-full text-sm
                  ${isActive ? "bg-orange-400 text-white" : ""}
                  ${isCompleted ? "bg-green-500 text-white" : ""}
                  ${!isActive && !isCompleted ? "bg-gray-200 text-gray-500" : ""}
                `}
              >
                {index + 1}
              </div>

              {/* Label */}
              <p
                className={`
                  mt-1 text-xs sm:text-sm
                  ${isActive ? "text-orange-500 font-semibold" : "text-gray-400"}
                `}
              >
                {s}
              </p>

            </div>
          )
        })}

      </div>
    </div>
  )
}