import { Button } from '@/components/ui/button'
import { env } from '@/env/env'
import Image from 'next/image'
import Link from 'next/link'

export default function SignIn() {
  return (
    <main className="mt-10 flex w-full flex-col md:grid md:max-h-[860px] md:grid-cols-2">
      <div className="relative flex justify-center md:justify-start">
        <Image
          className="md:absolute md:left-10 md:top-10"
          src={'/logo.png'}
          alt="banner"
          width={150}
          height={150}
          quality={100}
        />
        <div className="hidden rounded-md lg:-m-10 lg:block lg:h-[900px] lg:w-[900px] lg:bg-zinc-900" />
      </div>

      <div className="flex flex-col items-center justify-center gap-10 p-5">
        <div className="relative">
          <h1 className="text-4xl font-semibold md:absolute md:-top-[325px] md:right-[200px] md:text-5xl">
            Login
          </h1>
        </div>
        <Button variant={'outline'} className="w-full gap-2 md:w-1/2">
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
