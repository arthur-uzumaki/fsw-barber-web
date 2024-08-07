import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { quickSearchOptions } from "@/app/_constant/search"
import { Avatar, AvatarImage } from "./ui/avatar"
import Link from "next/link"

export function Header() {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Image
          src="/logo.png"
          width={120}
          height={18}
          alt="FSW BARBER"
          quality={100}
        />

        <Sheet>
          <SheetTrigger asChild>
            <Button size={"icon"} variant={"outline"}>
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            <div className="flex items-center gap-3 border-b border-solid p-5">
              <Avatar>
                <AvatarImage src="https://github.com/Arttanjeiro.png" />
              </Avatar>
              <div>
                <p className="font-bold">Arthur Sousa</p>
                <p className="text-xs text-zinc-400">
                  pedrogoncalves@gmail.com
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 border-b border-solid p-5 py-5">
              <SheetClose asChild>
                <Button
                  variant={"ghost"}
                  className="justify-start gap-2"
                  asChild
                >
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
        </Sheet>
      </CardContent>
    </Card>
  )
}
