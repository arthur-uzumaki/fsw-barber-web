import BarberShopItem, {
  BarberShopItemProps,
} from "@/components/barber-shop-item"
import { Header } from "@/components/header"
import Search from "@/components/search"
import { api } from "@/lib/api"

interface BarberShopPageProps {
  searchParams: {
    search: string
  }
}

async function searchBarbeShop(search: string) {
  const response = await api(`search-barbershops?search=${search}`)
  const data = await response.json()

  return data.barberShops
}

export default async function BarberShopPage({
  searchParams,
}: BarberShopPageProps) {
  const barberShops: BarberShopItemProps[] = await searchBarbeShop(
    searchParams.search,
  )

  return (
    <div>
      <Header />
      <div className="my-6 px-5">
        <Search />
      </div>
      <div className="px-5">
        <h2 className="up mb-3 mt-6 text-xs font-bold text-zinc-400">
          Resultado para &quot;{searchParams.search}
          &quot;
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {barberShops.map((barberShop) => (
            <BarberShopItem key={barberShop.id} data={barberShop} />
          ))}
        </div>
      </div>
    </div>
  )
}
