import { Service as ServiceBarber } from "@/types/service"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

interface ServiceProps {
  data: ServiceBarber
}
export function Service({ data }: ServiceProps) {
  return (
    <Card>
      <CardContent className="item-center flex gap-3 p-3">
        <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
          <Image
            src={data.imageUrl}
            alt={data.name}
            fill
            quality={100}
            className="rounded-lg object-cover"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold">{data.name}</h3>
          <p className="text-sm text-gray-400">{data.description}</p>
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-primary">
              {Intl.NumberFormat("pt-br", {
                style: "currency",
                currency: "BRL",
              }).format(data.price)}
            </p>
            <Button variant={"secondary"} size={"sm"}>
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
