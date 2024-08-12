import { Header } from '@/components/header'

import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import Image from 'next/image'
import BarberShopItem, {
  BarberShopItemProps,
} from '@/components/barber-shop-item'
import { quickSearchOptions } from '@/app/_constant/search'
import { BookingItem } from '@/components/booking-item'
import { getUser } from '@/lib/auth'
import Search from '@/components/search'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { Booking } from '@/types/booking'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

async function fetchBarberShops() {
  const barbershops = await api('/barbershops')
  const data = await barbershops.json()
  return data.barbershops
}
async function fetchBookingsUser() {
  const token = cookies().get('token')?.value
  const response = await api('/bookings', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      revalidate: 60 * 60 * 30,
    },
  })
  const data = await response.json()

  return data.bookings
}

export default async function Home() {
  const barbershops: BarberShopItemProps[] = await fetchBarberShops()

  const bookings: Booking[] = await fetchBookingsUser()

  const token = cookies().get('token')?.value
  const { name } = getUser()

  if (!token) {
    redirect('/sign-in')
  }
  return (
    <main>
      <Header />

      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, {name.split(' ')[0]}</h2>
        <p>
          <span className="capitalize">
            {format(new Date(), 'EEEE, dd', { locale: ptBR })}
          </span>
          <span>&nbsp;de&nbsp;</span>
          <span className="capitalize">
            {format(new Date(), 'MMMM', { locale: ptBR })}
          </span>
        </p>

        <div className="mt-6">
          <Search />
        </div>

        <div className="mt-6 flex gap-3 overflow-x-scroll lg:overflow-auto [&::-webkit-scrollbar]:hidden lg:[&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button
              key={option.title}
              className="gap-2"
              variant={'secondary'}
              asChild
            >
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  alt={option.title}
                  width={16}
                  height={16}
                />
                {option.title}
              </Link>
            </Button>
          ))}
        </div>

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Banner-01"
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>
        <h2 className="mb-3 mt-6 text-sm text-gray-400">Agendamentos</h2>
        <div className="flex gap-3 overflow-y-auto [&::-webkit-scrollbar]:hidden">
          {bookings.map((booking) => (
            <BookingItem key={booking.id} data={booking} />
          ))}
        </div>
        <h2 className="mb-3 mt-6 text-sm text-gray-400">RECOMENDADOS</h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarberShopItem key={barbershop.id} data={barbershop} />
          ))}
        </div>

        <h2 className="mb-3 mt-6 text-sm text-gray-400">POPULARES</h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarberShopItem key={barbershop.id} data={barbershop} />
          ))}
        </div>
      </div>
    </main>
  )
}
