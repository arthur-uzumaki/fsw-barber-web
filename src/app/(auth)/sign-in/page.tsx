import { Button } from '@/components/ui/button'
import { env } from '@/env/env'
import Image from 'next/image'
import Link from 'next/link'

export default function SignIn() {
  return (
    <main className="grid max-h-[860px] w-full grid-cols-2">
      <div className="relative">
        <Image
          className="absolute left-10 top-10"
          src={'/logo.png'}
          alt="banner"
          width={250}
          height={250}
          quality={100}
        />
        <div className="hidden rounded-md lg:-m-10 lg:block lg:h-[900px] lg:w-[900px] lg:bg-zinc-900" />
      </div>

      <div className="flex flex-col items-center justify-center gap-10">
        <div className="relative">
          <h1 className="absolute -top-[325px] right-[200px] text-5xl font-semibold">
            Login
          </h1>
        </div>
        <Button variant={'outline'} className="w-1/2 gap-2">
          <Image
            alt="Fazer login com google"
            src={'/google.svg'}
            width={20}
            height={20}
          />
          <Link
            className="text-lg font-bold"
            href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=http://localhost:3000/api/auth/callback&response_type=code&scope=email%20profile`}
          >
            Google
          </Link>
        </Button>
      </div>
    </main>
  )
}
