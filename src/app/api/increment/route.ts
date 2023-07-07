import { revalidatePath } from "next/cache"
import { NextResponse, type NextRequest } from "next/server"
import { kv } from "@vercel/kv"
import { eq } from "drizzle-orm"

import { sleep } from "@/lib/utils"
import { db } from "@/db"
import { counters } from "@/db/schema"

export const revalidate = 0
export const dynamic = "force-dynamic"

export async function PATCH(request: NextRequest) {
  const runRevalidatePath = Number(
    request.nextUrl.searchParams.get("runRevalidatePath") ?? 0,
  )
  const body = (await request.json()) as { value: number; from: string }
  const kvCount = await kv.incr("count")

  if (!body?.value) {
    return NextResponse.json(
      {
        success: false,
        message: "No valid value provided",
        meta: { body },
      },
      { status: 400 },
    )
  }

  const currentCount = body.value
  const newCount = body.value + 1

  console.log("PATCH counter:", {
    currentCount,
    newCount,
    from: body.from,
    kvCount,
  })

  await db
    .update(counters)
    .set({ count: body.value + 1 })
    .where(eq(counters.id, 1))

  await sleep()

  if (runRevalidatePath) {
    revalidatePath("/")
  }

  return NextResponse.json(
    {
      success: true,
      message: "Updated",
      meta: { ...body, newCount, kvCount, runRevalidatePath },
    },
    { status: 200 },
  )
}
