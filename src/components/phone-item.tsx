import { SmartphoneIcon } from 'lucide-react'
import { PhoneCopyClick } from './phone-copy-click'

interface PhoneItemProps {
  phone: string
}

export function PhoneItem({ phone }: PhoneItemProps) {
  return (
    <div key={phone} className="flex justify-between">
      <div className="flex items-center gap-2 space-y-2">
        <SmartphoneIcon />
        <p>{phone}</p>
      </div>
      <PhoneCopyClick phone={phone} />
    </div>
  )
}
