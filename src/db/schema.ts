import { sql, type InferModel } from "drizzle-orm"
import {
  datetime,
  int,
  mysqlTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core"

export const counters = mysqlTable("counters", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 191 }).notNull(),
  count: int("count").notNull().default(0),
  createdAt: datetime("createdAt", { mode: "string", fsp: 3 })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP(3)`),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
})

export type Counter = InferModel<typeof counters>
