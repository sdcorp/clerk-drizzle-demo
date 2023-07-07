import { NextResponse, type NextRequest } from "next/server"

export function GET(req: NextRequest) {
  const href = req.nextUrl.href
  return NextResponse.json(
    { message: "Hello from route", href },
    { status: 200 },
  )
}
