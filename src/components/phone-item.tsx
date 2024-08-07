"use client"
import { SmartphoneIcon } from "lucide-react"
import { Button } from "./ui/button"
import { toast } from "sonner"

interface PhoneItemProps {
  phone: string
}

export function PhoneItem({ phone }: PhoneItemProps) {
  function handleCopyPhoneClick(phone: string) {
    navigator.clipboard.writeText(phone)
    toast.success("Telefone copiado com sucesso")
  }
  return (
    <div key={phone} className="flex justify-between">
      <div className="flex items-center gap-2 space-y-2">
        <SmartphoneIcon />
        <p>{phone}</p>
      </div>

      <Button
        variant={"outline"}
        size={"sm"}
        onClick={() => handleCopyPhoneClick(phone)}
      >
        Copiar
      </Button>
    </div>
  )
}
