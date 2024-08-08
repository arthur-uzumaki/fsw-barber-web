import { api } from "@/lib/api"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")
  const redirectTo = request.cookies.get("redirectTo")?.value

  const registeResponse = await api("/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  })

  const responseData = await registeResponse.json()

  const { token } = responseData

  const redirectURL = redirectTo ?? new URL("/", request.url)
  const cookiesExpiresInSecond = 60 * 60 * 24 * 7

  return NextResponse.redirect(redirectURL, {
    headers: {
      "Set-Cookie": `token=${token}; Path=/; max-age=${cookiesExpiresInSecond}`,
    },
  })
}
