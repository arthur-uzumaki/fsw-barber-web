'use client'
import { toast } from 'sonner'
import { Button } from './ui/button'

interface PhoneCopyClickProps {
  phone: string
}
export function PhoneCopyClick({ phone }: PhoneCopyClickProps) {
  function handleCopyPhoneClick(phone: string) {
    navigator.clipboard.writeText(phone)
    toast.success('Telefone copiado com sucesso')
  }
  return (
    <Button
      variant={'outline'}
      size={'sm'}
      onClick={() => handleCopyPhoneClick(phone)}
    >
      Copiar
    </Button>
  )
}
