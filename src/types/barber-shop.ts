import { Service } from './service'

export interface BarberShop {
  id: string
  name: string
  address: string
  phones: string[]
  description: string
  imageUrl: string
  createdAt: string
  updatedAt: string
  services: Service[]
}
