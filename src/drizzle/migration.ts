import { connect } from "@planetscale/database"
import { drizzle } from "drizzle-orm/planetscale-serverless"
import { migrate } from "drizzle-orm/planetscale-serverless/migrator"
import { fetch } from "undici"

import "dotenv/config"
import { env } from "@/env.mjs"

const runMigrate = async () => {
  if (!env.DB_URL) {
    throw new Error("DATABASE_URL is not defined")
  }

  const connection = connect({
    url: env.DB_URL,
    fetch,
  })

  const db = drizzle(connection)

  console.log("⏳ Running migrations...")

  const start = Date.now()

  await migrate(db, {
    migrationsFolder: "src/drizzle/migrations",
    migrationsTable: "drizzle_migrations",
  })

  const end = Date.now()

  console.log(`✅ Migrations completed in ${end - start}ms`)

  process.exit(0)
}

runMigrate().catch((err) => {
  console.error("❌ Migration failed")
  console.error(err)
  process.exit(1)
})
