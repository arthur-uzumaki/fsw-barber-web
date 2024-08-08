import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    template: "Fsw-barber | %s",
    default: "Fsw-barber",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br" className="dark antialiased">
      <body className={inter.className}>
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  )
}
