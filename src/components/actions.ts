"use server"

import { revalidatePath } from "next/cache"
import { kv } from "@vercel/kv"
import { eq } from "drizzle-orm"

import { sleep } from "@/lib/utils"
import { db } from "@/db"
import { counters } from "@/db/schema"

export async function updateCounterAction(currentCount: number) {
  if (!currentCount) return

  const newCount = currentCount + 1

  await db.update(counters).set({ count: newCount }).where(eq(counters.id, 1))

  await kv.incr("count")

  await sleep()

  revalidatePath("/")
}
