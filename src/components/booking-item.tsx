'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from './ui/badge'
import { Avatar, AvatarImage } from './ui/avatar'
import { Booking } from '@/types/booking'
import { format, isFuture } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import Image from 'next/image'
import { BookingSummary } from './booking-summary'
import { PhoneItem } from './phone-item'
import { Button } from './ui/button'
import { Dialog, DialogTrigger } from './ui/dialog'

import { DialogContentBookingDelete } from './dialog-content-booking-delete'
import { ServiceCard } from './service-card'

interface BookingItemProps {
  data: Booking
}

export function BookingItem({ data }: BookingItemProps) {
  const isConfirmed = isFuture(data.date)

  return (
    <Sheet>
      <SheetTrigger className="w-full">
        <Card className="min-w-[90%]">
          <ServiceCard
            name={data.barbershop.name}
            imageUrl={data.barbershop.imageUrl}
            date={data.date}
          />
        </Card>
      </SheetTrigger>

      <SheetContent className="w-[90%]">
        <SheetHeader className="border-b border-solid pb-6">
          <SheetTitle className="text-left">Informações da Reserva</SheetTitle>
        </SheetHeader>

        <div className="relative mt-6 flex h-[180px] w-full items-end">
          <Image
            src={'/mapa.png '}
            alt={`Mapa da barbearia ${data.barbershop.name}`}
            className="rounded-xl object-cover"
            fill
            quality={100}
          />
          <Card className="z-50 mx-5 mb-3 w-full rounded-xl">
            <CardContent className="flex items-center gap-3 px-5 py-3">
              <Avatar>
                <AvatarImage src={data.barbershop.imageUrl} />
              </Avatar>

              <div className="">
                <h3 className="font-bold">{data.barbershop.name}</h3>
                <p className="text-xs text-zinc-400">
                  {data.barbershop.address}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-6">
          <Badge
            className="w-fit"
            variant={isConfirmed ? 'default' : 'secondary'}
          >
            {isConfirmed ? 'Confirmado' : 'Finalizado'}
          </Badge>
        </div>
        <div className="mb-6 mt-4">
          <BookingSummary
            name={data.barbershop.name}
            price={data.service.price}
            selectedDay={data.date}
          />
        </div>

        <div className="space-y-3">
          {data.barbershop.phones.map((phone, index) => (
            <PhoneItem key={index} phone={phone} />
          ))}
        </div>
        <SheetFooter className="mt-6">
          <div className="flex items-center gap-3">
            <SheetClose asChild>
              <Button variant={'outline'} className="w-full">
                Voltar
              </Button>
            </SheetClose>
            {isConfirmed && (
              <Dialog>
                <DialogTrigger>
                  <Button variant={'destructive'} className="w-full">
                    Cancelar
                  </Button>
                </DialogTrigger>
                <DialogContentBookingDelete id={data.id} />
              </Dialog>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
