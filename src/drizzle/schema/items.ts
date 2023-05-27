import { categories } from "@/drizzle/schema/categories"
import { orders } from "@/drizzle/schema/orders"
import { InferModel, relations } from "drizzle-orm"
import { pgTable, real, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { createInsertSchema } from "drizzle-zod"

export const items = pgTable("items", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  price: real("price").notNull(),
  cateoryId: uuid("category_id")
    .notNull()
    .references(() => categories.id),
  createAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const insertItemSchema = createInsertSchema(items)

export const itemsRelations = relations(items, ({ one, many }) => ({
  category: one(categories, {
    fields: [items.cateoryId],
    references: [categories.id],
  }),
  orders: many(orders)
}))

export type Item = InferModel<typeof items>
