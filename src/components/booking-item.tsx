import { Card, CardContent } from '@/components/ui/card'
import { Badge } from './ui/badge'
import { Avatar, AvatarImage } from './ui/avatar'
import { Booking } from '@/types/booking'
import { format, isFuture } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface BookingItemProps {
  data: Booking
}

export function BookingItem({ data }: BookingItemProps) {
  const isConfirmed = isFuture(data.date)
  return (
    <>
      <Card className="min-w-[90%]">
        <CardContent className="flex justify-between p-0">
          <div className="flex flex-col gap-2 py-5 pl-5">
            <Badge
              className="w-fit"
              variant={isConfirmed ? 'default' : 'secondary'}
            >
              {isConfirmed ? 'Confirmado' : 'Finalizado'}
            </Badge>
            <h3 className="font-semibold">{data.service.name}</h3>
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
    </>
  )
}
