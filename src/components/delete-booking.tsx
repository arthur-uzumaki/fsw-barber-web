'use client'
import { deleteBooking } from '@/_actions/delete-booking'
import { Button } from './ui/button'
import { toast } from 'sonner'

interface DeleteBookingProps {
  id: string
}

export function DeleteBooking({ id }: DeleteBookingProps) {
  async function handleDeleteBooking() {
    try {
      await deleteBooking(id)
      toast.success('Reserva cancelado com sucesso! ')
    } catch (error) {
      toast.error('Error ao cancelar a reservar. Tenta de novo')
    }
  }
  return (
    <Button
      variant={'destructive'}
      className="w-full"
      type="button"
      onClick={handleDeleteBooking}
    >
      Confirmar
    </Button>
  )
}
