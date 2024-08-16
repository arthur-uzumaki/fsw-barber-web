import { format, isFuture } from 'date-fns'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { CardContent } from './ui/card'
import { ptBR } from 'date-fns/locale'

interface ServiceCardProps {
  date: Date
  name: string
  imageUrl: string
}

export function ServiceCard({ date, imageUrl, name }: ServiceCardProps) {
  const isConfirmed = isFuture(date)
  return (
    <CardContent className="flex justify-between p-0">
      <div className="flex flex-col gap-2 py-5 pl-5">
        <Badge
          className="w-fit"
          variant={isConfirmed ? 'default' : 'secondary'}
        >
          {isConfirmed ? 'Confirmado' : 'Finalizado'}
        </Badge>
        <h3 className="text-left font-semibold">{name}</h3>
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={imageUrl} />
          </Avatar>
          <p className="text-sm">{name}</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
        <p className="text-sm capitalize">
          {format(date, 'MMMM', { locale: ptBR })}
        </p>
        <p className="text-2xl">{format(date, 'dd', { locale: ptBR })}</p>
        <p className="text-sm">{format(date, 'HH:mm', { locale: ptBR })}</p>
      </div>
    </CardContent>
  )
}
