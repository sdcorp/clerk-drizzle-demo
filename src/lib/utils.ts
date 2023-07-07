import { env } from "@/env.mjs"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sleep() {
  return new Promise((resolve) =>
    setTimeout(resolve, Number(env.NEXT_PUBLIC_DELAY) ?? 0),
  )
}
