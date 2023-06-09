import { drizzle } from "drizzle-orm/node-postgres"
import { migrate } from "drizzle-orm/node-postgres/migrator"
import { Pool } from "pg"

import "dotenv/config"

const pool = new Pool({
  connectionString: process.env.DB_URL, // cannot use env.mjs yet
  ssl: true,
})

const db = drizzle(pool)

async function main() {
  await migrate(db, { migrationsFolder: "./src/drizzle/migrations" })
  console.log("Migration complete")
  process.exit(0)
}

main()
