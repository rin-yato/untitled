import type { Config } from "drizzle-kit"

export default {
  schema: "./src/drizzle/schema/*",
  out: "./src/drizzle/migrations",
  connectionString: process.env.DB_URL, // cant use env.DB_URL
  breakpoints: true,
} satisfies Config
