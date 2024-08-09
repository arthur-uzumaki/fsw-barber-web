'use server'

import { api } from '@/lib/api'
import { cookies } from 'next/headers'

interface CreateBookingParam {
  serviceId: string
  date: Date
}

export async function createBooking({ date, serviceId }: CreateBookingParam) {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    throw new Error('Token not found. User may not be authenticated.')
  }

  const response = await api(`/bookings/${serviceId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ date: date.toISOString() }),
  })

  const data = response.json()
  return data
}
