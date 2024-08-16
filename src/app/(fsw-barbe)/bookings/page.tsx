import { BookingItem } from '@/components/booking-item'
import { Header } from '@/components/header'
import { SectionTitle } from '@/components/section-title'
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
  const closedBookings: Booking[] = await fetchConcludedBookings()
  const confirmedBookings: Booking[] = await fetchConfirmedBookings()

  const token = cookies().get('token')?.value

  if (!token) {
    redirect('/sign-in')
  }
  return (
    <>
      <Header />

      <div className="space-y-3 p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        {confirmedBookings.length > 0 && (
          <>
            <SectionTitle title="Confirmados" />
            {confirmedBookings.map((booking) => (
              <BookingItem key={booking.id} data={booking} />
            ))}
          </>
        )}

        {closedBookings.length > 0 && (
          <>
            <SectionTitle title="Finalizados" />

            {closedBookings.map((booking) => (
              <BookingItem key={booking.id} data={booking} />
            ))}
          </>
        )}
      </div>
    </>
  )
}
