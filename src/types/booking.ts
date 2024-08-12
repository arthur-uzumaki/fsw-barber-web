import { BarberShopItemProps } from '@/components/barber-shop-item'
import { BarberShop } from './barber-shop'
import { Service } from './service'

export interface Booking {
  id: string
  userId: string
  serviceId: string
  date: Date
  createdAt: Date
  updatedAt: Date
  service: Service
  barbershop: BarberShopItemProps
}
