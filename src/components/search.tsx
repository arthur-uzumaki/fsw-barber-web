"use client"

import { SearchIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  search: z.string().trim().min(1, "Digite algo pra buscar"),
})

export default function Search() {
  const route = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  })

  function handleSubmit(data: z.infer<typeof formSchema>) {
    route.push(`/barbershops?search=${data.search}`)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="faça sua buscar" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button size={"icon"} type="submit">
          <SearchIcon />
        </Button>
      </form>
    </Form>
  )
}
