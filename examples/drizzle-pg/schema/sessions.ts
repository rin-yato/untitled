import { orders } from "@/drizzle/schema/orders"
import { tables } from "@/drizzle/schema/tables"
import { InferModel, relations } from "drizzle-orm"
import { boolean, pgTable, timestamp, uuid } from "drizzle-orm/pg-core"
import { createInsertSchema } from "drizzle-zod"

export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  tableId: uuid("table_id")
    .notNull()
    .references(() => tables.id),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
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
