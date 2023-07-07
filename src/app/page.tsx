import { Suspense } from "react"
import { revalidatePath } from "next/cache"
import { kv } from "@vercel/kv"
import { eq } from "drizzle-orm"

import { sleep } from "@/lib/utils"
import { db } from "@/db"
import { counters } from "@/db/schema"
import Counter from "@/components/Counter"
import {
  IncrementViaApiHandler,
  IncrementViaServerActions,
} from "@/components/Increment"

// export const revalidate = 0

function SuspenseLoading({
  children,
  enabled = false,
}: {
  children: React.ReactNode
  enabled?: boolean
}) {
  return enabled ? (
    <Suspense
      fallback={
        <h1 className="text-3xl text-lime-500">Loading from suspense... </h1>
      }
    >
      {children}
    </Suspense>
  ) : (
    children
  )
}

// const getCounter = cache(async () => {
//   const counter = await db.query.counters.findFirst()
//   await sleep(1000)
//   return counter
// })

export default async function Home() {
  const counter = await db.query.counters.findFirst()
  const kvCount = await kv.get<number>("count")
  await sleep(1000)
  // const counter = await getCounter()

  async function updateCounterAction() {
    "use server"

    const currentCount = counter?.count ?? 0
    if (!currentCount) {
      console.log("no value provided for updateCounterAction")
      return
    }

    const newCount = currentCount + 1

    await db.update(counters).set({ count: newCount }).where(eq(counters.id, 1))

    const kvCount = await kv.incr("count")

    console.log("updateCounterAction", { currentCount, newCount, kvCount })

    revalidatePath("/")
  }

  return (
    <SuspenseLoading enabled={Boolean(0)}>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <form className="grid w-full items-center justify-center gap-4">
          <button
            className="rounded border-2 border-dashed border-purple-500 p-4 disabled:border-gray-500"
            formAction={updateCounterAction}
            type="submit"
          >
            IncrementViaServerForm
          </button>
          <IncrementViaApiHandler currentValue={counter?.count ?? 0} />
          <IncrementViaServerActions currentValue={counter?.count ?? 0} />
          <p className="text-3xl text-yellow-500">
            Counter: {counter?.count ?? 0}
          </p>
          <p className="text-3xl text-yellow-500">KV Counter: {kvCount ?? 0}</p>
          <SuspenseLoading enabled={Boolean(0)}>
            <Counter delay={3000} />
          </SuspenseLoading>
        </form>
      </div>
    </SuspenseLoading>
  )
}
