import { env } from '@/env/env'
import { NextRequest, NextResponse } from 'next/server'

const signInURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=http://localhost:3000/api/auth/callback&response_type=code&scope=email%20profile`
export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(signInURL, {
      headers: {
        'Set-Cookie': `redirecTo=${req.url}; Path=/; HttpOnly; max-age=20;`,
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/barbershops/:path*',
}
