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
    redirect('/')
    return null
  }

  try {
    const user: User = jwtDecode(token)
    return user
  } catch (error) {
    console.error('Erro ao decodificar o token:', error)
    redirect('/')
    return null
  }
}
