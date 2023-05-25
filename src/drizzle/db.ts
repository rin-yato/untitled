import { env } from "@/env.mjs"
import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

const pool = new Pool({
  connectionString: env.DB_URL,
  ssl: true,
})

export const db = drizzle(pool)
