import { BookingItem } from '@/components/booking-item'
import { Header } from '@/components/header'
import { api } from '@/lib/api'
import { Booking } from '@/types/booking'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Agendamentos',
}

async function fetchConfirmedBookings() {
  const token = cookies().get('token')?.value
  const response = await api('/bookings/confirmed', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  })
  const data = await response.json()

  return data.bookings
}

async function fetchConcludedBookings() {
  const token = cookies().get('token')?.value
  const response = await api('/bookings/concluded', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  })
  const data = await response.json()

  return data.bookings
}

export default async function Bookings() {
  const token = cookies().get('token')?.value

  const closedBookings: Booking[] = await fetchConcludedBookings()
  const confirmedBookings: Booking[] = await fetchConfirmedBookings()

  return (
    <>
      <Header />

      <div className="space-y-3 p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        {confirmedBookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Confirmados
            </h2>

            {confirmedBookings.map((booking) => (
              <BookingItem key={booking.id} data={booking} />
            ))}
          </>
        )}

        {closedBookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Finalizados
            </h2>

            {closedBookings.map((booking) => (
              <BookingItem key={booking.id} data={booking} />
            ))}
          </>
        )}
      </div>
    </>
  )
}
