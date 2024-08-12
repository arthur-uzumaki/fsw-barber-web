'use server'

import { api } from '@/lib/api'
import { revalidatePath } from 'next/cache'

export async function deleteBooking(id: string) {
  await api(`/bookings/${id}`, {
    method: 'DELETE',
  })

  revalidatePath('/bookings')
}
