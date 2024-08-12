import { BarberShop } from './barber-shop'

export interface Service {
  id: string
  name: string
  description: string
  imageUrl: string
  price: number
  barbershopId: string
  baberShop: BarberShop
}
