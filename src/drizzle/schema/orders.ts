import { items } from "@/drizzle/schema/items"
import { sessions } from "@/drizzle/schema/sessions"
import { InferModel, relations, sql } from "drizzle-orm"
import { int, mysqlTable, serial, timestamp } from "drizzle-orm/mysql-core"
import { createInsertSchema } from "drizzle-zod"

export const orders = mysqlTable("orders", {
  id: serial("id").primaryKey(),
  sessionId: int("session_id").notNull(),
  itemId: int("item_id").notNull(),
  quantity: int("quantity").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow()
    .notNull(),
})

export const insertOrderSchema = createInsertSchema(orders)

export const ordersRelations = relations(orders, ({ one }) => ({
  session: one(sessions, {
    fields: [orders.sessionId],
    references: [sessions.id],
  }),
  item: one(items, {
    fields: [orders.itemId],
    references: [items.id],
  }),
}))

export type Order = InferModel<typeof orders>
