import { ptBR } from 'date-fns/locale'
import { Card, CardContent } from './ui/card'
import { format } from 'date-fns'
interface BookingSummaryProps {
  name: string
  price: number
  selectedDay: Date
}

export function BookingSummary({
  name,
  price,
  selectedDay,
}: BookingSummaryProps) {
  return (
    <Card>
      <CardContent className="space-y-3 p-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">{name}</h2>
          <p className="font-bold">
            {Intl.NumberFormat('pt-br', {
              style: 'currency',
              currency: 'BRL',
            }).format(price)}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm text-gray-400">Data</h2>
          <p className="font-bold">
            {format(selectedDay, "d 'de' MMMM", {
              locale: ptBR,
            })}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm text-gray-400">Horário</h2>
          <p className="font-bold">
            {format(selectedDay, 'HH:mm', { locale: ptBR })}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm text-gray-400">Barbearia</h2>
          <p className="font-bold">{name}</p>
        </div>
      </CardContent>
    </Card>
  )
}
