import { items } from "@/drizzle/schema/items"
import { integer, pgTable, timestamp, uuid } from "drizzle-orm/pg-core"
import { createInsertSchema } from "drizzle-zod"

export const orders = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: integer("session_id").notNull(),
  itemId: uuid("item_id")
    .notNull()
    .references(() => items.id),
  quantity: integer("quantity").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const insertOrderSchema = createInsertSchema(orders)
