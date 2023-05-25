import { env } from "@/env.mjs"
import { drizzle } from "drizzle-orm/node-postgres"
import { migrate } from "drizzle-orm/node-postgres/migrator"
import { Pool } from "pg"

const pool = new Pool({
  connectionString: env.DB_URL,
  ssl: true,
})

const db = drizzle(pool)

async function main() {
  await migrate(db, { migrationsFolder: "./src/drizzle/migrations" })
  console.log("Migration complete")
  process.exit(0)
}

main()
