import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

interface User {
  sub: string
  name: string
  avatar_url: string
  email: string
}

export function getUser(): User | null {
  const token = cookies().get('token')?.value

  if (!token) {
    return null
  }

  const user: User = jwtDecode(token)
  return user
}
