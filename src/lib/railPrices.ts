// src/lib/railPrices.ts

export type City = {
  name: string
  price: number
}

// Base fare associated with each city.
// You can change these prices later without touching
// TicketCard, OrderSummary, or TicketHistory.
export const GHANA_CITIES: City[] = [
  { name: "Accra", price: 0 },
  { name: "Tema", price: 15 },
  { name: "Koforidua", price: 25 },
  { name: "Cape Coast", price: 35 },
  { name: "Winneba", price: 25 },
  { name: "Kasoa", price: 20 },
  { name: "Kumasi", price: 60 },
  { name: "Sunyani", price: 75 },
  { name: "Techiman", price: 70 },
  { name: "Obuasi", price: 50 },
  { name: "Tarkwa", price: 55 },
  { name: "Takoradi", price: 50 },
  { name: "Ho", price: 35 },
  { name: "Hohoe", price: 45 },
  { name: "Tamale", price: 100 },
  { name: "Bolgatanga", price: 120 },
  { name: "Wa", price: 115 },
  { name: "Nkawkaw", price: 30 },
  { name: "Nsawam", price: 20 },
  { name: "Dunkwa-on-Offin", price: 40 },
]

// Find the city price
export function getCityPrice(city: string): number {
  const found = GHANA_CITIES.find(
    (item) => item.name.toLowerCase() === city?.toLowerCase()
  )

  return found?.price ?? 0
}

// Calculate the fare between two cities.
//
// We use the difference between the city base prices.
// The minimum fare is 15 so that travelling between
// nearby cities still has a reasonable fare.
export function getRouteFare(
  departure: string,
  destination: string
): number {
  if (!departure || !destination) {
    return 0
  }

  if (departure.toLowerCase() === destination.toLowerCase()) {
    return 0
  }

  const departurePrice = getCityPrice(departure)
  const destinationPrice = getCityPrice(destination)

  const fare = Math.abs(destinationPrice - departurePrice)

  return Math.max(fare, 15)
}

// Class multiplier
export function getClassMultiplier(classType: string): number {
  switch (classType?.toLowerCase()) {
    case "business":
      return 1.5

    case "first":
      return 2

    case "economy":
    default:
      return 1
  }
}

// Final price for one passenger
export function getPricePerPassenger(
  departure: string,
  destination: string,
  classType: string
): number {
  const routeFare = getRouteFare(departure, destination)
  const multiplier = getClassMultiplier(classType)

  return routeFare * multiplier
}

// Final price for all passengers
export function getTotalFare(
  departure: string,
  destination: string,
  classType: string,
  passengers: number
): number {
  const pricePerPassenger = getPricePerPassenger(
    departure,
    destination,
    classType
  )

  return pricePerPassenger * Math.max(passengers || 1, 1)
}