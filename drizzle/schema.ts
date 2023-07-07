import { mysqlTable, mysqlSchema, AnyMySqlColumn, serial, varchar, int, datetime, timestamp } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const counters = mysqlTable("counters", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	rating: int("rating").default(0).notNull(),
	createdAt: datetime("createdAt", { mode: 'string', fsp: 3 }).default(sql`(CURRENT_TIMESTAMP(3))`).notNull(),
	updatedAt: timestamp("updatedAt", { mode: 'string' }).default(sql`(now())`).onUpdateNow(),
});