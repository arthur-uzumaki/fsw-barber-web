import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { StarIcon } from "lucide-react"
import Link from "next/link"

export interface BarberShopItemProps {
  id: string
  name: string
  address: string
  phones: string[]
  description: string
  imageUrl: string
  createdAt: string
  updatedAt: string
}

interface BarberShopItemData {
  data: BarberShopItemProps
}

export default function BarberShopItem({ data }: BarberShopItemData) {
  return (
    <Card className="min-w-[167px] rounded-2xl">
      <CardContent className="p-0 px-1 pb-2 pt-1">
        <div className="relative h-[159px] w-full">
          <Image
            src={data.imageUrl}
            alt={data.name}
            fill
            className="rounded-2xl object-cover"
            quality={100}
          />
          <Badge
            className="absolute left-2 top-2 space-x-1"
            variant={"secondary"}
          >
            <StarIcon className="h-4 w-3 fill-primary text-primary" />
            <p className="text-xs font-semibold">5.0</p>
          </Badge>
        </div>

        <div className="px-1 py-3">
          <h3 className="truncate font-semibold">{data.name}</h3>

          <p className="truncate text-sm text-gray-400">{data.address}</p>
          <Button asChild className="mt-3 w-full" variant={"secondary"}>
            <Link href={`/barbershops/${data.id}`}>Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
