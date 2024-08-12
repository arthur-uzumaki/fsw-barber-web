'use server'

import { api } from '@/lib/api'

interface GetBookingsProps {
  serviceId: string
  date: Date
}

export async function getBookings({ date, serviceId }: GetBookingsProps) {
  const response = await api(
    `/bookings/${serviceId}?date=${date.toISOString()}`,
  )

  if (!response.ok) {
    throw new Error('Failed to fetch bookings')
  }
  const data = await response.json()

  return data.bookings
}
