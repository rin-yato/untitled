import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { createInsertSchema } from "drizzle-zod"

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

export const insertCategorySchema = createInsertSchema(categories)
