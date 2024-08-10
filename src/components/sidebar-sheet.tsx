import Link from 'next/link'
import { Button } from './ui/button'
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from './ui/sheet'
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from 'lucide-react'
import { quickSearchOptions } from '@/app/_constant/search'
import Image from 'next/image'

import { cookies } from 'next/headers'
import { Profile } from './profile'
import { DialogAuthGoogle } from './dialog-auth-google'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'

export function SidebarSheet() {
  const token = cookies().get('token')?.value

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      {!token ? (
        <div className="flex items-center justify-between gap-3 border-b border-solid p-5">
          <h2 className="font-bold">Olá, faça seu login</h2>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant={'link'} size="icon">
                <LogInIcon />
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[90%]">
              <DialogAuthGoogle />
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <Profile />
      )}

      <div className="flex flex-col gap-4 border-b border-solid p-5 py-5">
        <SheetClose asChild>
          <Button variant={'ghost'} className="justify-start gap-2" asChild>
            <Link href={'/'}>
              <HomeIcon size={18} />
              Inicio
            </Link>
          </Button>
        </SheetClose>
        <Button variant={'ghost'} className="justify-start gap-2">
          <CalendarIcon size={18} />
          Agendamentos
        </Button>
      </div>

      <div className="flex flex-col gap-4 border-b border-solid p-5 py-5">
        {quickSearchOptions.map((option) => (
          <SheetClose asChild key={option.title}>
            <Button className="justify-start gap-2" variant={'ghost'} asChild>
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  alt={option.title}
                  src={option.imageUrl}
                  height={18}
                  width={18}
                />
                {option.title}
              </Link>
            </Button>
          </SheetClose>
        ))}
        <Button variant={'ghost'} className="justify-start gap-2">
          <CalendarIcon size={18} />
          Agendamentos
        </Button>
      </div>

      <div className="flex flex-col gap-4 p-5 py-5">
        <Button variant={'ghost'} className="justify-start gap-2">
          <LogOutIcon size={18} />
          <Link href={'/api/auth/logout'}>Sai da conta</Link>
        </Button>
      </div>
    </SheetContent>
  )
}
