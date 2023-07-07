import React from "react"

import { sleep } from "@/lib/utils"
import { db } from "@/db"

export default async function Counter() {
  const counter = await db.query.counters.findFirst()
  await sleep()

  return (
    <p className="text-3xl text-orange-500">
      Separate RSC with counter: {counter?.count ?? 0}
    </p>
  )
}
