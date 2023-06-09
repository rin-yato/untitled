import { sessions } from "@/drizzle/schema/sessions"
import { InferModel, relations, sql } from "drizzle-orm"
import {
  int,
  mysqlTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/mysql-core"
import { createInsertSchema } from "drizzle-zod"

export const tables = mysqlTable("tables", {
  id: serial("id").primaryKey(),
  number: int("number").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow()
    .notNull(),
})

export const tablesRelations = relations(tables, ({ many }) => ({
  sessions: many(sessions),
}))

export const insertTableSchema = createInsertSchema(tables)
export type Table = InferModel<typeof tables>
