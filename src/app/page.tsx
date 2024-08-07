import { Header } from "@/components/header"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { api } from "@/lib/api"
import { SearchIcon } from "lucide-react"
import Image from "next/image"
import BarberShopItem, {
  BarberShopItemProps,
} from "@/components/barber-shop-item"
import { quickSearchOptions } from "./_constant/search"
import { BookingItem } from "@/components/booking-item"

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

        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button key={option.title} className="gap-2" variant={"secondary"}>
              <Image
                src={option.imageUrl}
                alt={option.title}
                width={16}
                height={16}
              />
              {option.title}
            </Button>
          ))}
        </div>

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Banner-01"
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        <BookingItem />

        <h2 className="mb-3 mt-6 text-sm text-gray-400">RECOMENDADOS</h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarberShopItem key={barbershop.id} data={barbershop} />
          ))}
        </div>

        <h2 className="mb-3 mt-6 text-sm text-gray-400">POPULARES</h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarberShopItem key={barbershop.id} data={barbershop} />
          ))}
        </div>
      </div>
    </main>
  )
}
