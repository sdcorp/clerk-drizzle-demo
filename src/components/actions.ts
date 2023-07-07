"use server"

import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"

import { sleep } from "@/lib/utils"
import { db } from "@/db"
import { counters } from "@/db/schema"

export async function updateCounterAction(currentCount: number) {
  "use server"

  // const currentCount = counter?.count ?? 0

  if (!currentCount) {
    console.log("no value provided for updateCounterAction")
    return
  }

  const newCount = currentCount + 1

  await db.update(counters).set({ count: newCount }).where(eq(counters.id, 1))

  await sleep(1000)

  console.log("updateCounterAction imperatively", { currentCount, newCount })

  revalidatePath("/")
}