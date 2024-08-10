import { LogInIcon } from 'lucide-react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { env } from '@/env/env'
import Image from 'next/image'
import Link from 'next/link'
export function DialogAuthGoogle() {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Faça login na plataforma</DialogTitle>
        <DialogDescription className="text-sm text-zinc-400">
          Conecte-se usando sua conta do Google
        </DialogDescription>
      </DialogHeader>

      <Button variant={'outline'} className="gap-2">
        <Image
          alt="Fazer login com google"
          src={'/google.svg'}
          width={18}
          height={18}
        />
        <Link
          className="text-sm font-bold"
          href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=http://localhost:3000/api/auth/callback&response_type=code&scope=email%20profile`}
        >
          Google
        </Link>
      </Button>
    </>
  )
}
