import { DeleteBooking } from './delete-booking'
import { Button } from './ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'

export function DialogContentBookingDelete({ id }: { id: string }) {
  return (
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
          <DeleteBooking id={id} />
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  )
}
