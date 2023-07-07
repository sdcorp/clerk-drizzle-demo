import { Suspense } from "react"
import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"

import { sleep } from "@/lib/utils"
import { db } from "@/db"
import { counters } from "@/db/schema"
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
        <h1 className="text-3xl text-orange-500">Loading from suspense... </h1>
      }
    >
      {children}
    </Suspense>
  ) : (
    children
  )
}
export default async function Home() {
  const counter = await db.query.counters.findFirst()
  await sleep()

  async function updateCounterAction() {
    "use server"

    const currentCount = counter?.count ?? 0
    if (!currentCount) {
      console.log("no value provided for updateCounterAction")
      return
    }

    const newCount = currentCount + 1

    await db.update(counters).set({ count: newCount }).where(eq(counters.id, 1))

    console.log("updateCounterAction", { currentCount, newCount })

    revalidatePath("/")
  }

  return (
    <SuspenseLoading enabled={Boolean(0)}>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <form className="flex items-center gap-4">
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
        </form>
      </div>
    </SuspenseLoading>
  )
}
