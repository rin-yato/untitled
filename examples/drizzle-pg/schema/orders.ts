import { items } from "@/drizzle/schema/items"
import { sessions } from "@/drizzle/schema/sessions"
import { InferModel, relations } from "drizzle-orm"
import { integer, pgTable, timestamp, uuid } from "drizzle-orm/pg-core"
import { createInsertSchema } from "drizzle-zod"

export const orders = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: uuid("session_id")
    .notNull()
    .references(() => sessions.id, { onDelete: "cascade" }),
  itemId: uuid("item_id")
    .notNull()
    .references(() => items.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
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
