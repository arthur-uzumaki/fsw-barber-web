import { Toaster } from '@/components/ui/sonner'
import { Footer } from '@/components/footer'

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className="flex h-full flex-col">
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
      <Toaster />
    </>
  )
}
