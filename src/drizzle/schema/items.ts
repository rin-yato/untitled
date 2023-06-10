import { categories } from "@/drizzle/schema/categories"
import { orders } from "@/drizzle/schema/orders"
import { InferModel, relations, sql } from "drizzle-orm"
import {
  int,
  mysqlTable,
  real,
  serial,
  text,
  timestamp,
} from "drizzle-orm/mysql-core"
import { createInsertSchema } from "drizzle-zod"

export const items = mysqlTable("items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: real("price").notNull(),
  categoryId: int("category_id").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow()
    .notNull(),
})

export const insertItemSchema = createInsertSchema(items)

export const itemsRelations = relations(items, ({ one, many }) => ({
  category: one(categories, {
    fields: [items.categoryId],
    references: [categories.id],
  }),
  orders: many(orders),
}))

export type Item = InferModel<typeof items>
