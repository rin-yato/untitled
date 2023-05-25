import { tables } from "@/drizzle/schema/tables"
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core"

export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  tableId: uuid("table_id")
    .notNull()
    .references(() => tables.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})
