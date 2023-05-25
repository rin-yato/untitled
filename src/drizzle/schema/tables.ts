import { integer, pgTable, timestamp, uuid } from "drizzle-orm/pg-core"
import { createInsertSchema } from "drizzle-zod"

export const tables = pgTable("tables", {
  id: uuid("id").primaryKey().defaultRandom(),
  number: integer("number").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const insertTableSchema = createInsertSchema(tables)
