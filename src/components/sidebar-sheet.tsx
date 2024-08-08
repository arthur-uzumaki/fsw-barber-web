import Link from "next/link"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import { quickSearchOptions } from "@/app/_constant/search"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { env } from "@/env/env"
import { getUser } from "@/lib/auth"

export function SidebarSheet() {
  const { avatar_url, email, name } = getUser()
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center justify-between gap-3 border-b border-solid p-5">
        <h2 className="font-bold">Olá,faça seu login</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button size={"icon"} variant={"link"}>
              <LogInIcon size={20} />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-11/12 rounded-lg">
            <DialogHeader>
              <DialogTitle>Faça login na plataforma</DialogTitle>
              <DialogDescription className="text-sm text-zinc-400">
                Conecte-se usando sua conta do Google
              </DialogDescription>
            </DialogHeader>

            <Button variant={"outline"} className="gap-2">
              <Image
                alt="Fazer login com google"
                src={"/google.svg"}
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
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex items-center gap-3 border-b border-solid p-5">
        <Avatar>
          <AvatarImage src={avatar_url} alt="Avatar do usuário" />
        </Avatar>
        <div>
          <p className="font-bold">{name}</p>
          <p className="text-xs text-zinc-400">{email}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-b border-solid p-5 py-5">
        <SheetClose asChild>
          <Button variant={"ghost"} className="justify-start gap-2" asChild>
            <Link href={"/"}>
              <HomeIcon size={18} />
              Inicio
            </Link>
          </Button>
        </SheetClose>
        <Button variant={"ghost"} className="justify-start gap-2">
          <CalendarIcon size={18} />
          Agendamentos
        </Button>
      </div>

      <div className="flex flex-col gap-4 border-b border-solid p-5 py-5">
        {quickSearchOptions.map((option) => (
          <Button
            className="justify-start gap-2"
            variant={"ghost"}
            key={option.title}
          >
            <Image
              alt={option.title}
              src={option.imageUrl}
              height={18}
              width={18}
            />
            {option.title}
          </Button>
        ))}
        <Button variant={"ghost"} className="justify-start gap-2">
          <CalendarIcon size={18} />
          Agendamentos
        </Button>
      </div>

      <div className="flex flex-col gap-4 p-5 py-5">
        <Button variant={"ghost"} className="justify-start gap-2">
          <LogOutIcon size={18} />
          Sai da conta
        </Button>
      </div>
    </SheetContent>
  )
}
