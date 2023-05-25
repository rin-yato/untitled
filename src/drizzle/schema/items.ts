import { categories } from "@/drizzle/schema/categories"
import {
  pgTable,
  real,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"
import { createInsertSchema } from "drizzle-zod"

export const items = pgTable("items", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  price: real("price").notNull(),
  cateoryId: uuid("category_id")
    .notNull()
    .references(() => categories.id),
  createAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

export const insertItemSchema = createInsertSchema(items)
