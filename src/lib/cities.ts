export interface GhanaCity {
  name: string
  price: number
}

export const GHANA_CITIES: GhanaCity[] = [
  { name: "Accra", price: 40 },
  { name: "Tema", price: 35 },
  { name: "Kasoa", price: 35 },
  { name: "Cape Coast", price: 55 },
  { name: "Elmina", price: 60 },
  { name: "Winneba", price: 45 },
  { name: "Kumasi", price: 80 },
  { name: "Obuasi", price: 70 },
  { name: "Konongo", price: 65 },
  { name: "Ejisu", price: 75 },
  { name: "Sunyani", price: 95 },
  { name: "Techiman", price: 90 },
  { name: "Berekum", price: 100 },
  { name: "Goaso", price: 105 },
  { name: "Tamale", price: 120 },
  { name: "Yendi", price: 130 },
  { name: "Bolgatanga", price: 145 },
  { name: "Wa", price: 150 },
  { name: "Ho", price: 65 },
  { name: "Hohoe", price: 75 },
  { name: "Keta", price: 55 },
  { name: "Aflao", price: 60 },
  { name: "Koforidua", price: 50 },
  { name: "Nkawkaw", price: 60 },
  { name: "Aburi", price: 45 },
]

export function getCityPrice(city: string): number {
  const found = GHANA_CITIES.find(
    (item) => item.name.toLowerCase() === city.toLowerCase()
  )

  return found?.price ?? 0
}

export function getTicketPrice(
  departure: string,
  destination: string
): number {
  const departurePrice = getCityPrice(departure)
  const destinationPrice = getCityPrice(destination)

  if (!departurePrice || !destinationPrice) {
    return 0
  }

  if (departure.toLowerCase() === destination.toLowerCase()) {
    return 0
  }

  // Fare is based on the distance/value difference between the cities.
  const difference = Math.abs(destinationPrice - departurePrice)

  return Math.max(30, difference + 20)
}