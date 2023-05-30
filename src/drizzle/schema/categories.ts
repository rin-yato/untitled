import { items } from "@/drizzle/schema/items"
import { InferModel, relations } from "drizzle-orm"
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { createInsertSchema } from "drizzle-zod"

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  icon: text("icon"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const insertCategorySchema = createInsertSchema(categories)

export const categoriesRelations = relations(categories, ({ many }) => ({
  items: many(items),
}))

export type Category = InferModel<typeof categories>
