import { items } from "@/drizzle/schema/items"
import { InferModel, relations, sql } from "drizzle-orm"
import { mysqlTable, serial, text, timestamp } from "drizzle-orm/mysql-core"
import { createInsertSchema } from "drizzle-zod"

export const categories = mysqlTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  icon: text("icon"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow()
    .notNull(),
})

export const insertCategorySchema = createInsertSchema(categories)

export const categoriesRelations = relations(categories, ({ many }) => ({
  items: many(items),
}))

export type Category = InferModel<typeof categories>
