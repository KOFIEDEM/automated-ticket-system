export const GHANA_CITIES = [
  { name: 'Accra', price: 0 },
  { name: 'Kumasi', price: 80 },
  { name: 'Takoradi', price: 70 },
  { name: 'Cape Coast', price: 50 },
  { name: 'Tamale', price: 120 },
  { name: 'Sunyani', price: 90 },
  { name: 'Ho', price: 60 },
  { name: 'Koforidua', price: 40 },
  { name: 'Wa', price: 130 },
  { name: 'Bolgatanga', price: 140 },
  { name: 'Tema', price: 20 },
  { name: 'Obuasi', price: 70 },
  { name: 'Tarkwa', price: 65 },
  { name: 'Nkawkaw', price: 45 },
  { name: 'Techiman', price: 85 },
  { name: 'Berekum', price: 95 },
  { name: 'Dormaa Ahenkro', price: 100 },
  { name: 'Goaso', price: 90 },
  { name: 'Dunkwa-on-Offin', price: 55 },
  { name: 'Elmina', price: 55 },
  { name: 'Winneba', price: 35 },
  { name: 'Kasoa', price: 25 },
  { name: 'Axim', price: 85 },
  { name: 'Aflao', price: 80 },
  { name: 'Keta', price: 75 },
  { name: 'Hohoe', price: 70 },
  { name: 'Yendi', price: 130 },
  { name: 'Damongo', price: 125 },
  { name: 'Navrongo', price: 145 },
]

export function getCityPrice(cityName: string) {
  return (
    GHANA_CITIES.find(
      (city) => city.name === cityName
    )?.price ?? 0
  )
}

export function calculateTicketPrice(
  departure: string,
  destination: string
) {
  const departurePrice = getCityPrice(departure)
  const destinationPrice = getCityPrice(destination)

  return Math.abs(
    destinationPrice - departurePrice
  )
}