"use client"

import { useTransition } from "react"

import { cn } from "@/lib/utils"

import { updateCounterAction } from "./actions"

export function IncrementViaApiHandler({
  currentValue,
}: {
  currentValue: number
}) {
  return (
    <button
      className={cn(
        "rounded border-2 border-dashed border-cyan-400 p-4",
        true &&
          "before:mr-2 before:inline-block before:h-3 before:w-3 before:rounded-full before:bg-red-600",
      )}
      type="button"
      onClick={async () => {
        const res = await fetch("/api/increment", {
          method: "PATCH",
          body: JSON.stringify({
            value: currentValue,
            from: "IncrementViaApiHandler",
          }),
        })

        const r = (await res.json()) as unknown

        console.log("IncrementViaApiHandler res:", { r })
      }}
    >
      IncrementViaApiHandler
    </button>
  )
}

export function IncrementViaServerActions({
  currentValue,
}: {
  currentValue: number
}) {
  const [isPending, startTransition] = useTransition()
  return (
    <button
      disabled={isPending}
      className={cn(
        "rounded border-2 border-dashed border-green-400 p-4",
        false &&
          "before:mr-2 before:inline-block before:h-3 before:w-3 before:rounded-full before:bg-red-600",
        "disabled:border-gray-500",
      )}
      type="button"
      onClick={() => startTransition(() => updateCounterAction(currentValue))}
    >
      IncrementViaServerActions
    </button>
  )
}
