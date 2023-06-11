import { orders } from "@/drizzle/schema/orders"
import { tables } from "@/drizzle/schema/tables"
import { InferModel, relations, sql } from "drizzle-orm"
import {
  int,
  mysqlEnum,
  mysqlTable,
  serial,
  timestamp,
} from "drizzle-orm/mysql-core"
import { createInsertSchema } from "drizzle-zod"

export const sessions = mysqlTable("sessions", {
  id: serial("id").primaryKey(),
  tableId: int("table_id").notNull(),
  status: mysqlEnum("status", ["open", "pending", "closed"])
    .default("open")
    .notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow()
    .notNull(),
})

export const sessionsRelations = relations(sessions, ({ one, many }) => ({
  table: one(tables, {
    fields: [sessions.tableId],
    references: [tables.id],
  }),
  orders: many(orders),
}))

export const insertSessionSchema = createInsertSchema(sessions)
export type Session = InferModel<typeof sessions>
