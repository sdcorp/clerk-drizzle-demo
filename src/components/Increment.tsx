"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"

import { updateCounterAction } from "./actions"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  invalid?: boolean
  children: React.ReactNode
}

type PropsWithValue = {
  currentValue: number
}

export function IncrementBase({
  invalid = false,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded border-2 border-dashed border-cyan-400 p-4",
        invalid &&
          "before:mr-2 before:inline-block before:h-3 before:w-3 before:rounded-full before:bg-red-600",
        className,
      )}
      type="button"
      {...rest}
    >
      {children}
    </button>
  )
}

export function IncrementViaApiHandler({ currentValue }: PropsWithValue) {
  return (
    <IncrementBase
      className="border-cyan-400"
      invalid={Boolean(1)}
      onClick={async () => {
        await fetch("/api/increment?runRevalidatePath=1", {
          method: "PATCH",
          body: JSON.stringify({
            value: currentValue,
            from: "IncrementViaApiHandler",
          }),
        })
      }}
    >
      IncrementViaApiHandler
    </IncrementBase>
  )
}

export function IncrementViaRefresh({ currentValue }: PropsWithValue) {
  const router = useRouter()

  return (
    <>
      <IncrementBase
        className="border-blue-400"
        onClick={async () => {
          await fetch("/api/increment?runRevalidatePath=0", {
            method: "PATCH",
            body: JSON.stringify({ value: currentValue }),
          })
          router.refresh()
        }}
      >
        IncrementViaRefresh
      </IncrementBase>
    </>
  )
}

export function IncrementViaServerActions({ currentValue }: PropsWithValue) {
  const [isPending, startTransition] = useTransition()

  return (
    <IncrementBase
      disabled={isPending}
      className="border-green-400 disabled:border-gray-500"
      onClick={() => startTransition(() => updateCounterAction(currentValue))}
    >
      IncrementViaServerActions
    </IncrementBase>
  )
}
