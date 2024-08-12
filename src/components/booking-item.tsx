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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { deleteBooking } from '@/_actions/delete-booking'
import { toast } from 'sonner'

interface BookingItemProps {
  data: Booking
}

export function BookingItem({ data }: BookingItemProps) {
  const isConfirmed = isFuture(data.date)

  async function handleDeleteBooking() {
    try {
      await deleteBooking(data.id)
      toast.success('Reserva cancelado com sucesso! ')
    } catch (error) {
      toast.error('Error ao cancelar a reservar. Tenta de novo')
    }
  }
  return (
    <Sheet>
      <SheetTrigger className="w-full">
        <Card className="min-w-[90%]">
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge
                className="w-fit"
                variant={isConfirmed ? 'default' : 'secondary'}
              >
                {isConfirmed ? 'Confirmado' : 'Finalizado'}
              </Badge>
              <h3 className="text-left font-semibold">{data.service.name}</h3>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={data.barbershop.imageUrl} />
                </Avatar>
                <p className="text-sm">{data.barbershop.name}</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm capitalize">
                {format(data.date, 'MMMM', { locale: ptBR })}
              </p>
              <p className="text-2xl">
                {format(data.date, 'dd', { locale: ptBR })}
              </p>
              <p className="text-sm">
                {format(data.date, 'HH:mm', { locale: ptBR })}
              </p>
            </div>
          </CardContent>
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
            selectedTime={data.date}
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
                <DialogContent className="w-[90%]">
                  <DialogHeader>
                    <DialogTitle>Cancelar Reserva</DialogTitle>
                    <DialogDescription className="text-zinc-500">
                      Tem certeza que deseja cancelar esse agendamento?
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter className="flex-row gap-5">
                    <DialogClose asChild className="">
                      <Button variant={'outline'} className="w-full">
                        Voltar
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        variant={'destructive'}
                        className="w-full"
                        type="button"
                        onClick={handleDeleteBooking}
                      >
                        Confirmar
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
