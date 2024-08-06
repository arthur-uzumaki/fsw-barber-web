import { Header } from "@/components/header"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { api } from "@/lib/api"
import { SearchIcon } from "lucide-react"
import Image from "next/image"
import BarberShopItem, {
  BarberShopItemProps,
} from "@/components/barber-shop-item"

async function fetchBarberShops() {
  const barbershops = await api("/barbershops")
  const data = await barbershops.json()
  return data.barbershops
}

export default async function Home() {
  const barbershops: BarberShopItemProps[] = await fetchBarberShops()

  return (
    <main>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Arthur</h2>
        <p>Segundo-feira, 05</p>

        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca" />
          <Button size={"icon"}>
            <SearchIcon />
          </Button>
        </div>

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Banner-01"
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        <h2 className="mb-3 mt-6 text-sm text-gray-400">AGENDAMENTOS</h2>
        <Card className="">
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit">Confirmado</Badge>
              <h3 className="font-semibold">Corte de Cabelo</h3>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                </Avatar>
                <p className="text-sm">Vintage Barber</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm">Fevereiro</p>
              <p className="text-2xl">06</p>
              <p className="text-sm">09:45</p>
            </div>
          </CardContent>
        </Card>

        <h2 className="mb-3 mt-6 text-sm text-gray-400">RECOMENDADOS</h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarberShopItem key={barbershop.id} data={barbershop} />
          ))}
        </div>
      </div>
    </main>
  )
}
