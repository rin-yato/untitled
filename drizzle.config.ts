import type { Config } from "drizzle-kit"

import "dotenv/config"

export default {
  schema: "./src/drizzle/schema/*",
  out: "./src/drizzle/migrations",
} satisfies Config
