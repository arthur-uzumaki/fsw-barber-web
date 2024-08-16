'use client'
import { Service as ServiceBarber } from '@/types/service'
import Image from 'next/image'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from './ui/sheet'

import { ptBR } from 'date-fns/locale'
import { useEffect, useMemo, useState } from 'react'
import { isPast, isToday, set } from 'date-fns'
import { BarberShopItemProps } from './barber-shop-item'
import { toast } from 'sonner'
import { createBooking } from '@/_actions/create-booking'
import { Booking } from '@/types/booking'
import { getBookings } from '@/_actions/get-bookings'
import Cookies from 'js-cookie'
import { TIME_LIST } from '@/app/_constant/time-list'
import { BookingSummary } from './booking-summary'
import { Calendar } from './calendar'

interface ServiceProps {
  data: ServiceBarber
  barberShop: Pick<BarberShopItemProps, 'name'>
}

interface GetTimeListProps {
  bookings: Booking[]
  selectedDay: Date
}
function getTimeList({ bookings, selectedDay }: GetTimeListProps) {
  return TIME_LIST.filter((time) => {
    const hour = Number(time.split(':')[0])
    const minutes = Number(time.split(':')[1])

    const timeIsOnThePast = isPast(set(new Date(), { hours: hour, minutes }))

    if (timeIsOnThePast && isToday(selectedDay)) {
      return false
    }

    const hasBookingOnCurrentTime = bookings.some((booking) => {
      const bookingDate = new Date(booking.date)
      return (
        bookingDate.getHours() === hour && bookingDate.getMinutes() === minutes
      )
    })

    if (hasBookingOnCurrentTime) {
      return false
    }
    return true
  })
}

export function ServiceItem({ data, barberShop }: ServiceProps) {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )
  const [dayBookings, setDayBookings] = useState<Booking[]>([])
  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false)

  useEffect(() => {
    async function fetchBookings() {
      if (!selectedDay) {
        return
      }

      const bookings = await getBookings({
        date: selectedDay,
        serviceId: data.id,
      })

      setDayBookings(bookings)
    }

    fetchBookings()
  }, [selectedDay, data.id])

  function handleBookingClick() {
    const token = Cookies.get('token')
    if (token) {
      return setBookingSheetIsOpen(true)
    }
  }

  function handleBookingSheetOpenChange() {
    setSelectedDay(undefined)
    setSelectedTime(undefined)
    setDayBookings([])
    setBookingSheetIsOpen(false)
  }

  function handleDateSelect(date: Date | undefined) {
    setSelectedDay(date)
  }

  function handleTimeSelect(time: string) {
    setSelectedTime(time)
  }

  async function handleCreateBooking() {
    try {
      if (!selectedDay || !selectedTime) {
        return
      }

      const hour = Number(selectedTime.split(':')[0])
      const minute = Number(selectedTime.split(':')[1])

      const newDate = set(selectedDay, {
        minutes: minute,
        hours: hour,
      })

      await createBooking({
        serviceId: data.id,
        date: newDate,
      })
      toast.success('Reserva criada com sucesso!')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao criar reserva!')
    }
  }

  const timeList = useMemo(() => {
    if (!selectedDay) {
      return []
    }
    return getTimeList({
      bookings: dayBookings,
      selectedDay,
    })
  }, [dayBookings, selectedDay])

  return (
    <>
      <Card>
        <CardContent className="item-center flex gap-3 p-3">
          <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
            <Image
              src={data.imageUrl}
              alt={data.name}
              fill
              quality={100}
              className="rounded-lg object-cover"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold">{data.name}</h3>
            <p className="text-sm text-gray-400">{data.description}</p>
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-primary">
                {Intl.NumberFormat('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(data.price)}
              </p>

              <Sheet
                open={bookingSheetIsOpen}
                onOpenChange={handleBookingSheetOpenChange}
              >
                <Button
                  variant={'secondary'}
                  size={'sm'}
                  onClick={handleBookingClick}
                >
                  Reservar
                </Button>

                <SheetContent className="px-0">
                  <SheetHeader>
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>

                  <div className="border-b border-solid py-5">
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      selected={selectedDay}
                      onSelect={handleDateSelect}
                    />
                  </div>
                  {selectedDay && (
                    <div className="flex gap-3 overflow-x-auto border-b border-solid p-5 px-5 [&::-webkit-scrollbar]:hidden">
                      {timeList.length > 0 ? (
                        timeList.map((time) => (
                          <Button
                            key={time}
                            variant={
                              selectedTime === time ? 'default' : 'outline'
                            }
                            className="rounded-full"
                            onClick={() => handleTimeSelect(time)}
                          >
                            {time}
                          </Button>
                        ))
                      ) : (
                        <p>Não há horário disponíveis para esse dia.</p>
                      )}
                    </div>
                  )}

                  {selectedTime && selectedDay && (
                    <div className="p-5">
                      <BookingSummary
                        selectedDay={selectedDay}
                        name={data.name}
                        price={data.price}
                      />
                    </div>
                  )}

                  <SheetFooter className="mt-5 px-5">
                    {selectedDay && selectedTime && (
                      <Button onClick={handleCreateBooking}>Confirmar</Button>
                    )}
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
