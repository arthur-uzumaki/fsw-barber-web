import { BarberShopItemProps } from "@/components/barber-shop-item"
import { PhoneItem } from "@/components/phone-item"
import { Service } from "@/components/service-item"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

interface BarberShopPageProps {
  params: {
    id: string
  }
}

async function getBarbeShopDetails(id: string) {
  const response = await api(`/barbershops/${id}`)
  const data = await response.json()

  return data.barbershop
}

export async function generateMetadata({
  params,
}: BarberShopPageProps): Promise<Metadata> {
  const barbershop = await getBarbeShopDetails(params.id)
  return {
    title: barbershop.name,
  }
}

export default async function BarberShpPage({ params }: BarberShopPageProps) {
  const barbershop: BarberShopItemProps = await getBarbeShopDetails(params.id)

  return (
    <main className="">
      <div className="relative h-[250px] w-full">
        <Image
          alt={barbershop.name}
          src={barbershop.imageUrl}
          fill
          className="object-cover"
        />

        <Button
          asChild
          className="absolute left-4 top-4"
          size={"icon"}
          variant={"secondary"}
        >
          <Link href={"/"}>
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Button
          asChild
          className="absolute right-4 top-4"
          size={"icon"}
          variant={"secondary"}
        >
          <MenuIcon />
        </Button>
      </div>

      <div className="border-b border-solid p-5">
        <h1 className="mb-3 text-xl font-bold">{barbershop.name}</h1>
        <div className="flex items-center gap-1 pb-2">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop.address}</p>
        </div>

        <div className="flex items-center gap-1">
          <StarIcon className="fill-primary text-primary" size={18} />
          <p className="text-sm">5,0 (499 avaliação)</p>
        </div>
      </div>

      <div className="space-y-3 border-b border-solid p-5">
        <h3 className="text-xs font-bold text-zinc-400">SOBRE NÓS</h3>
        <p className="text-sm">{barbershop.description}</p>
      </div>

      <div className="space-y-3 border-b border-solid p-5">
        <h3 className="text-xs font-bold text-zinc-400">SERVIÇOS</h3>
        <div className="space-y-3">
          {barbershop.services?.map((service) => (
            <Service key={service.id} data={service} />
          ))}
        </div>
      </div>

      <div className="space-y-3 p-5">
        <h3 className="text-xs font-bold text-zinc-400">CONTATO</h3>
        {barbershop.phones.map((phone) => (
          <PhoneItem key={phone} phone={phone} />
        ))}
      </div>
    </main>
  )
}
